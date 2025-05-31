# Oralcare: A Dental X-Ray Pathology Detection App

A full-stack web application for detecting dental pathologies in DICOM X-ray images using Roboflow’s object detection API and generating diagnostic reports via a Large Language Model. Users can upload dental DICOM files, view automated bounding box predictions, and receive AI-generated reports—all in a modern React dashboard.

---

## Features

- **Upload and View DICOM**  
  — Accepts Dental DICOM files (`.dcm` or `.rvg`) and converts them into grayscale PNG for on-screen visualization.  
- **Automated Pathology Detection**  
  — Utilizes a Roboflow-trained object detection model to identify dental anomalies and draw bounding boxes around them.  
- **AI-Generated Diagnostic Reports**  
  — Leverages Google’s Gemini 2.0-flash (or OpenAI) to produce concise, human-readable diagnostic text based on model annotations.  
- **Responsive React Dashboard**  
  — Clean UI built with React and Tailwind CSS for an intuitive user experience.  
- **FastAPI Backend**  
  — Handles DICOM conversion, model inference, and orchestrates calls to the LLM for report generation.  
- **Secure and Scalable**  
  — Container-ready, easily deployable to services like Render, AWS, or Heroku.

---

## Tech Stack

- **Frontend**  
  - React  
  - Tailwind CSS  

- **Backend**  
  - FastAPI  
  - Uvicorn  

- **AI/ML Services**  
  - Roboflow (Object Detection)  
  - Google Gemini 2.0-flash (Report Generation)  

- **Languages**  
  - Python (Backend Inference, DICOM handling)  
  - JavaScript (React UI)  

- **Other**  
  - `pydicom` & `Pillow` (DICOM → PNG conversion)  
  - `inference-sdk` (Roboflow client)  
  - `python-dotenv` (Environment variable management)  

---

## 📦 Prerequisites

- **Node.js** v14 or higher  
- **Python** 3.8 or higher  
- **Git** (for cloning the repository)  

---

## Usage
Open the React dashboard at http://localhost:3000.

Click Upload DICOM and select a dental X-ray file (.dcm or .rvg).

The backend converts it to a grayscale PNG and displays it on-screen.

Click Run Detection to invoke the Roboflow model:

Bounding boxes for detected pathologies appear overlaid on the image.

Once detection is complete, click Generate Report:

The app sends detected annotation data to the LLM endpoint (Gemini 2.0-flash).

A concise diagnostic report is displayed in the UI.

## 📁 Project Structure
pgsql
Copy
Edit
dental-xray/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env                # (not committed; for local environment variables)
│   └── inference_sdk/      # (if using a local copy)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

## Preview
![Screenshot 2025-05-31 135847](https://github.com/user-attachments/assets/5b3e4cca-55ec-4ce4-b379-5db89ce2c907)
![Screenshot 2025-05-31 141248](https://github.com/user-attachments/assets/067901a9-6bcc-4129-961e-5f1aa5023dcf)

## API Keys
Make sure to set your Gemini API key as environment variables before running the app
