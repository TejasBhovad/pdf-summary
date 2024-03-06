from langchain_core.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
from langchain_core.output_parsers import StrOutputParser

output_parser = StrOutputParser()
llm = Ollama(model="llama2")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are world class technical documentation writer."),
    ("user", "{input}")
])
chain = prompt | llm | output_parser
chain.invoke({"input": "how can langsmith help with testing?"})