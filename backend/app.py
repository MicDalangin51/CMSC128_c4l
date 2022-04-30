from flask import Flask, send_from_directory

client_dist_folder = "../frontend/dist"

app = Flask(__name__, static_folder=f"{client_dist_folder}/assets")


@app.route('/')
@app.route('/<path:path>')
def index(path=""):
    return send_from_directory(client_dist_folder, "index.html")
