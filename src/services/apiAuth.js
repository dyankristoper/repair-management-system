import supabase, { supabaseUrl } from "./supabase";
import { jwtDecode } from 'jwt-decode';
import { onError } from "../utilities/formError";
import { checkIfNullOrEmpty } from "../utilities/helpers";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const decoded = jwtDecode( session.session.access_token );
    const { data } = await supabase.auth.getUser();

    return { user: data?.user, user_role: decoded?.user_role }
  } catch (error) {
    throw new Error( error );
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update password Or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function suspendAuthUser( userId ){
  try {    
    checkIfNullOrEmpty(userId);

    const { data, error } = await supabase
                      .from("user_profiles")
                      .update({"isActive": false})
                      .eq('id', userId)
                      .select();

    if( error ) throw new Error( error );
  } catch (error) {
    await onError('error_server', 'suspendUser', error );
  }
}
