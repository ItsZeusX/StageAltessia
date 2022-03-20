import json
import pyodbc
import requests
import traceback
from tqdm import tqdm

headers = {
  'x-device-uuid': 'aa0acb6c-2875-4865-92c2-b0abf188d152',
  'x-altissia-token': 'cf9c26c1954e85f562d586153933adf1804db1634cebd74aa0b2c389bcc33d60'
}

lesson = {
    "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES",
    "status": "NOT_STARTED",
    "title": "Comparative (Adjectives)",
    "description": None,
    "language": "en_GB",
    "level": "A2",
    "type": "GRAMMAR",
    "highlighted": False,
    "image": "/data/content_resources/current/lessons/EN_GB/EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES-16-9.jpg",
    "topic": {
        "externalId": "ADJECTIVES",
        "image": "/data/content_resources/current/topics/ADJECTIVES.jpg",
        "name": "Adjectives",
        "position": 5515,
        "translationKey": "lc_topic_grammar_adjectives_label"
    },
    "activities": [
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_MEANING_ACTIVITY_1",
            "title": "Meaning - Activity 1",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": True
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_MEANING_ACTIVITY_2",
            "title": "Meaning - Activity 2",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_GRAMMAR_RULE_MEANING_SUMMARY",
            "title": "Meaning - Summary",
            "score": None,
            "status": None,
            "activityType": "GRAMMAR_RULE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_FORM_ACTIVITY_1",
            "title": "Form - Activity 1",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_FORM_ACTIVITY_2",
            "title": "Form - Activity 2",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_GRAMMAR_RULE_FORM_SUMMARY",
            "title": "Form - Summary",
            "score": None,
            "status": None,
            "activityType": "GRAMMAR_RULE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_PRACTICE_ACTIVITY_1",
            "title": "Practice - Activity 1",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_PRACTICE_ACTIVITY_2",
            "title": "Practice - Activity 2",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        },
        {
            "externalId": "EN_GB_A2_GRAMMAR_COMPARATIVE_AND_SUPERLATIVE_ADJECTIVES_EXERCISE_PRACTICE_ACTIVITY_3",
            "title": "Practice - Activity 3",
            "score": None,
            "status": None,
            "activityType": "EXERCISE",
            "highlighted": False
        }
    ]
}
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=.;'
                      'Database=English;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()
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
    cursor.execute(f"insert into missions values(?,?,?,?,?)" , params)
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
            cursor.execute(f"insert into lessons values(?,?,?,?,?,?,?)" , params)
            url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}"
            response = requests.request("GET", url, headers=headers).json()
            #! ACTIVITIES
            for activity in response["activities"] :
                #? ==> EXERCISE
                if  activity["activityType"]  == "SUMMARY_TEST"  or activity["activityType"]  == "EXERCISE":
                    params = [
                        activity['externalId'],
                        activity['title'],
                        activity["activityType"],
                        lesson['externalId']
                
                    ]
                    cursor.execute(f"insert into exercises values(?,?,?,?)" , params)
                    activityExternalId = activity["externalId"]
                    url = f"https://app.ofppt-langues.ma/gw//lcapi/main/api/lc/lessons/{lessonExternalId}/activities/{activityExternalId}"
                    response = requests.request("GET", url, headers=headers).json()
                    #! QUESTIONS
                    for question in response["content"]["items"] :
                        try :
                            answers = ("&".join(question["answers"][0])) 
                            hint =  "&".join(question["hints"])
                        except :
                            answers = hint = None
                        params = [
                            question['externalId'],
                            question['question'],
                            question['uuidSound'],
                            question['uuidImage'],
                            answers,
                            question["answersType"],
                            "&".join(question["correctAnswers"][0]),
                            "hint",
                            question["instruction"],
                            question["specificInstruction"],
                            question["type"],
                            activityExternalId
                        ]
                        cursor.execute(f"insert into questions values(?,?,?,?,?,?,?,?,?,?,?,?)" , params)
                        conn.commit()

        except Exception as e:
            traceback.print_exc()
            pass
            #traceback.print_exc()
    conn.commit()
conn.close()

