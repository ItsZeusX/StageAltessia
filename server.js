const { query } = require("express");
const express = require("express");
const app = express();
var path = require('path');

var mysql = require("mysql");
var cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "English",
  multipleStatements: true
});

app.use(express.static(path.join(__dirname, 'public'))); 
app.set("view engine", "ejs");


app.get("/home" ,GetHome , (req, res , next) => {
  res.render("home" , req.missions)
});

app.get("/exercise/:exerciseId" ,GetExercise , (req, res , next) => {
  res.render("exercise" , req.exercise)
});

app.get("/lesson/:lessonId" , GetLesson , (req, res , next) => {
  res.render("lesson",req.lesson)
});


app.get("/api/lesson/:lessonId" , GetLesson , (req, res , next) => {
  res.json(req.lesson)
});


function GetHome (req , res , next) {
  queries = [
    "select * from missions",
    'select * from lessons'
  ]
  cnx.query(queries.join(';'), function (err, result, fields) {
    missions = result[0]
    lessons = result[1]
    
    A1_MINUS = []; 
    A1 = [];
    A2 = [];
    B1 = [];
    B2 = [];
    C1 = [];
    
    missions.forEach((mission)=>{
      mission["lessons"] = []
      switch(mission["level"]) {
        case "A1_MINUS":
            A1_MINUS.push(mission)
            break;
        case "A1":
            A1.push(mission)
            break;
        case "A2":
            A2.push(mission)
            break;
        case "B2":
            B2.push(mission)
            break;
        case "B1":
            B1.push(mission)
            break;
        case "C1":
            C1.push(mission)
            break;
        default :
            break;
}
      lessons.forEach((lesson) =>{
        if(lesson["missionExternalId"] == mission["externalId"]){
          mission["lessons"].push(lesson)
        }
      })
    })
    req.missions = {"missions" : {"A1_MINUS" : A1_MINUS , "A1" :A1 ,"A2" :A2, "B1" :B1,"B2" : B2 ,"C1" : C1}}
    next()
  });
}

function GetExercise (req, res, next)  {
  queries = [
    "select * from exercises where externalId = ?",
    "select * from questions where exerciseExternalId = ?"
  ]
  cnx.query(queries.join(";"), [req.params.exerciseId ,req.params.exerciseId  ], function (err, result, fields) {
    req.exercise = {"exercise" :  {"info" : result[0][0] , "questions" : result[1]}}
    next()
  });
}

function GetLesson (req, res, next)  {
  queries = [
    "select * from lessons where externalId = ?",
    "select * from exercises where lessonExternalId = ? and activityType = 'EXERCISE'",
    "select * from videos where lessonExternalId = ?",
    "select * from vocabulary where lessonExternalId = ?",
    "select * from grammarRules where lessonExternalId = ?",
    "select * from exercises where lessonExternalId = ? and activityType = 'SUMMARY_TEST'"
  ]
  cnx.query(queries.join(";"), [req.params.lessonId, req.params.lessonId ,req.params.lessonId ,req.params.lessonId ,req.params.lessonId ,req.params.lessonId  ], function (err, result, fields) {
    req.lesson = {
      "lesson" : result[0][0],
      "exercises" : result[1],
      "videos" : result[2],
      "vocabulary" : result[3],
      "grammarRules" : result[4], 
      "summery_test"  : result[5],
    }
    req.lesson = {"lesson" :  {"info" : result[0][0] , "exercises" : result[1], "videos" : result[2], "vocabulary" : result[3], "grammarRules" : result[4] , "summary_test" : result[5][0]}}
    next()
  });
} 

// PORT
const PORT = 3000;
app.listen(PORT);
