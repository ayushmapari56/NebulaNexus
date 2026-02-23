from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from database import engine, Base
import api.models as models
from api.router import router as api_router

# Create Database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Jal-Pravandhan Saathi AI Drought API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "NebulaNexus AI Drought Prevention API is running"}

@app.get("/api/drought/data")
def get_drought_data():
    """Returns actual district data processed by the AI Engine"""
    from services.data_processor import processor
    data = processor.load_rainfall_data()
    
    return {
        "status": "success",
        "data": {
            "districts": data,
            "total_analyzed": len(data),
            "critical_flags": len([d for d in data if d['wsi'] >= 0.8])
        }
    }
