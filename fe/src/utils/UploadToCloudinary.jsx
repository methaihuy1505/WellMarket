// utils/uploadToCloudinary.js
import axios from "axios";
import api from "./api";

const CLOUD_NAME = "dj7ljwprv";
const UPLOAD_PRESET = "unsigned_profile_preset";

/**
 * Upload file lên Cloudinary và lưu metadata về backend
 * @param {File} file
 * @param {"image" | "video"} type
 * @returns {Promise<number|null>} file_id
 */
export async function uploadToCloudinary(file, type = "image") {
  if (!file) return null;

  try {
    //  Upload lên Cloudinary (KHÔNG cần token)
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const cloudRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
      fd
    );

    const cloudData = cloudRes.data;

    // Gửi metadata về backend (CÓ token qua interceptor)
    const backendRes = await api.post("/files", {
      storage_provider: "cloudinary",
      object_key: cloudData.public_id,
      url: cloudData.secure_url,
      thumbnail_url: null,
      file_name: cloudData.original_filename || file.name,
      content_type: file.type,
      file_size: cloudData.bytes,
      width: cloudData.width,
      height: cloudData.height,
      file_type: type,
      meta: cloudData,
    });

    return backendRes.data.file_id;
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    return null;
  }
}
