import os
import glob
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from cv import scan, load_and_compress
from PIL import Image
from firebase import (initialize_app, initialize_bucket, ls, download_from_filepath, upload_from_filepath)


######################### Seed

if not os.path.exists("./tmp"):
    os.mkdir("./tmp")
if not os.path.exists("./tmp/in/"):
    os.mkdir("./tmp/in/")
if not os.path.exists("./tmp/out/"):
    os.mkdir("./tmp/out/")


######################### Helpers
def cleanup_tmp() -> None:
    in_paths = glob.glob("tmp/in/*")
    out_paths = glob.glob("tmp/out/*")
    
    for f in in_paths:
        os.remove(f)
    for f in out_paths:
        os.remove(f)

######################### API
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

# initialize DB
initialize_app()
bucket = initialize_bucket()

@app.get("/")
async def root():
    return HTMLResponse(html)

@app.get("/list")
async def list():
    """
    Returns the available files in GCS bucket
    """
    return JSONResponse(ls(bucket))


@app.get("/scan/{firebase_image_dir}")
def do_scan(firebase_image_dir: str):
    """
    1. download the image from FB with the given input
    2. scan(image)
    3. upload the resulting PDF back to FB
    4. return FB path to the resulting PDF

    Cannot be async due to the sequential nature of this workflow!
    """
    # 1. download image to /tmp
    filename = os.path.basename(firebase_image_dir)
    name, _ = filename.split(".")
    out_name = name + ".pdf"

    print("Output", out_name)
    print("File only", name)
    print("Full" , filename)

    r = download_from_filepath(bucket, firebase_image_dir, f"tmp/in/{filename}")
    if r:
        print("File downloaded succesfully")
    else:
        raise Exception("Download failed")
    
    # 2. do CV on the image
    paths = [os.path.join("tmp/in", img) for img in os.listdir("tmp/in")]
    imgs = load_and_compress(paths)
    res = scan(imgs[0])

    # 3. make `res` a PDF and write to /tmp/out/..
    res = Image.fromarray(res)
    res.save(f"tmp/out/{out_name}", "PDF")

    # 4. upload it to GCS
    r = upload_from_filepath(bucket, local_path=f"tmp/out/{out_name}", storage_path=f"pdf/{out_name}")   
    if r:
        print("File uploaded succesfully")
    else:
        raise Exception("Upload failed")
    
    # cleanup /tmp/* folders to reclaim space
    cleanup_tmp()

    return {"status":200, "loc": f"pdf/{out_name}"}
