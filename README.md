Oralcare : A Dental X-Ray Pathology Detection App
A full-stack web application for detecting dental pathologies in DICOM X-ray images using Roboflow's object detection API and generating diagnostic reports via an LLM (Large Language Model). Users can upload dental DICOM files, view automated bounding box predictions, and receive AI-generated reports, all in a modern React dashboard.

Features
Upload and view Dental DICOM (.dcm or .rvg) images
Convert DICOM to grayscale PNG for visualization
Detect dental pathologies using a Roboflow model
Display bounding boxes for identified anomalies
Generate AI-powered diagnostic reports using OpenAI or other LLMs
Clean, responsive frontend built with React
FastAPI backend for inference and report generation

Tech Stack
Frontend: React, Tailwind CSS Backend: FastAPI, Uvicorn AI Services: Roboflow (object detection), Gemini 2.0-flash (report generation) Languages: Python, JavaScript Others: DICOM (via pydicom), PIL (image conversion), inference-sdk

📦 Prerequisites
Node.js v14+
Python 3.8+
Git
🖥️ Setup Instructions
🔧 Backend (FastAPI)
Clone the Repository

git clone https://github.com/your-username/Dental-Xray.git
cd Dental-Xray/backend
Create Virtual Environment

python -m venv venv
Activate Virtual Environment

Windows:

venv\Scripts\activate
macOS/Linux:

source venv/bin/activate
Install Dependencies

pip install -r requirements.txt
Set Required Environment Variables

set GEMINI_API_KEY=your_Gemini_api_key
Start FastAPI Server

uvicorn main:app --reload
Server runs at: http://localhost:8000

🎨 Frontend (React)
Navigate to Frontend Folder

cd ../frontend
Install Dependencies

npm install
Start React App

npm start
React runs at: http://localhost:3000

🧪 Usage
Upload a Dental DICOM file (.dcm or .rvg).
The image is converted to a visible format.
Click Run Detection to identify anomalies.
Bounding boxes are displayed on the image.
An AI-generated diagnostic report appears in the dashboard.
📁 Project Structure
project-root/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
├── README.md
└── .gitignore
📷 Preview
![Screenshot 2025-05-31 135847](https://github.com/user-attachments/assets/5b3e4cca-55ec-4ce4-b379-5db89ce2c907)
![Screenshot 2025-05-31 141248](https://github.com/user-attachments/assets/067901a9-6bcc-4129-961e-5f1aa5023dcf)

🔐 API Keys
Make sure to set your Gemini API key as environment variables before running the app
