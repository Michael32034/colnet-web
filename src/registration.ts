import config from "./config.ts";
import Api from "./api.ts";
import PageManager from "./pageManager.ts";
import { Group, Settings, SubjectLinks } from "./data.ts";

async function fillGroupOption() {
  let groups = (await Api.getGroupsList()) as Array<Group>;
  groups.sort((a, b) => {
    let pa = a.name.match(/^([^\d]+)-(\d+)/)!;
    let pb = b.name.match(/^([^\d]+)-(\d+)/)!;

    if (pa[2] !== pb[2]) {
      return Number(pb[2]) - Number(pa[2]);
    }
    return a.name.localeCompare(b.name);
  });
  let group_select = document.getElementById(
    "group_select",
  ) as HTMLSelectElement;
  for (const group of groups) {
    let option = document.createElement("option");
    option.textContent = group["name"];
    group_select.appendChild(option);
  }
  group_select.addEventListener("change", groupSubjectLinksChoose);
}

async function groupSubjectLinksChoose(e: Event) {
  let groups = (await Api.getGroupsList()) as Array<Group>;
  groups.sort((a, b) => {
    let pa = a.name.match(/^([^\d]+)-(\d+)/)!;
    let pb = b.name.match(/^([^\d]+)-(\d+)/)!;

    if (pa[2] !== pb[2]) {
      return Number(pb[2]) - Number(pa[2]);
    }
    return a.name.localeCompare(b.name);
  });
  console.log(groups);

  let subjectLink = document.getElementById("subject_link") as HTMLDivElement;
  for (const group of groups) {
    if (e.target) {
      if (group.name === (e.target as HTMLSelectElement).value) {
        let choosed_group = group;
        let already = subjectLink.getElementsByTagName("div");
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
          subjectLink.appendChild(subject_select_cont);
          i += 1;
        }
      }
    }
  }
  let readyButton = document.getElementById("set_ready") as HTMLInputElement;
  readyButton!.disabled = false;
}

async function submitForm(e: SubmitEvent) {
  e.preventDefault();
  let settingsDialog = document.getElementById(
    "registration",
  ) as HTMLDialogElement;
  settingsDialog!.close();
  let formData = new FormData(e.target! as HTMLFormElement);
  let group = await Api.getGroupByName(formData.get("group") as string);
  let subjectLinks: SubjectLinks = {};
  for (const groupSubject of group.subjects) {
    if (groupSubject) {
      subjectLinks[groupSubject] =
        (formData.get(
          `subject${group.subjects.indexOf(groupSubject)}`,
        ) as string) ?? "";
    }
  }
  let settings: Settings = {
    group: group,
    subject_links: subjectLinks,
    apperance: { theme: "auto" },
  };
  localStorage.setItem(config.STORAGE_ITEMS.Settings, JSON.stringify(settings));
  PageManager.showPage(config.PAGES.home);
}

async function registration() {
  let settingsDialog = document.getElementById(
    "registration",
  ) as HTMLDialogElement;
  settingsDialog!.show();
  await fillGroupOption();
}

export { registration, submitForm };
