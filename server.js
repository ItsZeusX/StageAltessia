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
  missions = req.missions
  lessons = req.lessons
  
  missions.forEach((mission)=>{
    mission["lessons"] = []
    lessons.forEach((lesson) =>{
      if(lesson["missionExternalId"] == mission["externalId"]){
        mission["lessons"].push(lesson)
      }
    })
  })
  res.render('home',{"missions" : req.missions})

});


function GetHome (req , res , next) {
  queries = [
    "select * from missions",
    'select * from lessons'
  ]
  cnx.query(queries.join(';'), function (err, result, fields) {
    req.missions = result[0]
    req.lessons = result[1]
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
