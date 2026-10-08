import Api from "../../api";
import { STORAGE_ITEMS } from "../../config";
import { Group, Settings } from "../../data";
import changedSettingsPage from "./changedSettingsPage";

async function initSettingsPage() {
    let groups = (await Api.get_groups_list()) as Array<Group>;
    groups.sort((a, b) => {
        let pa = a.name.match(/^([^\d]+)-(\d+)/)!;
        let pb = b.name.match(/^([^\d]+)-(\d+)/)!;

        if (pa[2] !== pb[2]) {
            return Number(pb[2]) - Number(pa[2]);
        }
        return a.name.localeCompare(b.name);
    });
    console.log(groups);
    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;
    let subject_link = document.getElementById(
        "settings_subject_link",
    ) as HTMLDivElement;
    subject_link.replaceChildren();
    let already = subject_link.getElementsByTagName("div");
    while (already.length > 0) {
        already[0].remove();
    }
    let i = 0;
    for (const subject of settings.group.subjects) {
        let subject_select_cont = document.createElement("li");
        subject_select_cont.classList.add("settings-item");
        let subject_select_label = document.createElement("label");
        subject_select_label.innerText = subject;
        let subject_select = document.createElement("select");
        subject_select.name = `subject${i}`;
        subject_select.classList.add("settings");
        subject_select.addEventListener("change", changedSettingsPage);
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

export default initSettingsPage;
