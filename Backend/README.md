How to init backend service


cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload

once you create the local environment, you can directly use the following code to call the backend service
python -m uvicorn app.main:app --reload




what i did before
pip install "fastapi[standard]" pytest httpx

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

