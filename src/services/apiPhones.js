import { getToday } from "../helpers/getToday";
import { PAGE_SIZE } from "../utilities/constants";
import supabase, { supabaseUrl } from "./supabase";
import onError from "../utilities/formError";

export async function getPhones({ filter, sortBy, page }) {
  let query = supabase.from("job_orders").select("*", { count: "exact" });

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
    return await onError( error, 'Unable to fetch job order records.')
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

  let query = supabase.from("job_orders");
  let data, error;

  // CREATE
  if (!id) {
    const result = await query
      .insert([{ ...newPhone, image: imagePath }])
      .select()
      .single();
    data = result.data;
    error = result.error;
  }
  // EDIT
  else {
    const result = await query
      .update({ ...newPhone, image: imagePath })
      .eq("id", id)
      .select()
      .single();
    data = result.data;
    error = result.error;
  }

  if (error) {
    return await onError( error, `Phone could not be ${id ? "updated" : "created"}: ${error.message}` )
  }

  // Upload image only if it's a new image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("phone-images")
    .upload(imageName, newPhone.image);

  // Delete the phone if image upload fails
  if (storageError) {
    await supabase.from("job_orders").delete().eq("id", data.id);
    return await onError(storageError, 'Phone image could not be uploaded and the phone was deleted')
  }

  return data;
}

export async function deletePhone(id) {
  const { data, error } = await supabase
    .from("job_orders")
    .delete()
    .eq("id", id)
    .select();

  if (error || data.length === 0) {
    return await onError( error, 'Unable to delete resource.')
  }

  return;
}

export async function getPendingRepairs() {
  const { data, error } = await supabase
    .from("job_orders")
    .in('status', ['completed', 'forConfirmation']);

  if (error) {
    return await onError( error, 'Unable to fetch pending repair resources.');
  }

  return data;
}

export async function getAssignedRepairs({ filter }) {
  let query = supabase.from("job_orders").select("*");

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  const { data, error } = await query;

  if (error) {
    return await onError( error, 'Unable to load assigned repairs.');
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
    return await onError( error, 'Assigned not found.' );
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
    return await onError( error, 'Unable to fetch sales after date.' );
  }

  return data;
}
