from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from mcp_servers.mcp_youtube_transcript import get_transcript

app = FastAPI()

class TranscriptRequest(BaseModel):
    url: str

@app.post("/get_transcript")
def youtube_transcript(req: TranscriptRequest):
    return {"result": get_transcript(req.url)}

if __name__ == "__main__":
    uvicorn.run("mcp_youtube_transcript_server:app", host="0.0.0.0", port=8002, reload=True)
