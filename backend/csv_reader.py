import csv
import itertools
from tkinter import Tk
from tkinter import filedialog
from numpy import append
import pyodbc
import random
from database_connect import *
from create_tables import * 



#oepnpyxl for excel manipulation (probably not worth it)
#to install openpyxl
#pip install openpyxl
from openpyxl import Workbook, load_workbook

# connection = pyodbc.connect('Driver={SQL Server};' 
#                             'Server=26.28.83.84,1433;'   
#                             'Database=login;' 
#                             'UID=gwa_verifier;'
#                             'PWD=cmsc128;'
#                             'Trusted_connection=no;')




class student: 
    def __init__(self,name, last_name, student_number,undergraduate_program, courses_per_sem, GWA, recommended_units_taken,student_units_taken, total_cumulative):
        self.name = name 
        self.last_name = last_name
        self.student_number = student_number
        self.undergraduate_program = undergraduate_program
        self.courses_per_sem = courses_per_sem
        self.GWA = GWA
        self.recommended_units_taken = recommended_units_taken
        self.student_units_taken = student_units_taken
        self.total_cumulative = total_cumulative


class semester: 
    def __init__(self,date, units, courses):
        self.date = date 
        self.units = units
        self.courses= courses     

    

list_of_students = []

def insert_student(student_id, first_name, last_name, degree_program, gwa, total_units, req_units, total_cumulative):
    cursor = connection.cursor()
    #
    
    
    # cursor.execute('insert into student(student_id, first_name, last_name, degree_program) values(?,?,?,?);', (student_id, first_name, last_name, deg_prog))
    cursor.execute('insert into student(student_id, first_name, last_name, degree_program, gwa, total_units, req_units, total_cumulative) values(?,?,?,?,?,?,?,?);', (student_id, first_name, last_name, degree_program, gwa, total_units, req_units, total_cumulative))
    connection.commit()

    


def csv_read_file(filepath):
    with open(filepath, 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ",")
    
        #takes the content of the csv file per line and stores it to a list 
        csv_reader_list = list(csv_reader)
        csv_reader_list_length = len(csv_reader_list)
        csv_length_per_line = len(csv_reader_list[0])-1
        student_list = []
        #print(csv_reader_list_length)
        i = 0
        while i < csv_reader_list_length: 
            if(i + 1 < csv_reader_list_length and csv_reader_list[i].count("")==csv_length_per_line-1 and csv_reader_list[i+1].count("")==csv_length_per_line):
                # print('start:')
                # print(i)

                student_name = csv_reader_list[i][1]
                student_last_name = csv_reader_list[i][0]
                student_undergraduate_program = csv_reader_list[i+1][0]
                student_courses_per_sem = []
                student_number = None
                recommended_units_taken = None
                student_units_taken = None
                total_cumulative = None
                if(csv_reader_list[i+2].count("")!=2):
                    student_number = csv_reader_list[i+2][0]
                    i+=1

                header = csv_reader_list[i+2]
                i+=2
                courses = []
                while csv_reader_list[i][0] != 'GWA':
                    if(csv_reader_list[i][0] == ''):
                        recommended_units_taken = csv_reader_list[i][1]
                        total_cumulative = csv_reader_list[i][4]
                    elif(csv_reader_list[i].count("")==2):
                        courses.append(csv_reader_list[i])
                    else:
                        courses.append(csv_reader_list[i])
                        student_courses_per_sem.append(semester(csv_reader_list[i][csv_length_per_line], csv_reader_list[i][csv_length_per_line-1],courses))
                        courses = []
                    i+=1
                student_GWA = csv_reader_list[i][1]
                i+=1
                student_units_taken = csv_reader_list[i][0]
                student_list.append(student(student_name,student_last_name, student_number, student_undergraduate_program,student_courses_per_sem, student_GWA, recommended_units_taken, student_units_taken, total_cumulative))
                
                # print('end:') 
                # print(i)
            i+=1
        return(student_list)


