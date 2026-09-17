import { pathcat } from "pathcat";
import { API } from "./config";
import { Group, Schedule, CallSchedule } from "./data";

class Api {
  static async get_groups_list(): Promise<Array<Group>> {
    return await (await fetch(pathcat(API, "/groups"))).json();
  }

  static async get_call_schedule(): Promise<CallSchedule> {
    return await (await fetch(pathcat(API, "/call_schedule"))).json();
  }

  static async get_group_by_id(id: number): Promise<Group> {
    return await (
      await fetch(pathcat(API, "/group/by_id/:id", { id: id }))
    ).json();
  }

  static async get_group_by_name(name: string): Promise<Group> {
    return await (
      await fetch(pathcat(API, "/group/by_name/:name", { name: name }))
    ).json();
  }
  static async get_group_schedule_by_id(id: number): Promise<Schedule> {
    return await (
      await fetch(pathcat(API, "/group/schedule/by_id/:id", { id: id }))
    ).json();
  }
  static async get_group_schedule_by_name(name: string): Promise<Schedule> {
    return await (
      await fetch(pathcat(API, "/group/schedule/by_name/:name", { name: name }))
    ).json();
  }
}

export default Api;
