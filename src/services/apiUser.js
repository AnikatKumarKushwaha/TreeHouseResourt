import supabase from "./supabase";

export async function getUser() {
  let { data: guests, error } = await supabase.from("guests").select("*");
  if (error) {
    throw new Error(error);
  }
  return guests;
}
