import Api from "./api";
import { STORAGE_ITEMS, PAGES } from "./config";
import { get_day_name, is_workday, next_or_current_class_number } from "./util";
import { Group, Settings } from "./data";
import { InferValue } from "ts-safe-enum";

type Pages = InferValue<typeof PAGES>;

let current_page: Pages;

class PageManager {
  static openCashedPage() {
    let lastOpenedPage = localStorage.getItem(STORAGE_ITEMS.OpenedPage);
    if (lastOpenedPage === null) {
      if (PAGES.is(location.hash)) {
        this.showPage(location.hash);
        localStorage.setItem(STORAGE_ITEMS.OpenedPage, location.hash);
      } else {
        location.hash = PAGES.home;
      }
    } else {
      if (location.hash !== lastOpenedPage) {
        location.hash = lastOpenedPage;
      } else {
        this.showPage(PAGES.is(lastOpenedPage) ? lastOpenedPage : PAGES.home);
      }
    }
  }

  static showPage(page: Pages) {
    if (current_page) {
      let previos_page = document.getElementById(
        current_page.toString().slice(1),
      );
      previos_page!.style.display = "none";
    }

    //Hooks
    switch (page) {
      case PAGES.home:
        this.hookHomePage();
        break;
      case PAGES.schedule:
        this.hookSchedulePage();
        break;
      case PAGES.settings:
        this.hookSettingsPage();
        break;
    }

    current_page = page;
    document.getElementById(current_page.toString().slice(1))!.style.display =
      "block";
  }

  static async hookSchedulePage() {
    let schedule_table = document.getElementById(
      "schedule_table",
    ) as HTMLTableElement;
    let settings: Settings = JSON.parse(
      localStorage.getItem(STORAGE_ITEMS.Settings) as string,
    );
    let schedule = await Api.get_group_schedule_by_id(settings.group.id);
    const days: string[][] = Object.values(schedule);
    let i = 0;
    for (const outer_row of schedule_table.tBodies[0].rows) {
      let row_table = outer_row.cells[1].children[0] as HTMLTableElement;
      let j = 0;
      for (const inner_row of row_table.tBodies[0].rows) {
        inner_row.cells[0].textContent =
          days[i][j] === "" ? "—————" : days[i][j];
        j++;
      }
      i++;
    }
  }

  static async hookHomePage() {
    let today = new Date();
    // let today = new Date("Tue Sep 15 2026 11:58:16 GMT+0300");
    let today_month = today.getMonth().toString();
    let today_month_day = today.getDate().toString();
    let today_dayofweek = get_day_name(today);
    let settings = JSON.parse(
      localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    //header
    let date_label = document.getElementById("date");
    date_label!.textContent = `${today_month_day}.${today_month.length > 1 ? today_month : "0" + today_month}`;

    let dayofweek_label = document.getElementById("dayofweek");
    dayofweek_label!.textContent = `${today_dayofweek}`;

    //message block
    let call_schedule = await Api.get_call_schedule();
    let schedule = await Api.get_group_schedule_by_id(settings.group.id);

    let next_lesson: string = "Відсутня";
    let lesson_start: string = "--:--";
    let is_link_disabed = true;
    let lesson_link = "#";

    let next_lesson_title = document.getElementById("next_lesson_title");
    let next_lesson_start = document.getElementById("next_lesson_start");
    let next_lesson_link = document.getElementById(
      "next_lesson_link",
    ) as HTMLLinkElement;

    if (is_workday(today)) {
      let lesson = next_or_current_class_number(today, call_schedule);

      //NOTE: Blank lesson proccesing
      while (
        lesson <= schedule[today_dayofweek].length &&
        schedule[today_dayofweek][lesson - 1] === ""
      ) {
        lesson++;
      }

      if (lesson !== -1 && lesson - 1 < schedule[today_dayofweek].length) {
        next_lesson = schedule[today_dayofweek][lesson - 1];

        if (next_lesson !== "") {
          lesson_start = call_schedule[lesson - 1].start;
          is_link_disabed = false;
          lesson_link = (
            await Api.get_group_by_name(settings.subject_links[next_lesson])
          ).link;
        }
      }
    }

    next_lesson_title!.textContent = `Наступна пара: ${next_lesson}`;
    next_lesson_start!.textContent = `Початок: ${lesson_start}`;
    next_lesson_link!.href = lesson_link;
    if (is_link_disabed) {
      next_lesson_link!.classList.add("pe-none", "link-secondary");
    } else {
      next_lesson_link!.classList.remove("pe-none", "link-secondary");
    }
  }
  static async hookSettingsPage() {
    let groups = (await Api.get_groups_list()) as Array<Group>;
    let settings = JSON.parse(
      localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;
    let subject_link = document.getElementById(
      "settings_subject_link",
    ) as HTMLDivElement;
    let already = subject_link.getElementsByTagName("div");
    while (already.length > 0) {
      already[0].remove();
    }
    let i = 0;
    for (const subject of settings.group.subjects) {
      let subject_select_cont = document.createElement("div");
      let subject_select_label = document.createElement("label");
      subject_select_label.innerText = subject;
      let subject_select = document.createElement("select");
      subject_select.name = `subject${i}`;
      subject_select.classList.add("settings");
      subject_select.addEventListener(
        "change",
        PageManager.changedSettingsPage,
      );
      for (const group of groups) {
        let ioi = document.createElement("option");
        ioi.innerText = group.name;
        if (group.name === settings.subject_links[subject]) {
          ioi.selected = true;
        }
        subject_select.appendChild(ioi);
      }
      subject_select_cont.appendChild(subject_select_label);
      subject_select_cont.appendChild(subject_select);
      subject_link.appendChild(subject_select_cont);
      i += 1;
    }
  }
  static async submitSettingsPage(e: SubmitEvent) {
    e.preventDefault();
    let settings_form_submit = document.getElementById(
      "settings_form_submit",
    ) as HTMLButtonElement;
    settings_form_submit.classList.add("btn-outline-success");
    settings_form_submit.classList.remove("btn-success");
    settings_form_submit.disabled = true;

    let form = e.target as HTMLFormElement;
    let form_data = new FormData(form);
    let settings = JSON.parse(
      localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    function save_settings(settings: Settings, form_data: FormData) {
      for (
        let index = 0;
        index < Object.keys(settings.subject_links).length;
        index++
      ) {
        settings.subject_links[Object.keys(settings.subject_links)[index]] =
          form_data.get(`subject${index}`) as string;
      }
      localStorage.setItem(STORAGE_ITEMS.Settings, JSON.stringify(settings));
    }
    save_settings(settings, form_data);
    PageManager.hookSettingsPage();
  }
  static async changedSettingsPage() {
    let settings_form_submit = document.getElementById(
      "settings_form_submit",
    ) as HTMLButtonElement;
    settings_form_submit.classList.add("btn-success");
    settings_form_submit.classList.remove("btn-outline-success");
    settings_form_submit.disabled = false;
  }
}

export default PageManager;
