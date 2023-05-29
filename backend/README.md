# Backend 

### Quick Start

For local development,

```bash
cd api
```
Install deps:

```bash
virtualenv venv
.\venv\Scripts\activate // windows moment

pip install -r requirements.txt
```
```bash
uvicorn main:app
```

API server will run on localhost:8000