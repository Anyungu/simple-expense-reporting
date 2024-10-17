"use server";

import { createClient } from "../supabase/server";

export async function uploadFile(file: File) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("brigh-edge-logos")
    .upload("file_path", file);
  if (error) {
    // Handle error
    console.log(error);
  } else {
    // Handle success
  }
}
