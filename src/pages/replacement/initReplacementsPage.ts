import { render, html } from "htm/preact/standalone";
import Api from "../../api";
import { PAGES, STORAGE_ITEMS } from "../../config";
import ReplacementComponent from "../../components/replacement";
import { Settings } from "../../data";
import MessageComponent from "../../components/message";

async function initReplacementsPage() {
    let page = document.getElementById(PAGES.replacements.slice(1))!;
    page.replaceChildren();

    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    let replacements = await Api.getGroupReplacementByName(settings.group.name);
    let replacementsList = replacements.map((replacement) =>
        ReplacementComponent(replacement),
    );

    if (replacementsList.length) {
        render(replacementsList, page);
    } else {
        render(
            html`<${MessageComponent} message=${"Немає замін"} secondaryMessage=${""} />`,
            page,
        );
    }
}

export default initReplacementsPage;
