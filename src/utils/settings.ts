import { Settings, Theme } from "../data";
import { STORAGE_ITEMS } from "../config";
import { updateTheme } from "./colors";

function saveSettings(settings: Settings, form_data: FormData) {
    for (
        let index = 0;
        index < Object.keys(settings.subject_links).length;
        index++
    ) {
        settings.subject_links[Object.keys(settings.subject_links)[index]] =
            form_data.get(`subject${index}`) as string;
    }
    settings.apperance.theme = form_data.get("theme") as Theme;

    localStorage.setItem(STORAGE_ITEMS.Settings, JSON.stringify(settings));
    updateTheme(settings.apperance.theme);
}

export { saveSettings };
