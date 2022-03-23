var externalData = null

questions = null
selectedAnswer = null
currentQuestionType = null
currentQuestionIndex = 0

window.onload = function (){
    InjectQuestion() ; 
}

function InjectQuestion() {
    console.log(externalData["questions"])
    exerciseContainer = document.getElementById("exercise_container");
    questions = externalData["questions"]
    currentQuestionType = questions[currentQuestionIndex]["type"]

    correctAnswer = questions[currentQuestionIndex]["correctAnswers"].split("&")[0]

    instruction = questions[currentQuestionIndex]["instruction"]
    specialInstruction = questions[currentQuestionIndex]["specialInstruction"]
    currentQuestion = questions[currentQuestionIndex]["question"]
    imageSrc = questions[currentQuestionIndex]["imageSrc"]
    audioSrc = questions[currentQuestionIndex]["audioSrc"]
    currentAnswers = questions[currentQuestionIndex]["answers"] 

    exerciseContainer.innerHTML = ""

    if(instruction != null &&  typeof(instruction) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "instruction_container"
        myDIV.innerText = questions[currentQuestionIndex]["instruction"]
        exerciseContainer.appendChild(myDIV)
    }

    if(specialInstruction!= null && typeof(specialInstruction) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "specialInstruction_container"
        myDIV.innerText = questions[currentQuestionIndex]["specialInstruction"]
        exerciseContainer.appendChild(myDIV)
    }

    if(currentQuestion != null &&  typeof(currentQuestion) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "question_container"
        myDIV.innerText = questions[currentQuestionIndex]["question"]
        exerciseContainer.appendChild(myDIV)
    }

    if(imageSrc != null &&  typeof(imageSrc) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "imageSrc_container"
        myDIV.innerHTML = `<img src="https://app.ofppt-langues.ma${questions[currentQuestionIndex]["imageSrc"]}" alt="img">` 
        exerciseContainer.appendChild(myDIV)
    }

    if(audioSrc != null &&  typeof(audioSrc) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "audioSrc_container"
        myDIV.innerHTML = `
        <audio controls>
            <source src="https://app.ofppt-langues.ma${questions[currentQuestionIndex]["audioSrc"]}" type="audio/mpeg">
        </audio>
        `
        exerciseContainer.appendChild(myDIV)
    }

    if(currentAnswers!= null &&  typeof(currentAnswers) != "undefined" && currentAnswers != "" ){
        
        myDIV = document.createElement("div");
        myDIV.className = "answers_container"
        currentAnswers.split("&").forEach(answer => {
            btn = document.createElement("button")
            btn.innerText = answer
            if(currentQuestionType === "MULTIPLE_CHOICE"){
                btn.addEventListener("click", () => {
                    selectAnswer(event.target)
                });
                
            }
            else{
                btn.addEventListener("click", () => {
                    selectAnswer(event.target)
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
function selectAnswer (elem){
    
    if(currentQuestionType === "DRAG_AND_DROP"){
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
    console.log("Selected Answer : " + selectedAnswer)
    console.log("Correct Answer  : " + correctAnswer)
}
function ValidateQuestion(){
    console.log("Selected Answer : " + selectedAnswer)
    console.log("Correct Answer  : " + correctAnswer)

    if(currentQuestionType === "MULTIPLE_CHOICE"){
        if(selectedAnswer == correctAnswer){
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
        if(selectedAnswer == correctAnswer){
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

        if(currentlySelectedAnswers.join(" ") == correctAnswer){
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
    document.getElementsByClassName("question_container")[0].innerHTML.replace(/\[GAP]/g  , `<input class= "upAnswer" placeholder="The answer here">`)
   
    }

}
