from flask import Flask, send_from_directory
import os

# تحديد المسارات المطلقة
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
HTML_FILE = os.path.join(BASE_DIR, "index.html")

app = Flask(__name__)

@app.route("/")
def home():
    try:
        return send_from_directory(BASE_DIR, "index.html")
    except Exception as e:
        return f"Error loading index.html: {str(e)}", 500

@app.route("/static/<path:path>")
def static_files(path):
    try:
        return send_from_directory(STATIC_DIR, path)
    except Exception as e:
        return f"Error loading static file: {str(e)}", 500

@app.route("/health")
def health():
    return {"status": "ok"}

# لا تستخدم app.run() لأن Vercel يدير التشغيل تلقائيًا
