import pyodbc
# from queries import *
connection = pyodbc.connect('Driver={SQL Server};'
                            'Server=26.28.83.84,1433;'
                            'Database=login;'
                            'UID=gwa_verifier;'
                            'PWD=cmsc128;'
                            'Trusted_connection=no;')

# gets the student data, computes and compares the GWA and cumulative score
def get_studentData(student_id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM studentData WHERE student_id = '{student_id}'")

    # array and variable declaration
    numerical_grades = []
    cumulative = []
    unit = []
    gradepoint = 0

    # THE CODE BELOW COMPUTES FOR THE GWA
    if cursor.rowcount != 0:
        for student in cursor:  
            grade = student[2] # contains the grade of the student
                
            # if the grade is numerical, append the grade and the number of units to their respective arrays
            if grade[0].isnumeric():
                numerical_grades.append(grade)    
                unit.append(int(student[3]))                

        # GWA computation and cumulative comparision
        for i in range(len(numerical_grades)):
            gradepoint += float(numerical_grades[i]) * unit[i] 

            if cumulative == get_cumulative():
                print('computed cumulative does not match with the recorded cumulative in the database')
        
        # compares the recorded and computed cumulative scores
        print("computed cumulative = " + str(gradepoint))
        print("recorded cumulative = " + str(get_cumulative(student_id)))

        if gradepoint == get_cumulative(student_id):
            print('recorded and computed cumulative do not match')
            insert_cumulativeError(student_id)

        # contains the final computed GWA, rounded to 5 decimal places. If the computed GWA and the recorded GWA from the database do not match, insert error to the table
        computed_gwa = round(gradepoint/sum(unit),5)
        # computed_gwa = 1.23456 #testing purposes
        print("computed GWA = " + str(computed_gwa))
        update_computedGWA(computed_gwa, student_id)

        recorded_gwa =  get_gwa(student_id)
        print("recorded gwa = " + str(recorded_gwa))

        #
        if computed_gwa != recorded_gwa:
            print('recorded and computed gwa do not match')
            insert_gwaError(student_id)
    else:
        print("student does not exist")

    return cursor

# gets the recorded GWA from the database
def get_gwa(student_id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT gwa FROM student WHERE student_id = '{student_id}'")

    for student_gwa in cursor:
        gwa = student_gwa[0]
    return gwa

# inserts the wrong GWA error to the studentflags table
def insert_gwaError(student_id):
    cursor = connection.cursor()
    cursor.execute(f"INSERT INTO studentFlags(student_id, flag) values('{student_id}', 'wrong gwa')")

    connection.commit()
    return cursor

# inserts the wrong cumulative error to the remarks table
def insert_cumulativeError(student_id):
    cursor = connection.cursor()
    cursor.execute(f"INSERT INTO remarks(student_id, flag) values('{student_id}', 'wrong gwa')")

    connection.commit()
    return cursor

# updates the student table with the computed GWA
def update_computedGWA(computed_gwa, student_id):
    cursor = connection.cursor()
    cursor.execute(f"UPDATE student SET computed_gwa = {computed_gwa} WHERE student_id = '{student_id}'")

    connection.commit()
    return cursor

# gets the recorded cumulative grade from the database.
def get_cumulative(student_id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT cumulative FROM studentData where student_id = '{student_id}'")

    for cumulative in cursor:
        print(cumulative)
        # student_cumulative = cumulative[0]
        # return student_cumulative
   
    

# TESTING FUNCTIONS 
# student_data = get_studentData('6094-24931')
# student_data = get_studentData('4109-74506')
print(get_cumulative('4109-74506'))

# check_missing('2689-53160')
# student_data = get_studentData('1950-86453')