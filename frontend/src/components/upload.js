import { useRef, useState } from "react";
import client from "../api/client";
import Spinner from "./Spinner";

export default function FileUpload({ onUpload }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);

  const uploadAll = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    try {
      const uploads = files.map(async (file) => {
        const form = new FormData();
        form.append("file", file);
        const res = await client.post("/upload/", form, {
          responseType: "blob",
        });
        return URL.createObjectURL(res.data);
      });
      const urls = await Promise.all(uploads);
      onUpload(urls);
    } catch (err) {
      alert("One or more uploads failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <h3>Upload DICOM(s)</h3>
      <input
        type="file"
        accept=".dcm,.rvg"
        multiple
        ref={fileInput}
        onChange={uploadAll}
        disabled={loading}
      />

      {loading && <Spinner />}

      <button
        disabled={loading}
        onClick={() => fileInput.current.click()}
        style={{ marginTop: "8px" }}
      >
        {loading ? "Uploading..." : "Select & Upload Files"}
      </button>
    </div>
  );
}
