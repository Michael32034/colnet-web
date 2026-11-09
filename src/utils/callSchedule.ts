import { CallSchedule, Schedule } from "./../data";
import { getWorkdayName } from "./weekdays";

function getNextClassNumber(
    day: Date,
    callSchedule: CallSchedule,
    schedule: Schedule,
): number {
    let dayofweek = getWorkdayName(day);

    let startClassTable: number[] = callSchedule.map((e) => {
        let time = e.start.split(":").map(Number);
        return time[0] * 60 + time[1];
    });

    let currentTime = day.getHours() * 60 + day.getMinutes();

    for (const time of startClassTable) {
        if (time >= currentTime) {
            let nextClassNumber = startClassTable.indexOf(time);
            while (schedule[dayofweek][nextClassNumber] === "") {
                nextClassNumber += 1;
            }

            return nextClassNumber + 1 < schedule[dayofweek].length
                ? nextClassNumber + 1
                : -1;
        }
    }

    return -1;
}

function getCurrentClassNumber(
    day: Date,
    callSchedule: CallSchedule,
    schedule: Schedule,
): number {
    let dayofweek = getWorkdayName(day);

    let startClassTable: number[] = callSchedule.map((e) => {
        let time = e.start.split(":").map(Number);
        return time[0] * 60 + time[1];
    });

    let endClassTable: number[] = callSchedule.map((e) => {
        let time = e.end.split(":").map(Number);
        return time[0] * 60 + time[1];
    });

    let currentTime = day.getHours() * 60 + day.getMinutes();

    for (const time of endClassTable) {
        if (
            time >= currentTime &&
            currentTime >= startClassTable[endClassTable.indexOf(time)]
        ) {
            let currentClassNumber = endClassTable.indexOf(time);

            if (schedule[dayofweek][currentClassNumber] === "") {
                return -1;
            }
            return currentClassNumber + 1 < schedule[dayofweek].length
                ? currentClassNumber + 1
                : -1;
        }
    }

    return -1;
}

function isNowBeforeLessons(now: Date, callSchedule: CallSchedule): boolean {
    let currentTime = now.getHours() * 60 + now.getMinutes();
    let lessonStart = callSchedule[0].start.split(":").map(Number);
    let convertedLessonStart = lessonStart[0] * 60 + lessonStart[1];
    return currentTime < convertedLessonStart;
}

function isNowAfterLessons(now: Date, callSchedule: CallSchedule): boolean {
    let currentTime = now.getHours() * 60 + now.getMinutes();

    let lessonStop = callSchedule[callSchedule.length - 1].end
        .split(":")
        .map(Number);
    let convertedLessonStop = lessonStop[0] * 60 + lessonStop[1];

    return currentTime > convertedLessonStop;
}

export {
    getCurrentClassNumber,
    getNextClassNumber,
    isNowBeforeLessons,
    isNowAfterLessons,
};