def xlsx_read_file(filepath):
    excel_file = load_workbook(filepath)
    excel_file_active_worksheet = excel_file.active
    excel_rows = []
    for rows in list(excel_file_active_worksheet.rows):
        temp_row = []
        for cells in rows:
            #print(cells.value, end=' ')
            temp_row.append(cells.value)
        excel_rows.append(temp_row)  
        #print()
    excel_rows_length = len(excel_rows)
    excel_rows_length_per_line = len(excel_rows[0])-1
    student_list = []
    i = 0
    while i < excel_rows_length: 
        if(i + 1 < excel_rows_length and excel_rows[i].count(None)==excel_rows_length_per_line-1 and excel_rows[i+1].count(None)==excel_rows_length_per_line):
            # print('start:')
            # print(i)

            student_name = excel_rows[i][1]
            student_last_name = excel_rows[i][0]
            student_undergraduate_program = excel_rows[i+1][0]
            student_courses_per_sem = []
            student_number = None
            recommended_units_taken = None
            student_units_taken = None
            total_cumulative = None
            if(excel_rows[i+2].count(None)>=7):
                print(excel_rows[i+2])
                student_number = excel_rows[i+2][0]
                i+=1

            header = excel_rows[i+2]
            i+=2
            courses = []
            while excel_rows[i][0] != 'GWA':
                if(excel_rows[i][0] == None):
                    recommended_units_taken = excel_rows[i][1]
                    total_cumulative = excel_rows[i][4]
                elif(excel_rows[i].count(None)>=3):
                    courses.append(excel_rows[i])
                else:
                    none_position = excel_rows[i].index(None)
                    
                    courses.append(excel_rows[i])
                    student_courses_per_sem.append(semester(excel_rows[i][none_position-1], excel_rows[i][none_position-2],courses))
                    courses = []
                i+=1
            student_GWA = excel_rows[i][1]
            
            i+=1
            
            student_units_taken = excel_rows[i][0]
            student_list.append(student(student_name,student_last_name, student_number, student_undergraduate_program,student_courses_per_sem, student_GWA, recommended_units_taken, student_units_taken, total_cumulative))
           
            # print('end:') 
            # print(i)
        i+=1
    return(student_list)
    
        
def read_csv_xlsx():
    Tk().withdraw()
    filepath = filedialog.askopenfilename()
    student_data = None
    Tk().mainloop()
    if(filepath.endswith('.csv')):
        student_data = csv_read_file(filepath)
        # for i in student_data:
        #     print(i.name)
        #     print(i.last_name)
        #     print(i.undergraduate_program)
        #     print(i.GWA)
        #     print('=========================')
        #     for j in i.courses_per_sem:
        #         print(j.date)
        #         print(j.units)
        #         for k in j.courses:
        #             print(k)
        #     print(i.recommended_units_taken)
        #     print(i.student_units_taken)

    elif(filepath.endswith('.xlsx')):
        student_data = xlsx_read_file(filepath)
        # for i in student_data:
        #     print(i.name)
        #     print(i.last_name)
        #     print(i.undergraduate_program)
        #     print(i.GWA)
        #     print('=========================')
        #     for j in i.courses_per_sem:
        #         print(j.date)
        #         print(j.units)
        #         for k in j.courses:
        #             print(k)
        #     print(i.recommended_units_taken)
        #     print(i.student_units_taken)
    
    return (student_data)
    

    
# cursor.execute('insert into student(student_id, first_name, last_name, degree_program) values(?,?,?,?);', (student_id, first_name, last_name, deg_prog))



def auto_increment():
    
    number = ''.join(random.sample('0123456789', 4))
    number_1 = ''.join(random.sample('0123456789', 5))
    str_num = number + '-' + number_1
    return str_num

def edit_studentData(table_name, student_id, col_name, new_data, semester, acad_year):
    cursor = connection.cursor()
    if col_name not in ['student_id', 'course_code', 'semester', 'acad_year']:
        cursor.execute(f"UPDATE {table_name} SET {col_name} = '{new_data}' WHERE student_id = '{student_id}' AND semester = '{semester}' AND acad_year = '{acad_year}';")
    else:
        print("To be implemented...")


    # cursor.execute(f'UPDATE {table_name} SET {col_name} = "{new_data}" WHERE student_id = "{student_id}" AND semester = "{semester}" AND acad_year = "{acad_year}";')
    connection.commit()

# test = csv_read_file(filepath)
# test = xlsx_read_file(filepath)
# test = read_csv_xlsx()
# create_faculty(connection)
# create_student(connection)
# create_studentData(connection)
# create_remarks(connection)
# create_flags(connection)

            
# 0128-28456 


# 0957-51760
# edit_data('login', '0957-51760', 'grade', '1', '2')

# insert_student('2019-00011', 'Mic', 'Mic', 'BSCS')
# add_studentData('2019-00000','CMSC 23', '2.0', 3)
        
# connection.close()
