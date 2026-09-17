import { defineEnum, InferValue } from "ts-safe-enum";

const DAYSOFWEEK = defineEnum({
  monday: "Понеділок",
  tuesday: "Вівторок",
  wednesday: "Середа",
  thursday: "Четвер",
  friday: "П'ятниця",
  saturday: "Субота",
  sunday: "Неділя",
});

type DayOfWeek = InferValue<typeof DAYSOFWEEK>;

type Group = {
  id: number;
  name: string;
  link: string;
  subjects: Array<string>;
};

type SubjectLinks = Record<string, string>;

type Schedule = Record<string, Array<string>>;

type CallSchedule = Array<{ start: string; stop: string }>;

type Apperance = {
  theme: string | null;
};

type Settings = {
  group: Group;
  subject_links: SubjectLinks;
  apperance: Apperance;
};

export {
  DAYSOFWEEK,
  Group,
  Settings,
  SubjectLinks,
  Schedule,
  CallSchedule,
  Apperance,
  DayOfWeek,
};
