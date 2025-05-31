import { useState } from "react";
import FileUpload from "./components/upload";
import ImageCanvas from "./components/imageViewer";
import ReportViewer from "./components/reportViewer";
import "./App.css";

export default function App() {
  // Track multiple files, their annotations, and generated reports
  const [imageUrls, setImageUrls] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [reports, setReports] = useState([]);

  return (
    <div className="app-container">
      {/* Upload DICOM(s) */}
      <div className="panel left">
        <FileUpload onUpload={setImageUrls} />
      </div>

      {/* Display and detect on each image */}
      <div className="panel center">
        <ImageCanvas imageUrls={imageUrls} onDetect={setAnnotations} />
      </div>

      {/* Show a report per imag */}
      <div className="panel right ">
        <ReportViewer
          annotations={annotations}
          onReport={setReports}
          report={reports}
        />
      </div>
    </div>
  );
}
