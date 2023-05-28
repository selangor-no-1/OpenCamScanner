from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>OpenCamScanner API</title>
    </head>
    <body>
        <div>
            <h1>Hello from FastAPI</h1>
            <ul>
                <li><a href="/docs">/docs</a></li>
                <li><a href="/redoc">/redoc</a></li>
            </ul>
            <p>Powered by <a href="https://vercel.com" target="_blank">Vercel</a></p>
        </div>
    </body>
</html>
"""

@app.get("/")
async def root():
    return HTMLResponse(html)

@app.get("/ping")
async def hello():
    return {'status': 200, 'res': 'pong'}