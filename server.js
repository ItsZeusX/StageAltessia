const { query } = require("express");
const express = require("express");
const coockieParse = require("cookie-parser")
const bcrypt = require('bcrypt');
const path = require('path');
const uuid = require('uuid');
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const app = express();

const cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "English",
  multipleStatements: true
});

//!REQUIRMENTS
app.use(express.json())
app.use(coockieParse())
app.use(express.static(path.join(__dirname, 'public'))); 
app.set("view engine", "ejs");

//! PAGES
app.get("/home" ,requireAuth,GetHome , (req, res , next) => {
  res.render("home" , req.missions)
});

app.get("/lesson/:lessonId", requireAuth , GetLesson , (req, res , next) => {
  res.render("lesson", req.lesson)
});

app.get("/exercise/:exerciseId" ,requireAuth, GetExercise , (req, res , next) => {
  res.render("exercise" , req.exercise)
});

app.get("/grammar_rule/:grammarRuleId" ,requireAuth, GetGrammarRule , (req, res , next) => {
  res.render("grammarRule" , {grammarRule : req.grammarRule})
});

app.get("/vocabulary/:vocabularyId",requireAuth , GetVocabulary , (req, res , next) => {
  res.render("vocabulary" , req.vocabulary)
});

app.get("/video/:videoId" ,requireAuth, GetVideo , (req, res , next) => {
  res.render("video" , req.video)
});

app.get("/practice/:practiceId",requireAuth , GetPractice , ( req, res , next) => {
  res.render("practice" , req.practice)
});

//! SCORE 
app.post("/api/set_score/:activityId", requireAuth, SetScore , ( req, res , next) => {
  res.send("Score Set")
})

//! AUTH
//Register
app.get("/register" , (req, res , next) => {
  res.render("register")
});
app.post("/register" ,Register, (req, res , next) => {
  res.json({"status" : res.status , "error" : res.error})
});
//Login
app.get("/login" , (req, res , next) => {
  res.render("login")
});
app.post("/login" , Login, (req, res , next) => {
  res.send({"status" : res.status , "error" : res.error})
});
//Logout
app.get("/logout" , Logout, (req, res , next) => {
  res.redirect("/login")
});

//! TESTS
app.get("/api/practice/:practiceId" , GetPractice , (req, res , next) => {
  res.json(req.practice)
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
  lessonID = req.params.lessonId
  UserID = res.userId
  queries = [
    `select * from lessons where externalId = ?`,
    `call ExercisesWithScores(? , ?)`,
    `call VideosWithScores(? , ?)`,
    `call VocabularyWithScores(? , ?)`,
    `call GrammarRulesWithScores(? , ?)`,
    `call SummaryTestsWithScores(?,?)`,
    `call PracticeWithScores(?,?)`
  ]
  cnx.query(queries.join(";"), [lessonID,lessonID,UserID,lessonID,UserID,lessonID,UserID,lessonID,UserID,lessonID,UserID,lessonID,UserID], function (err, result, fields) {
    req.lesson = {"lesson" :  {"info" : result[0][0] , 
                  "exercises" : result[1], 
                  "videos" : result[3], 
                  "vocabulary" : result[5], 
                  "grammarRules" : result[7] , 
                  "summary_test" : result[9],
                  "practice" : result[11],
                }}
            
    next()
  });
} 
function GetVocabulary(req, res, next){
  queries = [
    "select * from vocabulary where externalId = ?",
    "select * from vocabularyItems where vocabularyExternalId = ?"
  ]
  cnx.query(queries.join(";"), [req.params.vocabularyId ,req.params.vocabularyId  ], function (err, result, fields) {
    req.vocabulary = {"vocabulary" :  {"info" : result[0][0] , "items" : result[1]}}
    next()
  });
}
function GetGrammarRule (req, res, next){
  queries = [
    "select * from grammarRules where externalId = ?"

  ]
  cnx.query(queries.join(";"), [req.params.grammarRuleId ], function (err, result, fields) {
    req.grammarRule = {"grammarRule" :  result[0]}
    next()
  });
}
function GetVideo (req, res, next){
  queries = [
    "select * from videos where externalId = ?"

  ]
  cnx.query(queries.join(";"), [req.params.videoId ], function (err, result, fields) {
    req.video = {"video" :  result[0]}
    next()
  });
}
function GetPractice (req, res, next){
  queries = [
    "select * from practice where externalId = ?"

  ]
  cnx.query(queries.join(";"), [req.params.practiceId ], function (err, result, fields) {
    req.practice = {"practice" :  result[0]}
    next()
  });
} 
function SetScore (req, res, next){
    cnx.query("SET FOREIGN_KEY_CHECKS=0; insert into scores values(?,?,?)", [req.params.activityId , 1 , res.userId], function (err, result, fields) {
      if(err) console.log(err.message);
      next()
    })
}
async function Register (req ,res , next){
  var userId = uuid.v4();
  var name = req.body.name
  var lastname = req.body.lastname
  var email = req.body.email
  var password = req.body.password

  //Check if email already exist --------------------------
  cnx.query("select * from users where email = ?", [email], function (err, result, fields) {
      if(result.length > 0) {
        res.error = "Email already exists"
        res.status = 404
        next()
      } else {
        // Password encryption -------------------------
        bcrypt.hash(password, 10 , function(err, hash) {
          // Insert User to db -------------------------
          var query = "insert into users values (?,?,?,?,?,NOW());";
          cnx.query(query, [userId , email , hash , name , lastname], function (err, result, fields) {
            if(err) throw err
            // JWT and Cookie --------------------------
            let token  = jwt.sign({id : userId} , "f38997a3d1" )
            res.cookie("jwt" , token , {httpOnly : true})
            res.status = 200
            console.log("[SYSTEM] - Registerd as : " + email)
            next()
          });
        });
      }
    });
}
async function Login (req ,res , next){
  var email = req.body.email
  var password = req.body.password
  var hashedPassword = null

  cnx.query("select id,password from users where email = ?", [email],async function (err, result, fields) {
    if(result.length == 0) {
      console.log("[SYSTEM] - Email Not Found");
      res.error = "No account with this email was found"
      res.status = 404
      next()
    }
    else 
    {
      //Decrypt password ---------------------------------
      const userId = result[0].id
      const hashedPassword = result[0].password
      const isCorrectPassword = await bcrypt.compare(password , hashedPassword)
      // Send JWT cookie -----------------------------------
      if(isCorrectPassword){
        let token  = jwt.sign({id : userId} , "f38997a3d1" )
        res.cookie("jwt" , token , {httpOnly : true})
      }
      console.log("[SYSTEM] - Logged in as : " + email)
      res.status = 200
      next()
    }
  })
}
function Logout (req, res, next){
  res.clearCookie("jwt");
  next();
}
function requireAuth (req , res , next){
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token , "f38997a3d1" , (err , decodedToken) => {
      if (err) throw err
      res.userId = decodedToken.id
      next()
    })
  }else{
    res.redirect("/login")
    console.log("[SYSTEM] - Not Logged In")
  }
}
// PORT
const PORT = 3000;
app.listen(PORT);
