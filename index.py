from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="/static")

@app.route('/')
def home():
    return send_from_directory(".", "index.html")

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(".", path)

handler = app  # مهم لـ Vercel
