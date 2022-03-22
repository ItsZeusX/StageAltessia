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

app.get("/exercise/:exerciseId" ,GetExercise , (req, res , next) => {
  res.render('home' , {"exerciseInfo" : req.exercise , "questions" : req.questions})
});

app.get("/api/:exerciseId" ,GetExercise , (req, res , next) => {
  res.json({"exerciseInfo" : req.exercise , "questions" : req.questions})
});

app.get("/home" ,GetHome , (req, res , next) => {
  res.render("home" , req.missions)
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
    req.exercise = result[0][0]
    req.questions = result[1]
    next()
  });
}

// PORT
const PORT = 3000;
app.listen(PORT);
