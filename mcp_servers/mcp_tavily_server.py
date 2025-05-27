from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from mcp_servers.mcp_tavily import search

app = FastAPI()

class SearchRequest(BaseModel):
    query: str

@app.post("/search")
def tavily_search(req: SearchRequest):
    return {"result": search(req.query)}

if __name__ == "__main__":
    uvicorn.run("mcp_tavily_server:app", host="0.0.0.0", port=8001, reload=True)
