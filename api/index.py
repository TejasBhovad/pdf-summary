from fastapi import FastAPI
import requests
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_community.llms import Ollama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
llm = Ollama(model="llama2")

app = FastAPI()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You will summarize the following PDF"),
    ("user", "{input}")
])
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

@app.get("/api/sum")
def sum(a: int, b: int):
    return {"sum": a + b}

@app.get("/api/pdf_text")
async def get_pdf_text(url: str):
    response = requests.get(url)
    pdf = PdfReader(BytesIO(response.content))
    text = ""
    for page in range(len(pdf.pages)):
        text += pdf.pages[page].extract_text()
    return {"text": text}

@app.get("/api/ask_ollama")
async def ask_ollama(question: str, pdf_content: str):
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You will summarize the following PDF"),
        ("user", pdf_content),
        ("user", question)
    ])
    chain = prompt | llm | output_parser

    result = chain.invoke({"input": question})
    return {"answer": result}