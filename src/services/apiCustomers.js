import supabase from "./supabase";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Customer could not be loaded");
  }
  return data;
}

export async function createEditCustomer(newCustomer, id) {
  let query = supabase.from("customers");

  if (!id) query = query.insert([{ ...newCustomer }]);

  if (id)
    query = query
      .update({ ...newCustomer })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Customer could not be created");
  }

  return data;
}
