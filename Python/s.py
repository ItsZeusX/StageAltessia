from black import err
import mysql.connector
import requests
from tqdm import tqdm
import json
import traceback
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
errors = 0
data = json.load(open("Examples/All.json" , "r"))
#! MISSIONS
for mission in tqdm(data["missions"]):
    params = [
        mission['externalId'],
        mission['title'],
        mission['description'],
        mission['level'],
        mission['image']
    ]
    cursor.execute(f"insert into missions values(%s,%s,%s,%s,%s)" , params)
    #! LESSONS
    for lesson in mission["lessons"] :
        params = [
            lesson['externalId'],
            lesson['title'],
            lesson['description'],
            lesson['level'],
            lesson['type'],
            lesson['image'],
            mission['externalId']
        ]
        try :
            lessonExternalId = lesson["externalId"]
            cursor.execute(f"insert into lessons values(%s,%s,%s,%s,%s,%s,%s)" , params)
            url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}"
            response = requests.request("GET", url, headers=headers).json()
            #! ACTIVITIES
            for activity in response["activities"] :
                #? ==> EXERCISE/SUMMARY
                if  activity["activityType"]  == "SUMMARY_TEST"  or activity["activityType"]  == "EXERCISE":
                    params = [
                        activity['externalId'],
                        activity['title'],
                        activity["activityType"],
                        lesson['externalId']
                
                    ]
                    cursor.execute(f"insert into exercises values(%s,%s,%s,%s)" , params)
                    activityExternalId = activity["externalId"]
                    url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}/activities/{activityExternalId}"
                    response = requests.request("GET", url, headers=headers).json()
                    #! QUESTIONS
                    for question in response["content"]["items"] :
                        try :
                            hint =  "&".join(question["hints"])
                        except :
                            hint = None

                        try :
                            answers = ("&".join(question["answers"][0]))
                        except :
                            answers = None
                        
                        try : 
                            correctAnswers = "&".join(question["correctAnswers"][0]) 
                        except :
                            correctAnswers = None
                        params = [
                            question['externalId'],
                            question['question'],
                            question['uuidSound'],
                            question['uuidImage'],
                            answers,
                            question["answersType"],
                            correctAnswers,
                            hint,
                            question["instruction"],
                            question["specificInstruction"],
                            question["type"],
                            activityExternalId
                        ]
                        cursor.execute(f"insert into questions values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" , params)
                        db.commit()
                #? ==> GRAMMAR RULE
                if  activity["activityType"]  == "GRAMMAR_RULE":
                    activityExternalId = activity["externalId"]
                    url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}/activities/{activityExternalId}"
                    response = requests.request("GET", url, headers=headers).json()
                    params = [
                        activity['externalId'],
                        activity['title'],
                        response["content"]["type"],
                        response["content"]["url"],
                        lesson['externalId']
                
                    ]
                    cursor.execute(f"insert into grammarRules values(%s,%s,%s,%s,%s)" , params)
                    db.commit()
                #? ==> VIDEO
                if  activity["activityType"]  == "VIDEO":
                    activityExternalId = activity["externalId"]
                    url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}/activities/{activityExternalId}"
                    response = requests.request("GET", url, headers=headers).json()
                    params = [
                        activity['externalId'],
                        activity['title'],
                        response["content"]["videoUrl"],
                        lesson['externalId']
                
                    ]
                    cursor.execute(f"insert into videos values(%s,%s,%s,%s)" , params)
                    db.commit()
                #? ==> VOCABULARY
                if  activity["activityType"]  == "VOCABULARY_LIST":
                    params = [
                        activity['externalId'],
                        activity['title'],  
                        lessonExternalId        
                    ]
                    cursor.execute(f"insert into vocabulary values(%s,%s,%s)" , params)
                    activityExternalId = activity["externalId"]
                    url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}/activities/{activityExternalId}"
                    response = requests.request("GET", url, headers=headers).json()
                    #! VOCABULARY ITEMS
                    for item in response["content"]["items"] :
                    
                        params = [
                            item['externalId'],
                            item['category'],
                            item['definition'],
                            item['image'],
                            item["sound"],
                            item["word"],
                            activityExternalId
                        ]
                        cursor.execute(f"insert into vocabularyItems values(%s,%s,%s,%s,%s,%s,%s)" , params)
                        db.commit()
        except Exception as e:
            errors += 1
            pass
            #traceback.print_exc()
    db.commit()
print(errors)
