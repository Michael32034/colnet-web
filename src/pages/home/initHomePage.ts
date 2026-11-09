import { html, render } from "htm/preact/standalone";

import Api from "../../api.ts";
import { STORAGE_ITEMS } from "../../config";
import { Settings, Workday } from "../../data.ts";

import {
    getCurrentClassNumber,
    getNextClassNumber,
    isNowAfterLessons,
    isNowBeforeLessons,
} from "../../utils/callSchedule.ts";
import { getDayName, isWorkday } from "./../../utils/weekdays.ts";
import HomeHeaderComponent from "../../components/homeHeader.ts";
import LessonComponent from "../../components/lesson.ts";
import MessageComponent from "../../components/message.ts";

async function initHomePage() {
    let homePageElement = document.getElementById("home")!;

    let settings = JSON.parse(
        localStorage.getItem(STORAGE_ITEMS.Settings)!,
    ) as Settings;

    let callSchedule = await Api.getCallSchedule();
    let schedule = await Api.getGroupScheduleByName(settings.group.name);

    let today = new Date();
    // let today = new Date("Fri Nov 06 2026 11:03:40 GMT+0200");
    let todayMonth = (today.getMonth() + 1).toString();
    let todayMonthDay = today.getDate().toString();
    let todayDayOfWeek = getDayName(today);

    //message block
    let lessonMessage = [];
    if (!isWorkday(today)) {
        lessonMessage.push(
            html`<${MessageComponent} message=${"Гарних вихідних"} secondaryMessage=${""} />`,
        );
    } else if (isNowBeforeLessons(today, callSchedule)) {
        let nextLessonNumber = getNextClassNumber(today, callSchedule, schedule);
        if (nextLessonNumber != -1) {
            let nextLesson: string =
                schedule[todayDayOfWeek as Workday][nextLessonNumber - 1];
            let lesson_start: string = callSchedule[nextLessonNumber - 1].start;
            let is_link_disabled = false;
            let nextLessonLink = (
                await Api.getGroupByName(settings.subject_links[nextLesson])
            ).link;
            lessonMessage.push(
                html`<${LessonComponent}
                    lesson=${nextLesson}
                    lessonDesc=${"Наступна пара"}
                    lessonLink=${nextLessonLink}
                    lessonStart=${lesson_start}
                    isLinkDisabled=${is_link_disabled}
                />`,
            );
        } else {
            lessonMessage.push(
                html`<${MessageComponent} message=${"Відпочивайте"} secondaryMessage=${"на сьогодні більше немає уроків"} />`,
            );
        }
    } else if (isNowAfterLessons(today, callSchedule)) {
        lessonMessage.push(
            html`<${MessageComponent} message=${"Відпочивайте"} secondaryMessage=${"на сьогодні більше немає уроків"} />`,
        );
    } else {
        let nextLessonNumber = getNextClassNumber(today, callSchedule, schedule);
        let currentLessonNumber = getCurrentClassNumber(
            today,
            callSchedule,
            schedule,
        );
        if (nextLessonNumber != -1) {
            let nextLesson: string =
                schedule[todayDayOfWeek as Workday][nextLessonNumber - 1];
            let nextLessonStart: string = callSchedule[nextLessonNumber - 1].start;
            let nextLessonLink = (
                await Api.getGroupByName(settings.subject_links[nextLesson])
            ).link;
            lessonMessage.push(
                html`<${LessonComponent}
                    lesson=${nextLesson}
                    lessonDesc=${"Наступна пара"}
                    lessonLink=${nextLessonLink}
                    lessonStart=${nextLessonStart}
                    isLinkDisabled=${false}
                />`,
            );
            if (currentLessonNumber !== -1) {
                let currentLesson: string =
                    schedule[todayDayOfWeek as Workday][currentLessonNumber - 1];
                let currentLessonStart: string =
                    callSchedule[currentLessonNumber - 1].start;
                let currentLessonLink = (
                    await Api.getGroupByName(settings.subject_links[currentLesson])
                ).link;
                lessonMessage.unshift(
                    html`<${LessonComponent}
                    lesson=${currentLesson}
                    lessonDesc=${"Поточна пара"}
                    lessonLink=${currentLessonLink}
                    lessonStart=${currentLessonStart}
                    isLinkDisabled=${false}
                />`,
                );
            }
        } else {
            lessonMessage.push(
                html`<${MessageComponent} message=${"Відпочивайте"} secondaryMessage=${"на сьогодні більше немає уроків"} />`,
            );
        }
    }

    let homePage = html`
    <h1 class="text-center">Home</h1>
    <${HomeHeaderComponent}
        dayOfWeek=${todayDayOfWeek}
        monthDay=${todayMonthDay}
        month=${todayMonth}
    />
    ${lessonMessage}
    `;
    render(homePage, homePageElement);
}

export default initHomePage;
