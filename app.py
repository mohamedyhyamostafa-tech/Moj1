from flask import Flask, send_file, send_from_directory, jsonify
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")

@app.route("/")
def home():
    try:
        return send_file(os.path.join(BASE_DIR, "index.html"))
    except Exception as e:
        return f"Error: {e}", 500

@app.route("/static/<path:filename>")
def serve_static(filename):
    try:
        return send_from_directory(STATIC_DIR, filename)
    except Exception as e:
        return f"Static file error: {e}", 500

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

# لا تكتب app.run() أبداً في Vercel
