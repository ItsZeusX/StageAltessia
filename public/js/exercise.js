var externalData = null

questions = null
selectedAnswer = null
currentQuestionType = null
currentQuestionIndex = 0

window.onload = function (){
    InjectQuestion() ;
    
}

function InjectQuestion() {
    exerciseContainer = document.getElementById("exercise_container");
    questions = externalData["questions"]

    exerciseContainer.innerHTML = ""

    if(questions[currentQuestionIndex]["instruction"] != null &&  typeof(questions[currentQuestionIndex]["instructions"]) != "undefined"){
        myDIV = document.createElement("div");
    myDIV.className = "instruction_container"
    myDIV.innerText = questions[currentQuestionIndex]["instruction"]
    exerciseContainer.appendChild(myDIV)
    }

    if(questions[currentQuestionIndex]["specialInstruction"] != null && typeof(questions[currentQuestionIndex]["specialInstruction"]) != "undefined"){
        myDIV = document.createElement("div");
    myDIV.className = "specialInstruction_container"
    myDIV.innerText = questions[currentQuestionIndex]["specialInstruction"]
    exerciseContainer.appendChild(myDIV)
    }

    if(questions[currentQuestionIndex]["question"] != null &&  typeof(questions[currentQuestionIndex]["question"]) != "undefined"){
        myDIV = document.createElement("div");
    myDIV.className = "question_container"
    myDIV.innerText = questions[currentQuestionIndex]["question"]
    exerciseContainer.appendChild(myDIV)
    }
    if(questions[currentQuestionIndex]["imageSrc"] != null &&  typeof(questions[currentQuestionIndex]["imageSrc"]) != "undefined"){
        myDIV = document.createElement("div");
    myDIV.className = "imageSrc_container"
    myDIV.innerHTML = `
        <img src="https://app.ofppt-langues.ma${questions[currentQuestionIndex]["imageSrc"]}" alt="img">
    ` 
    exerciseContainer.appendChild(myDIV)
    }
    if(questions[currentQuestionIndex]["audioSrc"] != null &&  typeof(questions[currentQuestionIndex]["audioSrc"]) != "undefined"){
        myDIV = document.createElement("div");
    myDIV.className = "audioSrc_container"
    myDIV.innerHTML = `
    <audio controls>
         <source src="https://app.ofppt-langues.ma${questions[currentQuestionIndex]["audioSrc"]}" type="audio/mpeg">
    </audio>
    `
    exerciseContainer.appendChild(myDIV)
    }

    

    if(questions[currentQuestionIndex]["answers"] != null &&  typeof(questions[currentQuestionIndex]["answers"]) != "undefined"){
        myDIV = document.createElement("div");
        currentQuestionType = questions[currentQuestionIndex]["type"]
        myAnswers = questions[currentQuestionIndex]["answers"]
        myDIV.className = "answers_container"
        myAnswers.split("&").forEach(answer => {
        btn = document.createElement("button")
        btn.innerText = answer
        if(currentQuestionType === "MULTIPLE_CHOICE"){
            btn.addEventListener("click", () => {
                selectAnswer(event.target , currentQuestionType)
            } );
        }
        else{
            btn.addEventListener("click", () => {
                selectAnswer(event.target , currentQuestionType)
            } , {once : true});
        }
            myDIV.appendChild(btn)
        });

    exerciseContainer.appendChild(myDIV)
    }
    
    ReplaceGaps(currentQuestionType);
}
function NextQuestion() {
    if(currentQuestionIndex != questions.length - 1 ){
        currentQuestionIndex += 1
        InjectQuestion()
    }
    else
    {
        window.location.replace("http://www.w3schools.com");
    }
    
}
function selectAnswer (elem , questionType){
    
    if(questionType === "DRAG_AND_DROP"){
        selectedAnswer = elem.innerText;
        if(!document.getElementsByClassName("upAnswer")[0].classList.contains("filledAnswer")){
            document.getElementsByClassName("upAnswer")[0].innerText = selectedAnswer
            document.getElementsByClassName("upAnswer")[0].className = "filledAnswer"
        }
        
    }
    else 
    {
        try{
            selectedAnswer = elem.innerText;
        document.getElementsByClassName("upAnswer")[0].innerText = selectedAnswer
        }catch{
            //pass
        }
    }
    console.log(selectedAnswer)
}
function ValidateQuestion(){

    if(currentQuestionType === "MULTIPLE_CHOICE"){
        if(selectedAnswer == questions[currentQuestionIndex]["correctAnswers"]){
            alert("correct")
            NextQuestion()
        }
        else{
            alert("incorrect")
            NextQuestion()
    
        }
    }

    if(currentQuestionType === "OPEN"){
        selectedAnswer = document.querySelector(".upAnswer").value
        if(selectedAnswer == questions[currentQuestionIndex]["correctAnswers"]){
            alert("correct")
            NextQuestion()
        }
        else{
            alert("incorrect")
            NextQuestion()
    
        }
    }

    if(currentQuestionType === "DRAG_AND_DROP"){
        currentlySelectedAnswers = []
        spans = document.getElementsByClassName("filledAnswer")
        for (var i=0; i < spans.length; i++) {
            currentlySelectedAnswers.push(spans[i].innerText)
       }

        if(currentlySelectedAnswers.join(" ") == questions[currentQuestionIndex]["correctAnswers"]){
            alert("correct")
            NextQuestion()
        }
        else{
            alert("incorrect")
            NextQuestion()
    
        }
    }
}
function ReplaceGaps(questionType){
    if(questionType ==="MULTIPLE_CHOICE" || questionType === "DRAG_AND_DROP"){
        document.getElementsByClassName("question_container")[0].innerHTML =
    document.getElementsByClassName("question_container")[0].innerHTML.replace(/\[GAP]/g , `<span class= "upAnswer"> ...... </span>`)
    }
    if(questionType === "OPEN"){
        document.getElementsByClassName("question_container")[0].innerHTML =
    document.getElementsByClassName("question_container")[0].innerHTML.replace("[GAP]" , `<input class= "upAnswer" placeholder="The answer here">`)
   
    }

}
