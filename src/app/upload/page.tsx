"use client";
import { useState, useEffect } from "react";
import AV from "../../leancloud";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(false);
  }, [selectedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setError("You can upload up to 3 photos only.");
      return;
    }
    for (const file of files) {
      if (file.type !== "image/jpeg") {
        setError("Only JPG files are allowed.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Each file must be less than 10MB.");
        return;
      }
    }
    setSelectedFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setSuccess(false);
    try {
      // TODO: Replace with LeanCloud user check if needed
      // For now, allow anonymous upload
      const uploadedUrls: string[] = [];
      for (const file of selectedFiles) {
        const avFile = new AV.File(file.name, file);
        await avFile.save();
        uploadedUrls.push(avFile.url());
        const Photo = AV.Object.extend("Photo");
        const photo = new Photo();
        photo.set("url", avFile.url());
        photo.set("filename", file.name);
        // Optionally set user info if you implement auth
        await photo.save();
      }
      setSuccess(true);
      setSelectedFiles([]);
    } catch (err: any) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Photos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/jpeg"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <ul className="mb-4">
          {selectedFiles.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={selectedFiles.length === 0 || !!error || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {success && <div className="text-green-600 mt-2">Upload successful!</div>}
      </form>
    </div>
  );
}
