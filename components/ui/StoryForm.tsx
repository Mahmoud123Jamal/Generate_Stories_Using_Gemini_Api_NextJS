"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STORY_TYPES, AGE_GROUPS, StoryFormValues } from "@/types/StoryType";
import { storySchema } from "@/lib/validators";

function StoryForm() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<StoryFormValues>({
    resolver: yupResolver(storySchema) as unknown as Resolver<StoryFormValues>,
  });

  // Watch selected type for dropdown label
  const selectedType = watch("type");

  const onSubmit = async (data: StoryFormValues) => {
    setLoading(true);
    try {
      //  API Logic
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex place-content-center mt-3 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90%] lg:w-2/3  mx-auto p-6 space-y-4 bg-white shadow rounded  overflow-y-auto scrollbar-hide no-scrollbar"
        >
          {/* Story Subject */}
          <div>
            <label className="block text-yellow-700 mb-1 font-medium">
              Story Subject
            </label>
            <textarea
              {...register("subject")}
              className="textarea text-xl textarea-warning w-full px-3 py-2 rounded overflow-y-auto whitespace-pre-wrap wrap-break-words scrollbar-hide no-scrollbar resize-none placeholder:text-orange-500 placeholder:caret-orange-500 text-orange-500
"
              placeholder="Enter story subject"
              rows={4}
              cols={40}
            />
            <p className="text-red-500 text-sm">{errors.subject?.message}</p>
          </div>

          {/* Custom Story Type Dropdown */}
          <div>
            <label className="block text-yellow-700 mb-1 font-medium">
              Story Type
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full border px-3 py-2 rounded flex items-center justify-between bg-orange-500 hover:bg-orange-600 text-white"
              >
                {selectedType
                  ? STORY_TYPES.find((t) => t.key === selectedType)?.label
                  : "Select type"}
                <span>▼</span>
              </button>

              {open && (
                <div className="absolute z-10 w-full border bg-orange-500 mt-1 rounded shadow max-h-60 overflow-y-auto">
                  {STORY_TYPES.map((type) => (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => {
                        setValue("type", type.key, { shouldValidate: true });
                        setOpen(false);
                      }}
                      className="w-full px-3 py-2 flex items-center hover:bg-gray-500 overflow-y-auto cursor-pointer"
                    >
                      <img
                        src={type.image}
                        alt={type.label}
                        className="w-15 h-15 rounded-full mr-2"
                      />
                      <span className="text-white font-extrabold">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-red-500 text-sm">{errors.type?.message}</p>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-yellow-700 mb-1 font-medium">
              Age Group
            </label>
            <select
              {...register("ageGroup")}
              className="w-full border px-3 py-2 rounded cursor-pointer bg-orange-500  text-white focus:outline-none focus:ring-2 focus:ring-orange-300 "
            >
              <option className=" font-semibold" value="">
                Select age group
              </option>
              {AGE_GROUPS.map((age) => (
                <option className=" font-bold" key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{errors.ageGroup?.message}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-warning py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Story"}
          </button>
        </form>
      </div>
    </>
  );
}

export default StoryForm;
