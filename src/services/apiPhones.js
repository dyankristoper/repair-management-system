import { PAGE_SIZE } from "../utilities/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getPhones({ filter, sortBy, page }) {
  let query = supabase.from("phones").select("*", { count: "exact" });

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy) query = query[sortBy.method || "eq"](sortBy.field, sortBy.value);

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    //.range()  a method from supabase
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Phone could not be loaded");
  }

  return { data, count };
}

export async function createEditPhone(newPhone, id) {
  console.log(newPhone, id);

  const hasImagePath = newPhone.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPhone.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newPhone.image
    : `${supabaseUrl}/storage/v1/object/public/phone-images/${imageName}`;

  //1. CREATE/Edit
  let query = supabase.from("phones");

  //A. CREATE
  if (!id) query = query.insert([{ ...newPhone, image: imagePath }]);

  //Edit
  if (id)
    query = query
      .update({ ...newPhone, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Phone could not be created");
  }

  //2. Uploading image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("phone-images")
    .upload(imageName, newPhone.image);

  // 3.Delete the phone if there is a problem

  if (storageError) {
    await supabase.from("phones").delete().eq("id", data.id);

    console.log(storageError);

    throw new Error(
      "Phone image could not be created and the phone is deleted"
    );
  }

  return data;
}

export async function deletePhone(id) {
  const { data, error } = await supabase.from("phones").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Phone could not be loaded");
  }

  return data;
}
