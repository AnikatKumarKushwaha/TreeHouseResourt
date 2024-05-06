import supabase from "./supabase";

export const getSettings = async () => {
  let { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }

  return settings;
};

export const updateSettings = async (newSetting) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  if (error) {
    console.log(error);
    throw new Error("settings could not be updated");
  }

  return data;
};
