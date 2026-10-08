import { STORAGE_ITEMS } from "../../config";
import { Settings } from "../../data";
import Api from "../../api";
import { getWorkdayName } from "../../utils/weekdays";

async function initSchedulePage() {
    let schedule_table = document.getElementById(
        "schedule_table",
    ) as HTMLTableElement;

    let settings: Settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings) as string,
    );

    let schedule = await Api.get_group_schedule_by_name(settings.group.name);

    let i = 0;
    for (const outer_row of schedule_table.tBodies[0].rows) {
        let row_table = outer_row.cells[1].children[0] as HTMLTableElement;
        let j = 0;
        for (const inner_row of row_table.tBodies[0].rows) {
            inner_row.cells[0].textContent =
                schedule[getWorkdayName(i)][j] === ""
                    ? "—————"
                    : schedule[getWorkdayName(i)][j];

            j++;
        }
        i++;
    }
}

export default initSchedulePage;
