import { Theme } from "../data";

//NOTE: Add colorscheme managment
function updateTheme(theme: Theme) {
    if (theme == "auto") {
        document.documentElement.removeAttribute("data-theme");
    } else if (theme == "light") {
        document.documentElement.dataset.theme = "light";
    } else if (theme == "dark") {
        document.documentElement.dataset.theme = "dark";
    }
}

export { updateTheme };
