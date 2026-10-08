import { STORAGE_ITEMS, PAGES } from "./config";
import { InferValue } from "ts-safe-enum";
import initHomePage from "./pages/home/initHomePage";
import initSchedulePage from "./pages/schedule/initSchedulePage";
import initSettingsPage from "./pages/settings/initSettingsPage";
import initReplacementsPage from "./pages/replacement/initReplacementsPage";

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
        initHomePage();
        break;
      case PAGES.schedule:
        initSchedulePage();
        break;
      case PAGES.settings:
        initSettingsPage();
        break;
      case PAGES.replacements:
        initReplacementsPage();
        break;
    }

    current_page = page;
    document.getElementById(current_page.toString().slice(1))!.style.display =
      "block";
  }
}

export default PageManager;
