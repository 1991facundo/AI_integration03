
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()


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
 
    prediction = model.predict(df)
   
    survival_chance = int(prediction[0])
    return {"survival_chance": survival_chance}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
