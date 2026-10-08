import { render } from "htm/preact/standalone";
import Api from "../../api";
import { PAGES, STORAGE_ITEMS } from "../../config";
import ReplacementComponent from "../../components/replacement";
import { Settings } from "../../data";

async function initReplacementsPage() {
    let page = document.getElementById(PAGES.replacements.slice(1))!;
    page.replaceChildren();

    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    let replacements = await Api.get_group_replacement_by_name(
        settings.group.name,
    );
    let replacementsList = replacements.map((replacement) =>
        ReplacementComponent(replacement),
    );

    render(replacementsList, page);
}

export default initReplacementsPage;
