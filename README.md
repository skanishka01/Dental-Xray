# Oralcare: A Dental X-Ray Pathology Detection App

A full-stack web application for detecting dental pathologies in DICOM X-ray images using Roboflow’s object detection API and generating diagnostic reports via a Large Language Model. Users can upload dental DICOM files, view automated bounding box predictions, and receive AI-generated reports—all in a modern React dashboard.



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
## 🖥 Setup Instructions

### 🔧 Backend (FastAPI)

1. *Clone the Repository*

   bash
   git clone https://github.com/your-username/Dental-Xray.git
   
   cd Dental-Xray/backend
   

3. *Create Virtual Environment*

   bash
   python -m venv venv
   

4. *Activate Virtual Environment*

   * *Windows:*
     
     powershell
     venv\Scripts\activate
   * *macOS/Linux:*
     
     bash
     source venv/bin/activate
     

5. *Install Dependencies*

   bash
   pip install -r requirements.txt
   

6. *Set Required Environment Variables*

   bash
   set GEMINI_API_KEY=your_Gemini_api_key
   

7. *Start FastAPI Server*

   bash
   uvicorn main:app --reload

  Server runs at: [http://localhost:8000](http://localhost:8000)

---

### 🎨 Frontend (React)

1. *Navigate to Frontend Folder*

   bash
   cd ../frontend
   

2. *Install Dependencies*

   bash
   npm install
   

3. *Start React App*
    bash
   npm start
   

   React runs at: [http://localhost:3000](http://localhost:3000)

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

project-root/
├── backend/ # Backend folder
│ ├── main.py # FastAPI backend logic
│ ├── requirements.txt # Python dependencies
│ └── ... # (e.g., utils, .env, etc.)
├── frontend/ # Frontend folder
│ ├── src/ # React source code
│ └── ... # (components, assets, etc.)
├── README.md # Project documentation
└── .gitignore # Ignore config for Git

## Preview
![Screenshot 2025-05-31 135847](https://github.com/user-attachments/assets/5b3e4cca-55ec-4ce4-b379-5db89ce2c907)
![Screenshot 2025-05-31 141248](https://github.com/user-attachments/assets/067901a9-6bcc-4129-961e-5f1aa5023dcf)

## API Keys
Make sure to set your Gemini API key as environment variables before running the app
