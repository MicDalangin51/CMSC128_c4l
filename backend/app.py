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

@app.route('/api/students')
def getStudents():
    print("student directory page number:")

    # lowerStudent = (page - 1) * 50 + 1 # 51
    # upperStudent = page * 50 # 100
    
    students = get_all_students()
    student_count = get_num_of_students()
    
    return {"students": students, "studentsCount": student_count}

@app.route('/api/students/<string:student_number>')
def getStudent(student_number):
    student = get_student(student_number)
    return {"student": student}

@app.route('/api/login', methods = ['POST'])
def get_credentials():
    creds = request.get_json()
    username = creds['email']
    password = creds['password']

    valid = check_credentials(username, password)
    
    return {"success": valid }

@app.route('/api/students/<string:student_number>/courses/<string:course_code>', methods = ['DELETE'])
def delete_student_course(student_number, course_code):
    details = request.get_json()
    #semester = details['semester'][9]
    #acad_year = details['semester'][17:18] + "/" + details['semester'][22:23]
    delete_studentData(details['student_number'], details['course_number'], details['semester'], details['academic_year'])
    return {'success': True}

# @app.route('/api/students', methods = ['POST'])
# def add_student():
#     student_details = request.get_json()
#cursor.execute(f"SELECT * FROM student WHERE student_id = '{student_id}'")    insert_student(student_details['student number'], student_details['first name'], student_details['last name'], student_details['degree program'], NULL, NULL, NULL, NULL )

# @app.route('/api/students/<int:student number>', methods = ['PATCH'])
# def edit_student():
#     student_details = request.get_json()

#     column_name = None
#     new_data = None

#     edit_student(student_details['student number'], student_details['column name'], student_details['new data'])
#     # edit_data(student_details['student number'], student_details['first name'], 'ENG 1(AH)', '3', '15/16', 'grade', '2')

# @app.route('/api/students/<int:student number>', methods = ['DELETE'])
# def edit_student():
#     student_details = request.get_json()

#     column_name = None
#     new_data = None

#     edit_student(student_details['student number'], student_details['column name'], student_details['new data'])

# for student data row (add row, edit row and delete row)

@app.route('/api/students/<string:id>/courses', methods = ['POST'])
def add_student_course(id):
    course_details = request.get_json()
    # semester = course_details['semester'][9]
    add_studentData(course_details['student_number'], course_details['course_number'], course_details['grade'], course_details['units'], course_details['weight'], course_details['cumulative'], course_details['semester'] )
    return {'success': True}

# @app.route('/api/students/<string:id>/courses/<int:course code>', methods = ['PATCH'])
# def edit_student_course():
#     details = request.get_json()
#     #add_studentData(course_details['student number'], course_details['course number'], course_details['grade'], course_details['untis'], course_details['weight'], course_details['cumulative'], course_details['semester'])
#     return {'success': True}

# @app.route('/api/students/<string:id>/courses/<int:course code>', methods = ['DELETE'])
# def edit_student_course():
#     details = request.get_json()
#     #add_studentData(course_details['student number'], course_details['course number'], course_details['grade'], course_details['untis'], course_details['weight'], course_details['cumulative'], course_details['semester'])
#     return {'success': True}



