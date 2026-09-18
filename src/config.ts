import { defineEnum } from "ts-safe-enum";

const config = {
  API: "https://colnet-api.fastapicloud.dev/",
  STORAGE_ITEMS: {
    OpenedPage: "openedPage",
    Settings: "settings",
  },
  PAGES: defineEnum({
    settings: "#settings",
    schedule: "#schedule",
    home: "#home",
    notes: "#notes",
    news: "#news",
  }),
};

const API = config.API;
const STORAGE_ITEMS = config.STORAGE_ITEMS;
const PAGES = config.PAGES;

export default config;
export { config, API, STORAGE_ITEMS, PAGES };
