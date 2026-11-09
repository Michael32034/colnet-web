import { STORAGE_ITEMS } from "../../config";
import { Settings } from "../../data";
import { saveSettings } from "../../utils/settings";
import initSettingsPage from "./initSettingsPage";

async function submitSettingsPage(e: SubmitEvent) {
    e.preventDefault();

    // Відключити кнопку
    let settingsFormSubmit = document.getElementById(
        "settingsFormSubmit",
    ) as HTMLButtonElement;
    settingsFormSubmit.classList.add("btn-outline-success");
    settingsFormSubmit.classList.remove("btn-success");
    settingsFormSubmit.disabled = true;
    //

    let form = e.target as HTMLFormElement;
    let formData = new FormData(form);

    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    saveSettings(settings, formData);
    initSettingsPage();
}

export default submitSettingsPage;
