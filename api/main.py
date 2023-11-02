from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import main
import numpy as np
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import gridfs
import base64
import os
import pymongo
from model import grabstockhistory
from langchain.llms import OpenAI


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Age(BaseModel):
    age: str


@app.post("/machinelearning/stock/{stockId}/predict")
def post_age_for_machine_learning():
    uri = "mongodb+srv://jeff50508:j9OsmTdlFr3Yshmc@ml.b003nk7.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    db = client['project']
    # Create an object of GridFs for the above database.
    fs = gridfs.GridFS(db)
    collection = db['fs.chunks']
    # Define an image object with the location.
    objecid = main(fs)
    document = collection.find_one({'files_id': objecid})
    # print(document)
    bindata = document['data']
    image_base64 = base64.b64encode(bindata).decode('utf-8')
    return {"image": image_base64}
    # print(bindata)
    # encoding = chardet.detect(bindata)['encoding']
    # data = bindata.decode(encoding)
    # print(data)


# 確保目錄存在，如果不存在則創建
os.makedirs("uploads", exist_ok=True)


@app.post('/machinelearning/stock/{stockId}')
async def findstock(stockId):
    print(stockId)
    historydata = grabstockhistory(stockId)
    return historydata


@app.get('/machinelearning')
async def machinelearning():
    os.environ["OPENAI_API_KEY"] = "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"
    # model_name="text-davinci-003"
    llm = OpenAI(temperature=0.9, model_name="text-davinci-003")
    text = "What would be a good company name for a company that makes colorful socks?"
    print(llm(text))
