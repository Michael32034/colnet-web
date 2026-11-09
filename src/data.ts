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

const WORKDAYS = defineEnum({
  monday: DAYSOFWEEK.monday,
  tuesday: DAYSOFWEEK.tuesday,
  wednesday: DAYSOFWEEK.wednesday,
  thursday: DAYSOFWEEK.thursday,
  friday: DAYSOFWEEK.friday,
});

type DayOfWeek = InferValue<typeof DAYSOFWEEK>;

type Workday = InferValue<typeof WORKDAYS>;

type Group = {
  id: number;
  name: string;
  link: string;
  subjects: Array<string>;
};

type SubjectLinks = Record<string, string>;

type Schedule = Record<Workday, Array<string>>;

type CallSchedule = Array<{ start: string; end: string }>;

type Theme = "auto" | "dark" | "light";

type Subject = {
  name: string;
  teacher: string;
};

type Replacement = {
  group_name: string;
  date: `${number}-${number}-${number}`;
  lessons: string;
  audience: string;
  content: string | { old: Subject; new: Subject };
};

type Apperance = {
  theme: Theme;
};

type Settings = {
  group: Group;
  subject_links: SubjectLinks;
  apperance: Apperance;
};

export {
  DAYSOFWEEK,
  WORKDAYS,
  DayOfWeek,
  Workday,
  Group,
  Settings,
  Subject,
  SubjectLinks,
  Schedule,
  CallSchedule,
  Theme,
  Replacement,
  Apperance,
};
