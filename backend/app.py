from flask import Flask, request, send_from_directory
from flask_cors import CORS

from queries import *

client_dist_folder = "../frontend/dist"

app = Flask(__name__, static_folder=f"{client_dist_folder}/assets")
CORS(app)


@app.route('/')
@app.route('/<path:path>')
def index(path=""):
    return send_from_directory(client_dist_folder, "index.html")


@app.route('/api/student/<string:id>')
def student(id):
  student_data = get_student(id)
  return {"student_data": student_data}


@app.route('/api/students/<int:page>')
def students(page):
    print("student directory page number:", page)

    lowerStudent = (page - 1) * 50 + 1 # 51
    upperStudent = page * 50 # 100
    
    students = get_all_students()
    student_count = get_num_of_students()
    
    return {"students": students, "studentsCount": student_count}

@app.route('/api/login', methods = ['POST'])
def get_credentials():
    creds = request.get_json()
    username = creds['email']
    password = creds['password']

    valid = check_credentials(username, password)
    
    return {"success": valid }