import Api from "../../api.ts";
import { STORAGE_ITEMS } from "../../config";
import { Settings } from "../../data.ts";

import { getNextOrCurrentClassNumber } from "../../utils/callSchedule.ts";
import { getDayName, isWorkday } from "./../../utils/weekdays.ts";

async function initHomePage() {
    let today = new Date();
    // let today = new Date("Tue Sep 15 2026 11:58:16 GMT+0300");
    let today_month = today.getMonth().toString();
    let today_month_day = today.getDate().toString();
    let today_dayofweek = getDayName(today);
    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    //header
    let date_label = document.getElementById("date");
    date_label!.textContent = `${today_month_day}.${today_month.length > 1 ? today_month : "0" + today_month}`;

    let dayofweek_label = document.getElementById("dayofweek");
    dayofweek_label!.textContent = `${today_dayofweek}`;

    //message block
    let call_schedule = await Api.get_call_schedule();
    let schedule = await Api.get_group_schedule_by_name(settings.group.name);

    let next_lesson: string = "Відсутня";
    let lesson_start: string = "--:--";
    let is_link_disabed = true;
    let lesson_link = "#";

    let next_lesson_title = document.getElementById("next_lesson_title");
    let next_lesson_start = document.getElementById("next_lesson_start");
    let next_lesson_link = document.getElementById(
        "next_lesson_link",
    ) as HTMLLinkElement;

    if (isWorkday(today)) {
        let lesson = getNextOrCurrentClassNumber(today, call_schedule);

        //NOTE: Blank lesson proccesing
        while (
            lesson <= schedule[today_dayofweek].length &&
            schedule[today_dayofweek][lesson - 1] === ""
        ) {
            lesson++;
        }

        if (lesson !== -1 && lesson - 1 < schedule[today_dayofweek].length) {
            next_lesson = schedule[today_dayofweek][lesson - 1];

            if (next_lesson !== "") {
                lesson_start = call_schedule[lesson - 1].start;
                is_link_disabed = false;
                lesson_link = (
                    await Api.get_group_by_name(settings.subject_links[next_lesson])
                ).link;
            }
        }
    }
    next_lesson_title!.textContent = `Наступна пара: ${next_lesson}`;
    next_lesson_start!.textContent = `Початок: ${lesson_start}`;
    next_lesson_link!.href = lesson_link;
    if (is_link_disabed) {
        next_lesson_link!.classList.add("disabled");
    } else {
        next_lesson_link!.classList.remove("disabled");
    }
}

export default initHomePage;
