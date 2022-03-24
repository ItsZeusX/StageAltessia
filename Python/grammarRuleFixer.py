from bs4 import BeautifulSoup as bs
from black import err
import mysql.connector
import requests
from tqdm import tqdm
import json
import traceback
cpt = 0
db = mysql.connector.connect(
    host = "localhost",
    passwd = "root",
    user = "root",
    database = "English"
    
)
cursor = db.cursor()
cursor.execute("select * from grammarRules")
rules = cursor.fetchall()
for rule in rules : 
    
    url = "https://app.ofppt-langues.ma" + rule[3]
    response = requests.request("GET", url)
    result = bs(response.content , "html.parser").prettify()
    params = [
            result,
            rule[0]
        ]
    cursor.execute(f"update grammarRules set content = %s where externalId = %s;" , params)
    cpt += 1
    print(cpt)
db.commit()