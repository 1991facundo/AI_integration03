
import requests


url = 'http://localhost:8000/predict'


payload = {
    'Pclass': 1,
    'Sex': 0,
    'Age': 30,
    'SibSp': 0,
    'Parch': 0,
    'Fare': 150,
    'Embarked': 2
}

response = requests.post(url, json=payload)

print(response.json())
