import { CallSchedule } from "./../data";

function getNextOrCurrentClassNumber(
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

export { getNextOrCurrentClassNumber };
