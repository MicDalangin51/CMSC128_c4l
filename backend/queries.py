from database_connect import connection

cursor = connection.cursor()

# function that returns the number of students
def get_num_of_students():
    cursor.execute("SELECT COUNT(*) FROM student")
    student_count = cursor.fetchone()[0]

    return student_count


def get_all_students():
    cursor.execute('SELECT first_name, last_name, student_id, degree_program, status FROM student')
    rows = cursor.fetchall()
    students = []
    for first_name, last_name, student_id, degree_program, status in rows:
        students.append({
            "name": f"{last_name}, {first_name}",
            "course_name": degree_program,
            "student_number": student_id,
            "status": status or "pending"
        })

    connection.commit()
    return students


def get_student(student_id):
    cursor.execute(f"SELECT first_name, last_name, degree_program, student_id, gwa, total_units FROM student WHERE student_id = '{student_id}'")
    first_name, last_name, course, student_id, gwa, total_units = cursor.fetchone()

    summary = standardize_data(get_student_data(student_id))
    student_data = {
        "name": first_name + ", " + last_name,
        "course": course,
        "student_number": student_id,
        "GWA": gwa,
        "total_units": total_units,
        "summary": summary,
    }
    
    connection.commit()
    return student_data


def get_student_data(student_id):
    student_data = []
    for course_code, grade, units, weight, cumulative, semester, acad_year in cursor.execute(f"SELECT course_code, grade, units, weight, commulative, semester, acad_year FROM studentData WHERE student_id = '{student_id}'"):
        student_dict = {
          acad_year: {
            semester: {
              "course_number": course_code,
              "grade": grade,
              "units": units,
              "weight": weight,
              "cumulative": cumulative,
            }
          }
        }
        student_data.append(student_dict)
        
    connection.commit()
    
    return student_data


def standardize_data(student_data_list):

    # student_data_list = [{}, {}, {},]
    acad_year = []
    for student_data in student_data_list:
        # if wala yung acad year 
        if student_data.keys() not in acad_year:
            acad_year.append(student_data.keys())

    acad_year = list(acad_year)
    print(acad_year)
    # if equal yung acad_year (database side) sa acad_year ng (student_data.keys())
    # for year in acad_year:
        
    # separate for loop

    # student_data[acad_year].keys()

    sorted_student_data = []
    for i in range(len(acad_year)):
        sorted_student_data.append([])

    # len(acad_year) = 5
    # sorted_student_data = [[], [], [], [], []]

    for student_data in student_data_list:
        for i in range (len(acad_year)):
            if student_data.keys() == acad_year[i]:
                sorted_student_data[i].append(student_data[str(student_data.keys())[12:17]])

    # print(sorted_student_data[0].values())

    # "semester": 
# [
#   [ {} ],
#   [ {} ] 
# ]

    
    count = 0
    student_info = []
    for student_list in sorted_student_data:
        sem_1 = []
        sem_2 = []
        for dict in student_list:
            # print("dict key: " + str(dict.keys())[12:13])
            if str(dict.keys())[12:13] == "1":
                sem_1.append(dict[str(dict.keys())[12:13]])
            elif str(dict.keys())[12:13] == "2":
                sem_2.append(dict[str(dict.keys())[12:13]])

        

        student_grades = {
            
            # "semester": "Semester 1-" + "A.Y." + acad_year[count] + "-" + acad_year[count],
            "content": sem_1,
            "semester": "Semester 1-" + "A.Y." + "20"+ str(acad_year[count])[12:14] + "-" + "20"+ str(acad_year[count])[15:17],
        }

        student_info.append(student_grades)

        student_grades = {
            
            # "semester": "Semester 2-" + "A.Y." + str(acad_year[count]) + "-" + acad_year[count],
            "content": sem_2,
            "semester": "Semester 2-" + "A.Y." + "20"+ str(acad_year[count])[12:14] + "-" + "20"+ str(acad_year[count])[15:17],
        }

        student_info.append(student_grades)

        count += 1
        
    # print(student_info)
    # print(sem_2)

    return student_info

# function for adding or removing rows



# function for editing the data in the database




# function that tracks the changelog

def delete_studentData(student_id, code, semester, acad_year):
    cursor.execute(f"DELETE FROM studentData WHERE student_id = '{student_id}' AND course_code = '{code}' AND semester = '{semester}' AND acad_year = '{acad_year}';")
    connection.commit()


# function to add student
def add_studentData(student_id, code, grade, units, weight, commulative, semester):
    # if the semester string contains the substirng "midyear", treat the added student data as midyear, else, it would the first or second semester
    if "midyear" in semester:
        semester_num = 'M'
        semester_year = semester[7:12]
    else:
        semester_num =  1 if len(semester) == 7 else 2 
        semester_year = semester[2:7] if len(semester) == 7 else semester[3:8]
    #IL/15/16
    #I/15/16
    #midyear 2016
    cursor.execute('insert into studentData(student_id, course_code, grade, units, weight, commulative, semester, acad_year) values(?,?,?,?,?,?,?,?);', (student_id, code, grade, units, weight, commulative, semester_num, semester_year))
    connection.commit()                                                                                                                #what do you need me to do? Hahaha

def check_credentials( username, password):
    values = cursor.execute('SELECT email, password FROM faculty')
    for i in values:
        if(i[0] == username.strip() and i[1] == password.strip()):
            return True
        # print( i[0] + ' ---- '+username.strip())
        # print(i[1]  + ' ---- '+password.strip())
    return False

# add_studentData('4579-76154', 'CMSC 128', 1, 3, 6, 156, 'll/15/16')
# delete_studentData('4579-76154', 'CMSC 128', 1, '15/16')

def get_GECourses():
    GEList = []

    for course_name, course_code,ge_type in cursor.execute('SELECT course_name, course_code, ge_type FROM geCourses'):
        temp = [str(course_name) + ' ' + str(course_code), ge_type]
        GEList.append(temp)

    return GEList

def check_ge_requirements(student_id):
    ge_courses = get_GECourses()
    students = get_student_data(student_id)
    # print(ge_courses)
    elective_count = 0
    core_count = 0

    

    for student in students:
        for student_data_acad_year in list(student.keys()):
            for student_data_semester in list(student[student_data_acad_year].keys()):
                course = student[student_data_acad_year][student_data_semester]['course_number']
                for i in ge_courses:
                    
                    if(i[0] in course):
                        try:
                            if (not course[len(i[0])].isdigit()):
                                print(course)
                                if(i[1] == 'elective'):
                                    elective_count += 1
                                else:
                                    core_count += 1
                        except:
                            print(course)
                            if(i[1] == 'elective'):
                                elective_count += 1
                            else:
                                core_count += 1
                        
    # 7 dapat yung core GEs
    # 3 lang yung elective GEs
                  
    print(elective_count)
    print(core_count)

    if (core_count >= 7 and elective_count >= 3):
        return True
    
    return False
                
            


check_ge_requirements('4579-76154')