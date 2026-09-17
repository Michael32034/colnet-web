import config from "./config.ts";
import Api from "./api.ts";
import PageManager from "./page_manager.ts";
import { Group, Settings, SubjectLinks } from "./data.ts";

async function fill_group_option() {
  let groups = (await Api.get_groups_list()) as Array<Group>;
  let group_select = document.getElementById(
    "group_select",
  ) as HTMLSelectElement;
  for (const group of groups) {
    let option = document.createElement("option");
    option.textContent = group["name"];
    group_select.appendChild(option);
  }
  group_select.addEventListener("change", group_subject_links_choose);
}

async function group_subject_links_choose(e: Event) {
  let groups = (await Api.get_groups_list()) as Array<Group>;
  let subject_link = document.getElementById("subject_link") as HTMLDivElement;
  for (const group of groups) {
    if (e.target) {
      if (group.name === (e.target as HTMLSelectElement).value) {
        let choosed_group = group;
        let already = subject_link.getElementsByTagName("div");
        while (already.length > 0) {
          already[0].remove();
        }
        let i = 0;
        for (const subject of choosed_group.subjects) {
          let subject_select_cont = document.createElement("div");
          let subject_select_label = document.createElement("label");
          subject_select_label.innerText = subject;
          let subject_select = document.createElement("select");
          subject_select.name = `subject${i}`;
          for (const group of groups) {
            let ioi = document.createElement("option");
            ioi.innerText = group.name;
            subject_select.appendChild(ioi);
          }
          subject_select_cont.appendChild(subject_select_label);
          subject_select_cont.appendChild(subject_select);
          subject_link.appendChild(subject_select_cont);
          i += 1;
        }
      }
    }
  }
  let ready_button = document.getElementById("set_ready") as HTMLInputElement;
  ready_button!.disabled = false;
}

async function submit_form(e: SubmitEvent) {
  e.preventDefault();
  let settingsDialog = document.getElementById(
    "registration",
  ) as HTMLDialogElement;
  settingsDialog!.close();
  let formdata = new FormData(e.target! as HTMLFormElement);
  let group = await Api.get_group_by_name(formdata.get("group") as string);
  let subject_links: SubjectLinks = {};
  for (const group_subject of group.subjects) {
    if (group_subject) {
      subject_links[group_subject] =
        (formdata.get(
          `subject${group.subjects.indexOf(group_subject)}`,
        ) as string) ?? "";
    }
  }
  let settings: Settings = {
    group: group,
    subject_links: subject_links,
    apperance: { theme: null },
  };
  localStorage.setItem(config.STORAGE_ITEMS.Settings, JSON.stringify(settings));
  PageManager.showPage(config.PAGES.home);
}

async function registration() {
  let settingsDialog = document.getElementById(
    "registration",
  ) as HTMLDialogElement;
  settingsDialog!.show();
  await fill_group_option();
}

export { registration, submit_form };
