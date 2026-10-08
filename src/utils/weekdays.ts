import { DAYSOFWEEK, DayOfWeek } from "./../data";

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

function getWorkdayName(day: Date | number): DayOfWeek {
    const DAY_MAP: Record<number, DayOfWeek> = {
        0: DAYSOFWEEK.monday,
        1: DAYSOFWEEK.tuesday,
        2: DAYSOFWEEK.wednesday,
        3: DAYSOFWEEK.thursday,
        4: DAYSOFWEEK.friday,
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
