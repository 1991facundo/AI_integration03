from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load('model.joblib')

class PredictionRequest(BaseModel):
    Pclass: int
    Sex: int
    Age: float
    SibSp: int
    Parch: int
    Fare: float
    Embarked: int

@app.post("/predict")
def predict_survival(data: PredictionRequest):
    df = pd.DataFrame([data.dict()])
    probability = model.predict_proba(df)[0][1] 
    
    if data.Sex == 1 and data.Age <= 18 and data.Pclass == 1:
        probability += 0.1  
    elif data.Sex == 0 and data.Pclass == 3:
        probability -= 0.1  
    probability = min(max(probability, 0), 1)  
    return {"survival_chance": f"{probability * 100:.2f}%"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
