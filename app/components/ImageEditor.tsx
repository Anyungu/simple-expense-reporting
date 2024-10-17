"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ImageIcon, ImagePlusIcon } from "lucide-react";
import { uploadFile } from "@/lib/actions/supabase";

type Props = {
  companyName: string;
  logo: string;
  setLogo: (logo: string) => void;
};
const ImageEditor = ({ companyName, setLogo, logo }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    console.log(event);
    const files = event.target.files;
    console.log(files);
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      console.error("File is not an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("companyName", companyName);

    fetch("/api/company", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      const uploadRes = await res.json();
      setUploading(false);
      setLogo(
        `https://zbvaqdcopdeggeweathe.supabase.co/storage/v1/object/public/${uploadRes?.data?.fullPath}`
      );
    });
  };

  const renderContent = () => {
    if (!uploading && logo) {
      return (
        <div className="flex justify-center items-center  bg-gray-200 rounded-xl h-32 w-40 p-4">
          <Image
            // className="rounded-full h-2 w-32"
            src={logo}
            width={100}
            height={100}
            alt="Uploaded image preview"
          />
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center  bg-gray-200 rounded-xl h-32 w-40">
        {uploading ? "Uploading..." : <ImagePlusIcon />}
      </div>
    );
  };

  return (
    <div className="relative h-auto w-auto">
      <label htmlFor="file-upload" className="cursor-pointer">
        {renderContent()}
        <input
          type="file"
          id="file-upload"
          onChange={(file) => handleChange(file)}
          className="hidden"
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default ImageEditor;
