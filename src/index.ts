/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { PAGES, STORAGE_ITEMS } from "./config";
import { Settings } from "./data";
import PageManager from "./pageManager";
import { registration, submitForm } from "./registration";
import { updateTheme } from "./utils/colors";

function hasSettings(): Boolean {
  let settings = localStorage.getItem(STORAGE_ITEMS.Settings);
  return settings !== null;
}

async function onstart() {
  if (hasSettings()) {
    let settings = JSON.parse(
      localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;
    updateTheme(settings.apperance.theme);
    PageManager.openCashedPage();
  } else {
    await registration();
  }
}

async function onHashChanged() {
  let new_hash = location.hash;
  if (PAGES.is(new_hash)) {
    PageManager.showPage(new_hash);
    localStorage.setItem(STORAGE_ITEMS.OpenedPage, location.hash);
  } else {
    location.hash = PAGES.home;
  }
}

//Event listeners

document.addEventListener("DOMContentLoaded", onstart);

(document.getElementById("start_settings") as HTMLFormElement).addEventListener(
  "submit",
  submitForm,
);

window.onhashchange = onHashChanged;

document.getElementById("cleanData")?.addEventListener("click", () => {
  for (const [_, value] of Object.entries(STORAGE_ITEMS)) {
    localStorage.removeItem(value);
  }
  window.open(location.origin);
});

screen.orientation.addEventListener("change", () => {
  location.reload();
});
