const { query } = require("express");
const express = require("express");
const app = express();
const sql = require("mssql");

var mysql = require("mysql");
var cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "English",
  multipleStatements: true
});

app.set("view engine", "ejs");

app.get("/api/:exerciseId" ,GetExercise , (req, res , next) => {
  res.json({"exerciseInfo" : req.exerciseInfo , "questions" : req.questions})
});

app.get("/questions/:exerciseId", GetExercise ,(req, res) => {
  res.render("index", {
    exercise: {"exerciseInfo" : req.exerciseInfo , "questions" : req.questions}
  });
});

function GetExercise (req, res, next)  {
  queries = [
    "select * from exercises where externalId = ?",
    "select * from questions where exerciseExternalId = ?"
  ]
  cnx.query(queries.join(";"), [req.params.exerciseId ,req.params.exerciseId  ], function (err, result, fields) {
    req.exerciseInfo = result[0]
    req.questions = result[1]
    next()
  });
}





// PORT
const PORT = 3000;
app.listen(PORT);
