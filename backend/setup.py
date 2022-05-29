from database_connect import *
from csv_reader import *
from create_tables import *
from queries import *



create_faculty(connection)
create_student(connection)
create_studentData(connection)
create_remarks(connection)
# create_flags(connection)
create_changelogs(connection)
create_ge_courses(connection)
create_studentFlags(connection)




def backend_setup():
    test = read_csv_xlsx()
    for  i in test:
        student_num = auto_increment()
        # print("student added to the database")
        # print("Name:" + i.name)
        # print("Last Name:" + i.last_name)
        # print("Student Number:", end ='')
        # print(i.student_number)
        # print("Course:" +i.undergraduate_program)

        # print("GWA:", end ='')
        # print(i.GWA)
        # print("recommended units taken:" , end ='') 
        # print(i.recommended_units_taken)
        # print("student units taken:", end ='') 
        # print(i.student_units_taken)
        # print("total cumulative :", end ='')
        # print(i.total_cumulative)
        # student_id, first_name, last_name, degree_program, gwa, computed_gwa, batch, total_units, req_units, total_commulative
        insert_student(student_num, i.name, i.last_name, i.undergraduate_program, i.GWA,i.student_units_taken,i.recommended_units_taken, i.total_cumulative)
        # i.courses_per_sem.pop(0)
        for j in i.courses_per_sem:
            #print(j.courses)
        
        
            for k in j.courses:
            
                # print('=========')
                # print(k)
            
            
                if(k[0] == 'CRSE NO.'):
                    None
                else:
                    try:
                        add_studentData(student_num, k[0], k[1], k[2], k[3], k[4] ,j.date)
                        None
                    except:
                        print(k[2])
                        print(k[2][3])
                        try:
                            add_studentData(student_num, k[0], k[1], k[2][3], k[3], k[4] ,j.date)
                            None
                        except:
                            pass
        
                        # print("nothing suspicious here ")

backend_setup()