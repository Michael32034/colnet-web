import { DAYSOFWEEK, CallSchedule, DayOfWeek } from "./data";

function get_day_name(day: Date): DayOfWeek {
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

function is_workday(day: Date): boolean {
  return [1, 2, 3, 4, 5].includes(day.getDay());
}

function next_or_current_class_number(
  day: Date,
  call_schedule: CallSchedule,
): number {
  let start_class_table: number[] = call_schedule.map((e) => {
    let time = e.start.split(":").map(Number);
    return time[0] * 60 + time[1];
  });
  let current_time = day.getHours() * 60 + day.getMinutes();
  for (const time of start_class_table) {
    if (time >= current_time) {
      return start_class_table.indexOf(time) === -1
        ? -1
        : start_class_table.indexOf(time) + 1;
    }
  }

  return -1;
}

export { get_day_name, is_workday, next_or_current_class_number };
