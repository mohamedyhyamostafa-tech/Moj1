from flask import Flask, send_from_directory, render_template_string

app = Flask(__name__, static_folder="../static", template_folder="../")

@app.route("/")
def home():
    return send_from_directory("../", "index.html")

@app.route("/static/<path:path>")
def static_files(path):
    return send_from_directory("../static", path)

@app.route("/api/score/<int:score>")
def score(score):
    if score >= 1000:
        return {"status": "win", "message": "Congratulations! You saved the galaxy!"}
    else:
        return {"status": "keep going", "message": f"Your score: {score}"}

if __name__ == "__main__":
    app.run(debug=True)
