from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from typing import Optional
from cv import scan

###
### Firebase Deps ; refer experiments/firebase.ipynb
###

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
        </div>
    </body>
</html>
"""

@app.get("/")
async def root():
    return HTMLResponse(html)

@app.get("/ping")
async def hello():
    return {'status': 200}

@app.get("/scan/{firebase_image_dir}")
async def do_scan(firebase_image_dir: str):
    """
    1. download the image from FB with the given input
    2. scan(image)
    3. upload the resulting PDF back to FB
    4. return FB path to the resulting PDF
    """
    return {'test': firebase_image_dir}
