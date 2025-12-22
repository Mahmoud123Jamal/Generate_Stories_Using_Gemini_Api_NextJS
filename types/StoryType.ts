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

export const AGE_GROUPS = ["2-5", "5-7", "7-10"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export type StoryFormValues = {
  subject: string;
  type: StoryType;
  ageGroup: AgeGroup;
};

export type Story = {
  id: number;
  storyId: string;
  imageUrl: string | null;
  content: unknown;
  email: string | null;
};

export type previewStory = Omit<Story, "content" | "id" | "email"> & {
  content: {
    story: {
      title: string;
      description: string;
      type: StoryType;
      ageGroup: AgeGroup;
      totalPages?: number;
      imagePrompt?: string;
      pages?: {
        pageNumber: number;
        title: string;
        content: string;
        imagePrompt: string;
      }[];
    };
  };
} & StoryFormValues;
