import { defineEnum } from "ts-safe-enum";

const config = {
  API: "http://127.0.0.1:8000",
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
