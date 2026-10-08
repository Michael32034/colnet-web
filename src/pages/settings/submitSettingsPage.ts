import { STORAGE_ITEMS } from "../../config";
import { Settings } from "../../data";
import initSettingsPage from "./initSettingsPage";

async function submitSettingsPage(e: SubmitEvent) {
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
    initSettingsPage();
}

export default submitSettingsPage;
