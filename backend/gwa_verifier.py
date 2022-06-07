from queries import *
from database_connect import *
# gets the student data, computes and compares the GWA and cumulative score
def verify_gwa(student_id):

    student_data = get_student_data(student_id)
    
    # print(student_data)
    # print('--------------------')
    # array and variable declaration
    total_gradepoint = 0 
    total_units = 0   
    total_cumulative = 0

    # return student_data
    for data in student_data:
        acad_year = (str(data.keys()))[12:17]
        semester = str(data[acad_year].keys())[12]
        course_number = data[acad_year][semester]['course_number']
        grade = data[acad_year][semester]['grade']
        units = data[acad_year][semester]['units']
        weight = data[acad_year][semester]['weight']
        cumulative = data[acad_year][semester]['cumulative']
        
        # checks if the grade is a numeric grade. Letter grades are not counted in the GWA
        if grade[0].isnumeric():
            row_gradepoint = float(grade) * units
            total_gradepoint += row_gradepoint
            total_units += units

            # print(row_gradepoint, weight)
            # if there is a discrepancy found, insert error to remarks table
            if row_gradepoint != weight:
                # print(' weight does not match')
                insert_weightError(student_id, course_number, semester, acad_year, weight, row_gradepoint)
            
            # print(cumulative, total_gradepoint)
            if cumulative != total_gradepoint:
                # print(' cumulative does not match')
                insert_cumulativeError(student_id, course_number, semester, acad_year, cumulative, total_gradepoint)
    
    # print(total_units)
    # contains the final computed GWA, rounded to 5 decimal places. If the computed GWA and the recorded GWA from the database do not match, insert error to the table
    computed_gwa = round(total_gradepoint/total_units,5)
    print("computed GWA = " + str(computed_gwa))
    
    recorded_gwa =  get_gwa(student_id)
    print("recorded gwa = " + str(recorded_gwa))
    # update_computedGWA(computed_gwa, student_id)

    # if the GWAs do not match, add the error to the studentFlags 
    if computed_gwa != recorded_gwa:
        insert_gwaError(student_id)

    # return cursor

# gets the recorded GWA from the database
def get_gwa(student_id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT gwa FROM student WHERE student_id = '{student_id}'")

    for student_gwa in cursor:
        gwa = student_gwa[0]
    return gwa

# inserts the wrong GWA error to the studentflags table
def insert_gwaError(student_id):
    print(f'recorded and computed gwa of student {student_id} do not match')

    try:
        # cursor = connection.cursor()
        cursor.execute(f"INSERT INTO studentFlags(student_id, flag) values('{student_id}', 'wrong gwa')")

        connection.commit()
        return True
    except:
        print("Error is already saved in the database")
        return False

# inserts the wrong cumulative error to the remarks table
def insert_weightError(student_id, course_code, semester, acad_year, prev_data, new_data):
    print(f"weight error found at {student_id}, {course_code}, {semester}, {acad_year}. prev_data={prev_data} new_data = {new_data}")

    try:
        # cursor = connection.cursor()
        cursor.execute(f"INSERT INTO remarks(student_id, course_code, semester, acad_year, col_name, prev_data, new_data) values('{student_id}', '{course_code}', '{semester}', '{acad_year}', 'weight', '{prev_data}', '{new_data}')")

        connection.commit()
        return True
    except:
        print("Error is already saved in the database")
        return False

def insert_cumulativeError(student_id, course_code, semester, acad_year, prev_data, new_data):
    print(f"cumulative error found at {student_id}, {course_code}, {semester}, {acad_year}. prev_data={prev_data} new_data = {new_data}")

    try:
        # cursor = connection.cursor()
        cursor.execute(f"INSERT INTO remarks(student_id, course_code, semester, acad_year, col_name, prev_data, new_data) values('{student_id}', '{course_code}', '{semester}', '{acad_year}', 'cumulative', '{prev_data}', '{new_data}')")

        connection.commit()
        return True
    except:
        print("Error is already saved in the database")
        return False
        
# updates the student table with the computed GWA
def update_computedGWA(computed_gwa, student_id):
    print("updated the student table with the computed GWA")

    # cursor = connection.cursor()
    cursor.execute(f"UPDATE student SET computed_gwa = {computed_gwa} WHERE student_id = '{student_id}'")

    connection.commit()
    return cursor
    

   
    

# TESTING FUNCTIONS 
# verify_gwa('4571-62517') # completely right
# print("---------------------------------------")
# verify_gwa('4637-65128') # completely right
# print("---------------------------------------")
# verify_gwa('6957-81564') # completely right

# ------------------------------------   WITH ERRORS.   ------------------------------------------
# verify_gwa('3067-76025') # wrong GWA because of missing last row (Will Smith)
# print("---------------------------------------")
# verify_gwa('6149-17982') # wrong cumulative at ENG 5 AY 18/19 (Amber Heard)
# print("---------------------------------------")
# verify_gwa('5179-67043') # wrong weight at JAP 10  AY 16/17 (Maria Makiling)


# print(get_student_flags('3067-76025'))


# for i in get_student_data('6149-17982'):
#     print(i)