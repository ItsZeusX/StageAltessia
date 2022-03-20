import pyodbc

data = {
    "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_",
    "title": "Environment - Some environmental policies",
    "score": None,
    "status": None,
    "activityType": "EXERCISE",
    "content": {
        "type": "Exercise",
        "items": [
            {
                "answers": [
                    [
                        "in the number of violent attacks on shop staff and in the number of robberies",
                        "training videos on how to survive attacks",
                        "full-time security advisers and sophisticated security measures",
                        "he has been bitten as well as threatened with knives and other instruments",
                        "are off-licences, supermarkets and petrol stations",
                        "were either attacked or threatened with violence last year"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "in the number of violent attacks on shop staff and in the number of robberies"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__0",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "There has been a sharp rise[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            },
            {
                "answers": [
                    [
                        "in the number of violent attacks on shop staff and in the number of robberies",
                        "were either attacked or threatened with violence last year",
                        "training videos on how to survive attacks",
                        "are off-licences, supermarkets and petrol stations",
                        "he has been bitten as well as threatened with knives and other instruments",
                        "full-time security advisers and sophisticated security measures"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "he has been bitten as well as threatened with knives and other instruments"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__1",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "Clive Dixon says[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            },
            {
                "answers": [
                    [
                        "he has been bitten as well as threatened with knives and other instruments",
                        "full-time security advisers and sophisticated security measures",
                        "in the number of violent attacks on shop staff and in the number of robberies",
                        "are off-licences, supermarkets and petrol stations",
                        "were either attacked or threatened with violence last year",
                        "training videos on how to survive attacks"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "training videos on how to survive attacks"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__2",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "The industry now issues[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            },
            {
                "answers": [
                    [
                        "training videos on how to survive attacks",
                        "are off-licences, supermarkets and petrol stations",
                        "in the number of violent attacks on shop staff and in the number of robberies",
                        "full-time security advisers and sophisticated security measures",
                        "he has been bitten as well as threatened with knives and other instruments",
                        "were either attacked or threatened with violence last year"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "are off-licences, supermarkets and petrol stations"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__3",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "The most dangerous stores to work in[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            },
            {
                "answers": [
                    [
                        "are off-licences, supermarkets and petrol stations",
                        "in the number of violent attacks on shop staff and in the number of robberies",
                        "he has been bitten as well as threatened with knives and other instruments",
                        "full-time security advisers and sophisticated security measures",
                        "training videos on how to survive attacks",
                        "were either attacked or threatened with violence last year"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "full-time security advisers and sophisticated security measures"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__4",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "The big chains can afford[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            },
            {
                "answers": [
                    [
                        "he has been bitten as well as threatened with knives and other instruments",
                        "are off-licences, supermarkets and petrol stations",
                        "training videos on how to survive attacks",
                        "were either attacked or threatened with violence last year",
                        "full-time security advisers and sophisticated security measures",
                        "in the number of violent attacks on shop staff and in the number of robberies"
                    ]
                ],
                "answersType": "TEXT",
                "correctAnswers": [
                    [
                        "were either attacked or threatened with violence last year"
                    ]
                ],
                "externalId": "EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL__5",
                "hints": None,
                "instruction": "Listen, then match the sentence parts together.",
                "question": "190,000 shop staff[GAP].",
                "specificInstruction": "Listen carefully",
                "specificInstructionGap": None,
                "type": "MULTIPLE_CHOICE",
                "uuidImage": None,
                "uuidSound": "/data/content_resources/current/lessons/EN_GB/EN_GB_C1_VOCABULARY_REPORTING_ON_A_CONFERENCE_FOR_CRIMINALS_EXERCISE_ENVIRONMENT_SOME_ENVIRONMENTAL_.blu"
            }
        ]
    }
}
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=.;'
                      'Database=English;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

for question in data["content"]["items"] :
    hint = question["hints"]
    params = [
        question['externalId'],
        question['question'],
        question['uuidSound'],
        question['uuidImage'],
        "&".join(question["answers"][0]) or None,
        question["answersType"],
        "&".join(question["correctAnswers"][0]) or None,
        hint,
        question["instruction"],
        question["specificInstruction"],
        question["type"],
        "activityExternalId"

    ]
    cursor.execute(f"insert into questions values(?,?,?,?,?,?,?,?,?,?,?,?)" , params)
    conn.commit()
    conn.close()