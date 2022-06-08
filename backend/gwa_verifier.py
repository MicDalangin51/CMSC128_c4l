from queries import *
from database_connect import *


# gets the student data, computes and compares the GWA and cumulative score
def verify_gwa(student_id):

    student_data = get_student_data(student_id)
    
    # array and variable declaration
    total_gradepoint = 0 
    total_units = 0   
    load = {}

    # return student_data
    for data in student_data:
        acad_year = (str(data.keys()))[12:17]
        semester = str(data[acad_year].keys())[12]
        course_number = data[acad_year][semester]['course_number']
        grade = data[acad_year][semester]['grade']
        units = data[acad_year][semester]['units']
        weight = data[acad_year][semester]['weight']
        cumulative = data[acad_year][semester]['cumulative']
    

        if f"AY {acad_year} Semester {semester}" not in load:
            load[f"AY {acad_year} Semester {semester}"] = 0
        else:
            load[f"AY {acad_year} Semester {semester}"] += units

        
        # checks if the grade is a numeric grade. Letter grades are not counted in the GWA
        if grade[0].isnumeric():
            row_gradepoint = float(grade) * units
            total_gradepoint += row_gradepoint
            total_units += units

            # if there is a discrepancy found, insert error to remarks table
            if row_gradepoint != weight:
                insert_weightError(student_id, course_number, semester, acad_year, weight, row_gradepoint)
            
            if cumulative != total_gradepoint:
                insert_cumulativeError(student_id, course_number, semester, acad_year, cumulative, total_gradepoint)
    
    
    for i in load.keys():
        if load[i] < 12:
            insert_studentFlags(student_id, "Underload at " + i, "underload")
        elif load[i] > 21:
            insert_studentFlags(student_id, "Overload at " + i, "overload")
            
        
    # contains the final computed GWA, rounded to 5 decimal places. If the computed GWA and the recorded GWA from the database do not match, insert error to the table
    computed_gwa = round(total_gradepoint/total_units,5)   
    recorded_gwa =  get_gwa(student_id)

    # if the GWAs do not match, add the error to the studentFlags 
    if computed_gwa != recorded_gwa:
        insert_studentFlags(student_id, f'Expected GWA is {computed_gwa}', "gwa")


# gets the recorded GWA from the database
def get_gwa(student_id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT gwa FROM student WHERE student_id = '{student_id}'")

    for student_gwa in cursor:
        gwa = student_gwa[0]
    return gwa

# inserts the wrong GWA error to the studentflags table
def insert_studentFlags(student_id, message, error):
    try:
        cursor.execute(f"INSERT INTO studentFlags(student_id, flag) values('{student_id}', '{message}')")
        connection.commit()
    except:
        print("Error is already saved in the database")
        return False

# inserts the wrong cumulative error to the remarks table
def insert_weightError(student_id, course_code, semester, acad_year, prev_data, new_data):
    try:
        # cursor = connection.cursor()
        cursor.execute(f"INSERT INTO remarks(student_id, course_code, semester, acad_year, col_name, prev_data, new_data) values('{student_id}', '{course_code}', '{semester}', '{acad_year}', 'weight', '{prev_data}', '{new_data}')")

        connection.commit()
        return True
    except:
        print("Error is already saved in the database")
        return False

def insert_cumulativeError(student_id, course_code, semester, acad_year, prev_data, new_data):
    try:
        cursor.execute(f"INSERT INTO remarks(student_id, course_code, semester, acad_year, col_name, prev_data, new_data) values('{student_id}', '{course_code}', '{semester}', '{acad_year}', 'cumulative', '{prev_data}', '{new_data}')")

        connection.commit()
        return True
    except:
        print("Error is already saved in the database")
        return False

# updates the student table with the computed GWA
def update_computedGWA(computed_gwa, student_id):
    # cursor = connection.cursor()
    cursor.execute(f"UPDATE student SET computed_gwa = {computed_gwa} WHERE student_id = '{student_id}'")

    connection.commit()
    return cursor