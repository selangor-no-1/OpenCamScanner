# OpenCamScanner

Backend hosted at: https://web-production-1361.up.railway.app/
Frontend hosting at: [pending deployment to Vercel]

### Quick Start

Fill in Firebase API keys at
- **`backend/api/serviceAccountKey.json`**
- **`frontend/api/.env.sample`**

Once filled, rename the latter to `.env.local`. The file that reads these credentials from `process.env` is located at
`@/lib/firebaseConfig.ts`.

**Running the frontend**

```bash
[pnpm/npm/yarn] i
[pnpm/npm/yarn] run dev
```

**Running the backend**
```
virtualenv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app
```
