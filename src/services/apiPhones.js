import { getToday } from "../helpers/getToday";
import { PAGE_SIZE } from "../utilities/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getPhones({ filter, sortBy, page }) {
  let query = supabase
    .from("job_orders")
    .select("*,customers(id,name,email,address,phoneNumber)", {
      count: "exact",
    });

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
  const hasImagePath = newPhone.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newPhone.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPhone.image
    : `${supabaseUrl}/storage/v1/object/public/phone-images/${imageName}`;

  // Clean up phone data to remove relational data (like customers)
  const payload = { ...newPhone, image: imagePath };
  delete payload.customers; // Ensure we don't send nested relational objects

  const query = supabase.from("job_orders");
  let data, error;

  if (!id) {
    ({ data, error } = await query.insert([payload]).select().single());
  } else {
    ({ data, error } = await query
      .update(payload)
      .eq("id", id)
      .select()
      .single());
  }

  if (error) throw new Error(error.message);

  // Upload image if it's new
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("phone-images")
      .upload(imageName, newPhone.image);

    if (storageError) {
      await supabase.from("job_orders").delete().eq("id", data.id);
      throw new Error("Image upload failed. Record deleted.");
    }
  }

  return data;
}

export async function deletePhone(id) {
  const { data, error } = await supabase
    .from("job_orders")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Phone could not be loaded");
  }

  return data;
}

export async function getPendingRepairs() {
  const { data, error } = await supabase
    .from("job_orders")
    .select("completed, waitingForConfirmation");

  if (error) {
    console.error(error);
    throw new Error("Pending repairs could not get loaded");
  }

  return data;
}

export async function getAssignedRepairs({ filter }) {
  let query = supabase.from("job_orders").select("*");

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Assigned repairs could not get loaded");
  }
  return data;
}

export async function getAssigned(id) {
  const { data, error } = await supabase
    .from("job_orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Assigned not found");
  }

  return data;
}

export async function getSalesAfterDate(date) {
  const { data, error } = await supabase
    .from("job_orders")
    .select("created_at,cost,success,failed,serviceFee")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Phones could not get loaded");
  }

  return data;
}
