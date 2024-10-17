import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const companyName = formData.get("companyName") as string;

    if (!file) {
      return new Response(JSON.stringify({ error: "File not provided." }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from("brigh-edge-logos")
      .upload(`${companyName}/${file.name}`, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error("Supabase upload error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    console.log(data)

    return Response.json({ message: "Success", data })
  } catch (err) {
    console.error("Error handling file upload:", err);
    return new Response(JSON.stringify({ error: "File upload failed." }), {
      status: 500,
    });
  }
}
