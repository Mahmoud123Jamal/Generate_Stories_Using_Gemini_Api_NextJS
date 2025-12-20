import { pgEnum } from "drizzle-orm/pg-core";

export const STORY_TYPES = [
  {
    key: "story book",
    label: "Story Book",
    image: "/images/storybook.png",
  },
  {
    key: "bed story",
    label: "Bed Story",
    image: "/images/bedStory.jpg",
  },
  {
    key: "Educational",
    label: "Educational",
    image: "/images/educational.png",
  },
] as const;

export type StoryType = (typeof STORY_TYPES)[number]["key"];
//type for schema
export const STORY_TYPE_VALUES = STORY_TYPES.map((t) => t.key);
export const storyTypeEnum = pgEnum(
  "story_type",
  STORY_TYPE_VALUES as [StoryType, ...StoryType[]]
);

export const AGE_GROUPS = ["2-5", "5-7", "7-10"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];
// Age for schema
export const ageGroupEnum = pgEnum("age_group", [...AGE_GROUPS] as [
  AgeGroup,
  ...AgeGroup[]
]);

export type StoryFormValues = {
  subject: string;
  type: StoryType;
  ageGroup: AgeGroup;
};
