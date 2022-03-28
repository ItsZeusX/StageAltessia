from bs4 import BeautifulSoup as bs
import mysql.connector
import requests
import json
import traceback
cpt = 0
db = mysql.connector.connect(
    host = "localhost",
    passwd = "root",
    user = "root",
    database = "English"
    
)
headers = {
  'x-device-uuid': 'aa0acb6c-2875-4865-92c2-b0abf188d152',
  'x-altissia-token': 'cf9c26c1954e85f562d586153933adf1804db1634cebd74aa0b2c389bcc33d60'
}
cursor = db.cursor()
cursor.execute("select * from lessons where type = 'PRACTICE'")
lessons = cursor.fetchall()
for lesson in lessons : 
    print("X")
    response  = requests.get(f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lesson[0]}" , headers=headers)
    activityExternalId = response.json()["activities"][0]["externalId"]
    response  = requests.get(f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lesson[0]}/activities/{activityExternalId}" , headers=headers)
    params = [
                activityExternalId,
                response.json()["content"]["context"],
                response.json()["content"]["task"],
                response.json()["content"]["uuidImage"],
                lesson[0]
                ]
    cursor.execute(f"insert into practice values(%s,%s,%s,%s, %s)" , params)
    db.commit()