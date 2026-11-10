import { html, render } from "htm/preact/standalone";
import { Popover } from "../../../www/js/bootstrap.bundle.min.js";

import Api from "../../api";
import { PAGES, STORAGE_ITEMS } from "../../config";
import { Group, Settings } from "../../data";
import changedSettingsPage from "./changedSettingsPage";
import submitSettingsPage from "./submitSettingsPage";

async function initSettingsPage() {
  let groups = (await Api.getGroupsList()) as Array<Group>;

  let settings = JSON.parse(
    localStorage.getItem(STORAGE_ITEMS.Settings)!,
  ) as Settings;

  groups.sort((a, b) => {
    let pa = a.name.match(/^([^\d]+)-(\d+)/)!;
    let pb = b.name.match(/^([^\d]+)-(\d+)/)!;

    if (pa[2] !== pb[2]) {
      return Number(pb[2]) - Number(pa[2]);
    }
    return a.name.localeCompare(b.name);
  });

  let settingsPageElement = document.getElementById(
    PAGES.settings.slice(1),
  ) as HTMLDivElement;

  settingsPageElement.replaceChildren(); //Видаляє всіх children

  let settingsPage = html`
    <nav
      class="nav justify-content-between align-items-center bg-secondary-subtle p-2 bg-clr-5"
    >
      <h3 class="mb-0 ms-3">Загальні налаштування</h3>
      <button
        id="settings_form_submit"
        type="submit"
        form="settings_form"
        class="btn btn-outline-success"
        disabled
      >
        Зберегти
      </button>
    </nav>
    <form id="settings_form" class="m-4" onSubmit=${submitSettingsPage}>
      <h4>Загальні налаштування</h4>
      <ul class="list-unstyled">
          <li>
              <div class="settings-item">
                  <label for="theme">Тема</label>
                  <select id="theme" name="theme" onChange=${changedSettingsPage}>
                    <option value="auto" selected=${settings.apperance.theme == "auto"}>Тема пристрою</option>
                    <option value="dark" selected=${settings.apperance.theme == "dark"}>Темна</option>
                    <option value="light" selected=${settings.apperance.theme == "light"}>Світла</option>
                  </select>
              </div>
          </li>
      </ul>
      <div class="d-inline-flex gap-3"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="top"
        data-bs-content="Нажаль немає способу точно дізнатись посилання на уроки для кожної з груп. Ви можете самостійно налаштувати за яким посиланням переходити для кожної пари"
      >
        <h4>
          Налаштування вмісту
        </h4>
        <img src="./icons/info-circle-fill.svg" alt="" width="24" height="24"/>
      </div>
      <ul id="settings_subject_link" class="list-unstyled">
        ${settings.group.subjects.map(
    (subject) => html`
            <li class="settings-item">
              <label>${subject}</label>
              <select
                class="settings"
                name=${`subject${settings.group.subjects.indexOf(subject)}`}
                onChange=${changedSettingsPage}
              >
                ${groups.map(
      (group) => html`
                    <option
                      value=${group.name}
                      selected=${group.name === settings.subject_links[subject]}
                    >
                      ${group.name}
                    </option>
                  `,
    )}
              </select>
            </li>
          `,
  )}
      </ul>
      <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#removeAllData">Очистити всі данні</button>
    </form>
  `;
  render(settingsPage, settingsPageElement);

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new Popover(popoverTriggerEl),
  );
  window.addEventListener(
    "hashchange",
    () => {
      popoverList.forEach((popover) => {
        popover.hide();
      });
    },
    { once: true },
  );
}

export default initSettingsPage;
