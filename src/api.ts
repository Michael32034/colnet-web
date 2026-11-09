import { pathcat } from "pathcat";
import { API } from "./config";
import { Group, Schedule, CallSchedule, Replacement } from "./data";

class Api {
  static async getGroupsList(): Promise<Array<Group>> {
    return await (await fetch(pathcat(API, "/groups"))).json();
  }

  static async getCallSchedule(): Promise<CallSchedule> {
    return await (await fetch(pathcat(API, "/call_schedule"))).json();
  }

  static async getGroupByName(name: string): Promise<Group> {
    return await (
      await fetch(pathcat(API, "/group/by_name/:name", { name: name }))
    ).json();
  }

  static async getGroupScheduleByName(name: string): Promise<Schedule> {
    return await (
      await fetch(pathcat(API, "/group/schedule/by_name/:name", { name: name }))
    ).json();
  }

  static async getGroupReplacementByName(
    name: string,
  ): Promise<Array<Replacement>> {
    return await (
      await fetch(
        pathcat(API, "/group/replacement/by_name/:name", { name: name }),
      )
    ).json();
  }
}

export default Api;
