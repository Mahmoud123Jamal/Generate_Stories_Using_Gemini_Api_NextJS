import * as yup from "yup";
import { STORY_TYPES, AGE_GROUPS, StoryType } from "@/types/StoryType";

const STORY_TYPE_KEYS = STORY_TYPES.map((t) => t.key);

export const storySchema = yup.object({
  subject: yup
    .string()
    .required("Story subject is required")
    .min(20, "Subject must be at least 20 characters"),

  type: yup
    .mixed<StoryType>()
    .oneOf(STORY_TYPE_KEYS, "Invalid story type")
    .required("Story type is required"),

  ageGroup: yup
    .mixed()
    .oneOf(AGE_GROUPS, "Invalid age group")
    .required("Age group is required"),
});
