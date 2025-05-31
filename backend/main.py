from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import pydicom, io, tempfile, os
from PIL import Image
from inference_sdk import InferenceHTTPClient

import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="oralcare")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # note “http://” not “https://”
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="PWoAQ2n5VnUlhyUSukff"
)

@app.get("/", tags=["root"])
def root():
    return {"message": "API running!"}

@app.post("/upload/")
async def upload_dicom(file: UploadFile = File(...)):
    try:
        ds = pydicom.dcmread(file.file)         
        arr = ds.pixel_array.astype(float)      
    except RuntimeError:
        raise HTTPException(
            status_code=415,
            detail=(
                "Cannot decompress DICOM pixel data. "
                "Ensure pylibjpeg, pylibjpeg-libjpeg, and pylibjpeg-openjpeg are installed."
            )
        )

    arr -= arr.min()
    if arr.max() != 0:
        arr = arr / arr.max() * 255.0
    arr = arr.astype('uint8')

    img = Image.fromarray(arr).convert("L")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return StreamingResponse(
        buf,
        media_type="image/png",
        headers={"Content-Disposition": "inline; filename=converted.png"}
    )

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    img_bytes = await file.read()
    if not img_bytes:
        raise HTTPException(status_code=400, detail="No image data received.")

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        tmp.write(img_bytes)
        tmp_path = tmp.name

    try:
        result = CLIENT.infer(tmp_path, model_id="adr/6")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Inference failed: {e}")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    return JSONResponse(content=result)


from fastapi import Body
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini client with API key from environment
client = genai.Client(api_key=GEMINI_API_KEY)

@app.post("/report/")
async def report(
    annotations: list = Body(..., description="List of prediction objects from /detect/"),
):
    # 1) Validate incoming JSON array
    if not annotations or not isinstance(annotations, list):
        raise HTTPException(status_code=400, detail="Expected a non-empty list of annotations.")

    # 2) Generate report via Gemini API
    if GEMINI_API_KEY:
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=(
                    "You are a dental radiologist. "
                    f"Given these annotations: {annotations}, write a concise diagnostic report."
                ),
            )
            text = response.text
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Gemini API error: {str(e)}")
    else:
        # Fallback/mock report
        text = "Mock report: Detected cavity on upper left molar, confidence 92%."

    return JSONResponse({"report": text})
