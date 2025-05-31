import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import client from "../api/client";

export default function ReportViewer({
  annotations = [], // array of prediction-arrays
  onReport,
  report = [],
}) {
  const [loadingMap, setLoadingMap] = useState({});

  useEffect(() => {
    // run for each annotation set
    annotations.forEach((ann, idx) => {
      if (!ann) return;
      if (ann.length === 0) {
        onReport((prev = []) => {
          const next = [...prev]; 
          next[idx] = "No cavities detected.";
          return next;
        });
        return;
      }

      (async () => {
        setLoadingMap((m) => ({ ...m, [idx]: true }));
        try {
          const res = await client.post(
            "/report/",
            ann,
            { headers: { "Content-Type": "application/json" } }
          );
          onReport((prev = []) => {
            const next = [...prev];
            next[idx] = res.data.report || "No report returned.";
            return next;
          });
        } catch (err) {
          onReport((prev = []) => {
            const next = [...prev];
            const status = err.response?.status || "";
            next[idx] = `Report generation failed: ${status} ${err.message}`;
            return next;
          });
        } finally {
          setLoadingMap((m) => ({ ...m, [idx]: false }));
        }
      })();
    });
  }, [annotations, onReport]);

  return (
    <div className="report-grid">
      {annotations.map((_, idx) => (
        <div key={idx} style={{ position: "relative", padding: 16, border: "1px solid #ccc", borderRadius: 8, marginBottom: 24 }}>
          <h4>Image #{idx + 1} Report</h4>
          {loadingMap[idx] && <Spinner />}
          {!loadingMap[idx] && (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {report[idx] || "Waiting for data..."}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}


