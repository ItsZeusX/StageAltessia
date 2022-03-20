import mysql.connector

db = mysql.connector.connect(
    host = "localhost",
    passwd = "root",
    user = "root"
    
)

cursor = db.cursor()
cursor.execute("create database x")
