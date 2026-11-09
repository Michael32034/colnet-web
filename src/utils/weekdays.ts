import { DAYSOFWEEK, WORKDAYS, DayOfWeek, Workday } from "./../data";

function getDayName(day: Date): DayOfWeek {
    const DAY_MAP: Record<number, DayOfWeek> = {
        0: DAYSOFWEEK.sunday,
        1: DAYSOFWEEK.monday,
        2: DAYSOFWEEK.tuesday,
        3: DAYSOFWEEK.wednesday,
        4: DAYSOFWEEK.thursday,
        5: DAYSOFWEEK.friday,
        6: DAYSOFWEEK.saturday,
    };
    return DAY_MAP[day.getDay()];
}

function getWorkdayName(day: Date | number): Workday {
    const DAY_MAP: Record<number, Workday> = {
        1: WORKDAYS.monday,
        2: WORKDAYS.tuesday,
        3: WORKDAYS.wednesday,
        4: WORKDAYS.thursday,
        5: WORKDAYS.friday,
    };

    if (day instanceof Date) {
        return DAY_MAP[day.getDay()];
    }
    return DAY_MAP[day];
}

function isWorkday(day: Date): boolean {
    return [1, 2, 3, 4, 5].includes(day.getDay());
}

export { getDayName, getWorkdayName, isWorkday };
