import { useRef, useState } from "react";
import client from "../api/client";
import Spinner from "./Spinner";

export default function ImageCanvas({ imageUrls = [], onDetect }) {
  // refs and loading flags per image
  const imgRefs = useRef([]);
  const canvasRefs = useRef([]);
  const [loadingMap, setLoadingMap] = useState({});

  const runDetection = async (idx) => {
    const imageUrl = imageUrls[idx];
    setLoadingMap((m) => ({ ...m, [idx]: true }));

    try {
      const blob = await fetch(imageUrl).then((r) => r.blob());
      const form = new FormData();
      form.append("file", blob, "converted.png");
      const { data } = await client.post("/detect/", form);
      const preds = data.predictions || [];
      drawBoxes(idx, preds);
      
      // collect all predictions into an array in index order
      onDetect((prev = []) => {
        const next = [...prev];
        next[idx] = preds;
        return next;
      });
    } catch (err) {
      alert("Detection failed: " + err.message);
    } finally {
      setLoadingMap((m) => ({ ...m, [idx]: false }));
    }
  };

  const drawBoxes = (idx, preds) => {
    const canvas = canvasRefs.current[idx];
    const img = imgRefs.current[idx];
    const ctx = canvas.getContext("2d");
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";

    const xScale = canvas.width / img.naturalWidth;
    const yScale = canvas.height / img.naturalHeight;

    preds.forEach(({ x, y, width, height, class: cls, confidence }) => {
      const sx = x * xScale,
            sy = y * yScale,
            sw = width * xScale,
            sh = height * yScale;
      ctx.strokeRect(sx, sy, sw, sh);
      ctx.fillText(`${cls} ${(confidence * 100).toFixed(1)}%`, sx, sy - 5);
    });
  };

  return (
    <div className="image-grid">
      {imageUrls.map((url, idx) => (
        <div key={idx} style={{ position: "relative", marginBottom: 24 }}>
          <img
            ref={(el) => (imgRefs.current[idx] = el)}
            src={url}
            alt={`upload-${idx}`}
            style={{ display: "block", maxWidth: "50%" }}
          />
          <canvas
            ref={(el) => (canvasRefs.current[idx] = el)}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          
          {loadingMap[idx] && <Spinner />}

          <button
            disabled={loadingMap[idx]}
            onClick={() => runDetection(idx)}
            style={{ marginTop: 8 }}
          >
            {loadingMap[idx] ? "Detecting..." : "Run Detection"}
          </button>
        </div>
      ))}
    </div>
  );
}
