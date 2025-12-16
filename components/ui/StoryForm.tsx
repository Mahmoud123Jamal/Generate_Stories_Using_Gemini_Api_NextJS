"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function StoryForm() {
  const { user } = useUser();
  const [storySubject, setStorySubject] = useState();
  const [storyType, setStoryType] = useState([
    "story book",
    "bed story",
    "Educational",
  ]);
  const [ageGroup, setAgeGroup] = useState("");
  const [loading, setLoading] = useState(false);
  return <div>Story Form</div>;
}

export default StoryForm;
