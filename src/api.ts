import { pathcat } from "pathcat";
import { API } from "./config";
import { Group, Schedule, CallSchedule, Replacement } from "./data";
import cfetch from "./utils/cfetch";

class Api {
  static async getGroupsList(): Promise<Array<Group>> {
    return (await cfetch(pathcat(API, "/groups"))) as Array<Group>;
  }

  static async getCallSchedule(): Promise<CallSchedule> {
    return (await cfetch(pathcat(API, "/call_schedule"))) as CallSchedule;
  }

  static async getGroupByName(name: string): Promise<Group> {
    return (await cfetch(
      pathcat(API, "/group/by_name/:name", { name: name }),
    )) as Group;
  }

  static async getGroupScheduleByName(name: string): Promise<Schedule> {
    return (await cfetch(
      pathcat(API, "/group/schedule/by_name/:name", { name: name }),
    )) as Schedule;
  }

  static async getGroupReplacementByName(
    name: string,
  ): Promise<Array<Replacement>> {
    return (await cfetch(
      pathcat(API, "/group/replacement/by_name/:name", { name: name }),
    )) as Array<Replacement>;
  }
}

export default Api;
