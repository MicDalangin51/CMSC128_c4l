import pyodbc
import sys


# connect to the MS SQL Server
connection = pyodbc.connect('Driver={SQL Server};' 
                            'Server=26.28.83.84,1433;'   
                            'Database=login;' 
                            'UID=gwa_verifier;'
                            'PWD=cmsc128;'
                            'Trusted_connection=no;')

# create the student data table
def create_studentData(connection):
    cursor = connection.cursor()

    # check if the table does not exist in the database
    if not cursor.tables(table='studentData', tableType='TABLE').fetchone():
        print("TABLE: studentData does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                        CREATE TABLE studentData (
                            student_id varchar(10) foreign key references student(student_id) not null,
                            course_code varchar(15),
                            grade varchar(15),
                            units int,
                            weight float,
                            cumulative float,
                            semester varchar(15),
                            acad_year varchar(15),
                        );
        ''')
        connection.commit()
    else:
        print('TABLE: studentData already exists.')

# create the student table
def create_student(connection):
    cursor = connection.cursor()

    # check if the table does not exist in the database
    if not cursor.tables(table='student', tableType='TABLE').fetchone():
        print("TABLE: student does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                        CREATE TABLE student (
                            student_id varchar(10) primary key,
                            first_name varchar(20),
                            middle_name varchar(20),
                            last_name varchar(20),
                            degree_program varchar(10),
                            college varchar(10),
                            gwa float,
                            computed_gwa float,
                            batch int,
                            first_verifier varchar(50),
                            second_verifier varchar(50),
                            other_verifier varchar(50),
                            status varchar(5),
                            total_units int,
                            req_units int,
                            total_cumulative float
                    );
        ''')
        connection.commit()
    else:
        print('TABLE: student already exists.')

# create the faculty table
def create_faculty(connection):
    # establish a connection to the database
    cursor = connection.cursor()

    # check if the table does not exist in the database
    if not cursor.tables(table='faculty', tableType='TABLE').fetchone():
        print("TABLE: faculty does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                        CREATE TABLE faculty (
                            email varchar(30) not null, 
                            password varchar(100) not null, 
                            faculty_id varchar(15) primary key, 
                            access_level int,
                            department varchar(15),
                            name varchar(30) not null
                    );
        ''')

        # commit the query
        connection.commit()
    else:
        print('TABLE: faculty already exists.')

# create the remarks table
def create_remarks(connection):
    # establish a connection to the database
    cursor = connection.cursor()
    
    # check if the table does not exist in the database
    if not cursor.tables(table='remarks', tableType='TABLE').fetchone():
        print("TABLE: remarks does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                       CREATE TABLE remarks (
                            student_id varchar(10) not null,
                            course_code varchar(15) not null,
                            semester varchar(15) not null,
                            acad_year varchar(15) not null,
                            col_name varchar(15),
                            prev_data varchar(15),
                            new_data varchar(15),
                            CONSTRAINT PK_remarks PRIMARY KEY (student_id, course_code, col_name, semester, acad_year, prev_data, new_data)
                        );
        ''')
        connection.commit()
    else:
        print('TABLE: remarks already exists.')

# create the flags table
# def create_flags(connection):
#     # establish a connection to the database
#     cursor = connection.cursor()
    
#     # check if the table does not exist in the database
#     if not cursor.tables(table='flags', tableType='TABLE').fetchone():
#         print("TABLE: flags does not exist \nCreating one...")

#         # if it does not exist, create a table
#         cursor.execute('''
#                        CREATE TABLE flags (
#                             student_id varchar(10) not null,
#                             course_code varchar(15) not null,
#                             semester varchar(15) not null,
#                             acad_year varchar(15) not null,
#                             overload_flag int,
#                             underload_flag int,
#                             inc_flag int,
#                             dfg_flag int,
#                             drp_flag int,
#                             loa_flag int,
#                             awol_flag int,
#                             other varchar(50),
#                             other_flag int,
#                             CONSTRAINT FK_flags FOREIGN KEY (student_id, course_code, semester, acad_year) references remarks(student_id, course_code, semester, acad_year)
#                         );
#         ''')
#         connection.commit()
#     else:
#         print('TABLE: flags already exists.')

def create_changelogs(connection):
    # establish a connection to the database
    cursor = connection.cursor()
    
    # check if the table does not exist in the database
    if not cursor.tables(table='changelogs', tableType='TABLE').fetchone():
        print("TABLE: changelogs does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                       CREATE TABLE changelogs (
                            faculty_id varchar(15) foreign key references faculty(faculty_id) not null, 
                            student_id varchar(10) not null,
                            date date,
                            time time,
                            justification varchar(50),
                            col_name varchar(15),
                            prev_data varchar(30),
                            new_data varchar(30)
                        );
        ''')
        connection.commit()

        
    else:
        print('TABLE: changelogs already exists.')

def create_studentFlags(connection):
    # establish a connection to the database
    cursor = connection.cursor()
    
    # check if the table does not exist in the database
    if not cursor.tables(table='studentFlags', tableType='TABLE').fetchone():
        print("TABLE: studentFlags does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                       CREATE TABLE studentFlags (
                            student_id varchar(10) foreign key references student(student_id) not null,
                            flag varchar(100) not null
                            CONSTRAINT PK_studentFlags PRIMARY KEY (student_id, flag)
                        );
        ''')
        connection.commit()
    else:
        print('TABLE: studentFlags already exists.')
    

def create_ge_courses(connection):
    # establish a connection to the database
    cursor = connection.cursor()
    
    # check if the table does not exist in the database
    if not cursor.tables(table='geCourses', tableType='TABLE').fetchone():
        print("TABLE: geCourses does not exist \nCreating one...")

        # if it does not exist, create a table
        cursor.execute('''
                       CREATE TABLE geCourses (
                            course_name varchar(10),
                            course_code varchar(10),
                            units int,
                            ge_type varchar(10)
                        );
        ''')
        connection.commit()

        # insert GE Courses in the table
        cursor.execute('''
                        INSERT INTO geCourses (course_name, course_code, units, ge_type)
                        VALUES
                            ('ARTS', '1', 3, 'core'),
                            ('COMM', '10', 3, 'core'),
                            ('ETHICS', '1', 3, 'core'),
                            ('KAS', '1', 3, 'core'),
                            ('HIST', '1', 3, 'core'),
                            ('STS', '1', 3, 'core'),
                            ('PI', '10', 3, 'core'),
                            ('HUM', '3', 3, 'elective'),
                            ('KAS', '4', 3, 'elective'),
                            ('MATH', '10', 3, 'elective'),
                            ('PHILARTS', '1', 3, 'elective'),
                            ('PHLO', '1', 3, 'elective'),
                            ('PS', '21', 3, 'elective'),
                            ('SAS', '1', 3, 'elective'),
                            ('SCIENCE', '10', 3, 'elective'),
                            ('SCIENCE', '11', 3, 'elective'),
                            ('SOSC', '3', 3, 'elective'),
                            ('WIKA', '1', 3, 'elective')
        ''')

        connection.commit()
    else:
        print('TABLE: geCourses already exists.')

# format
# foreign key: faculty_id varchar(15) foreign key references faculty(faculty_id), 
# composite primary key: CONSTRAINT PK_sample PRIMARY KEY (faculty_id, access_level)


# create_faculty(connection)
# create_student(connection)
# create_studentData(connection)
# create_remarks(connection)
# create_flags(connection)
# create_changelogs(connection)
# create_ge_courses(connection)

# connection.close()