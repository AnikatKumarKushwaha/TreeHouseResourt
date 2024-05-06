import supabase, { supabaseUrl } from "./supabase";

/////////////////////////get rooms////////////////////
export async function getRooms() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

///////////////////////create rooms/////////////////////
export async function createRoom(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  //2.Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  console.log("api", data);
  return data;
}

////////////////////////delete rooms//////////////////////
export async function deleteRoom(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Some error cannot delete cabin");
  }

  return id;
}

///////////////////////edit rooms///////////////////

///////////////////////create rooms/////////////////////
export async function editRoom(editCabin) {
  const hasImagePath = editCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${editCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? editCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.edit cabin

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...editCabin, image: imagePath })
    .eq("id", editCabin.id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  //2.Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, editCabin.image);

  //3.Delete the cabin if there was error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  console.log("api", data);
  return data;
}
