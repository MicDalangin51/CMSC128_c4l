from flask import Flask, send_from_directory

client_dist_folder = "../frontend/dist"

app = Flask(__name__, static_folder=f"{client_dist_folder}/assets")


@app.route('/')
@app.route('/<path:path>')
def index(path=""):
    return send_from_directory(client_dist_folder, "index.html")


@app.route('/api/students/')
@app.route('/api/students/<int:page>')
def students(page=1):

    print("student directory page number:", page)

    # Mock data
    students = [
        {
            "name": "Ronn Jiongco",
            "email": "rjiongco@up.edu.ph",
            "status": "verified",
        },
        {
            "name": "Garth Lapitan",
            "email": "glapitan@up.edu.ph",
            "status": "unverified",
        },
        {
            "name": "Jemuel Juatco",
            "email": "jjuatco@up.edu.ph",
            "status": "verified",
        },
        {
            "name": "Nathan Muncal",
            "email": "nmuncal@up.edu.ph",
            "status": "unverified",
        },
    ]

    students *= 25

    return {"students": students}
