import { previewStory } from "@/types/StoryType";
import { StoryFilterValues } from "@/types/StoryType";

export const getFilteredStories = (
  stories: previewStory[],
  filters: StoryFilterValues
) => {
  return stories.filter((story) => {
    const storyData = story?.content?.story;

    const storyTitle = storyData?.title?.toLowerCase() || "";
    const searchMatch = storyTitle.includes(
      filters.searchTerm?.toLowerCase() || ""
    );

    const ageMatch =
      !filters.ageGroups ||
      filters.ageGroups.length === 0 ||
      filters.ageGroups.includes(storyData?.ageGroup?.toString() || "");

    const typeMatch =
      !filters.storyTypes ||
      filters.storyTypes.length === 0 ||
      filters.storyTypes.includes(storyData?.type || "");

    return searchMatch && ageMatch && typeMatch;
  });
};
