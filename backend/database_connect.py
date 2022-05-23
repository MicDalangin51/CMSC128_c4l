import pyodbc
from dotenv import load_dotenv
import os

load_dotenv()

connection = pyodbc.connect('Driver={SQL Server};'
                            f'Server={os.getenv("DB_SERVER")};'
                            f'Database={os.getenv("DB_NAME")};'
                            f'UID={os.getenv("DB_UID")};'
                            f'PWD={os.getenv("DB_PWD")};'
                            'Trusted_connection=no;')