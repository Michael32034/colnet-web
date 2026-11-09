import { html, render } from "htm/preact/standalone";
import { STORAGE_ITEMS } from "../../config";
import { Settings, WORKDAYS, Workday } from "../../data";
import Api from "../../api";

async function initSchedulePage() {
    let settings: Settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings) as string,
    );

    let schedule = await Api.getGroupScheduleByName(settings.group.name);
    let workdays = Object.entries(WORKDAYS).map((obj) => obj[1]);

    let schedulePageElement = document.getElementById("schedule")!;
    let schedulePage;

    if (!window.matchMedia("(min-width: 678px)").matches) {
        schedulePage = html`
        <div class="w-100">
            <table id="schedule_table" class="table table-bordered mx-auto w-75 mt-5 mb-5 pb-5" >
                <thead>
                    <tr>
                        <th scope="col"># </th>
                        <th scope="col">${settings.group.name}</th>
                    </tr>
                </thead>
                <tbody>
                    ${workdays.map(
            (day: Workday) => html`
                            <tr>
                                <th scope="row" class="position-relative">
                                    <span class="rotated top-50">${day}</span>
                                </th>
                                <td>
                                    <table class="table bd-0">
                                        <tbody>
                                        ${schedule[day].map(
                (lesson) => html`
                                            <tr>
                                                <td>${lesson === "" ? "—————" : lesson}</td>
                                            </tr>
                                            `,
            )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            `,
        )}
                </tbody>
            </table>
        </div>
        `;
    } else {
        schedulePage = html`
        <div class="w-100">
            <table id="schedule_table" class="table table-bordered mx-auto w-75 mt-5 mb-5 pb-5" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        ${workdays.map((day) => html`<th scope="col">${day}</th>`)}
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <th scope="row" class="position-relative">
                                    <span class="rotated top-50">${settings.group.name}</span>
                                </th>
                                ${workdays.map(
            (day: Workday) => html`
                                <td>
                                    <table class="table bd-0">
                                        <tbody>
                                        ${schedule[day].map(
                (lesson) => html`
                                            <tr>
                                                <td>${lesson === "" ? "—————" : lesson}</td>
                                            </tr>
                                            `,
            )}
                                        </tbody>
                                    </table>
                                </td>
                                `,
        )}
                            </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    render(schedulePage, schedulePageElement);
}

export default initSchedulePage;
