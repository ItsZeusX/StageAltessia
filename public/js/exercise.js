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
    currentQuestionType = questions[currentQuestionIndex]["type"]

    correctAnswer = questions[currentQuestionIndex]["correctAnswers"].split("&")[0]

    instruction = questions[currentQuestionIndex]["instruction"]
    specialInstruction = questions[currentQuestionIndex]["specialInstruction"]
    currentQuestion = questions[currentQuestionIndex]["question"]
    imageSrc = questions[currentQuestionIndex]["imageSrc"]
    audioSrc = questions[currentQuestionIndex]["audioSrc"]
    currentAnswers = questions[currentQuestionIndex]["answers"] 
    hint = questions[currentQuestionIndex]["hint"]
    exerciseContainer.innerHTML = ""

    if(instruction != null &&  typeof(instruction) != "undefined" && instruction != "fill_one_word_instruction"){
        myDIV = document.createElement("div");
        myDIV.className = "instruction_container"
        myDIV.innerText = questions[currentQuestionIndex]["instruction"]
        exerciseContainer.appendChild(myDIV)
    }
    if(hint != null && typeof(hint) != "undefined" && hint != ""){
        myDIV = document.createElement("div");
        myDIV.className = "hint_container"
        myDIV.innerHTML = `<span>Hint : <span>${questions[currentQuestionIndex]["hint"]}`
        exerciseContainer.appendChild(myDIV)
    }
    if(specialInstruction!= null && typeof(specialInstruction) != "undefined"){
        myDIV = document.createElement("div");
        myDIV.className = "specialInstruction_container"
        myDIV.innerText = questions[currentQuestionIndex]["specialInstruction"]
        exerciseContainer.appendChild(myDIV)
    }

    if(currentQuestion != null &&  typeof(currentQuestion) != "undefined" && currentQuestion != ""){
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
            btn.className = "answer_btn"
            btn.innerText = answer
            if(currentQuestionType === "MULTIPLE_CHOICE"){
                btn.addEventListener("click", () => {
                    StyleSelectedButton()
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
        window.location.replace(`/lesson/${externalData.info.lessonExternalId}`);
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
    
}
function ValidateQuestion(){
    correctAnswer = correctAnswer.toLowerCase().replace(/\s+/g, '')
    if(currentQuestionType === "MULTIPLE_CHOICE"){
        if(selectedAnswer == correctAnswer){
            StyleButtonsAfterValidation()
            setTimeout(function(){
                NextQuestion()
           }, 2000);
            
        }
        else{
            StyleButtonsAfterValidation()
            setTimeout(function(){
                NextQuestion()
           }, 2000);
            
    
        }
    }

    if(currentQuestionType === "OPEN"){
        selectedAnswer = document.querySelector(".upAnswer").value.toLowerCase().replace(/\s+/g, '')
        if(selectedAnswer == correctAnswer){
            StyleButtonsAfterValidation()
            setTimeout(function(){
                NextQuestion()
           }, 2000);
        }
        else{
            StyleButtonsAfterValidation()
            setTimeout(function(){
                NextQuestion()
           }, 2000);
    
        }
    }

    if(currentQuestionType === "DRAG_AND_DROP"){
        currentlySelectedAnswers = []
        spans = document.getElementsByClassName("filledAnswer")
        for (var i=0; i < spans.length; i++) {
            currentlySelectedAnswers.push(spans[i].innerText)
        }

        if(currentlySelectedAnswers.join(" ") == correctAnswer){
            StyleButtonsAfterValidation()
            alert("correct")
            NextQuestion()
        }
        else{
            StyleButtonsAfterValidation()
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
function StyleSelectedButton(){
    let btns = document.querySelectorAll(".answer_btn")
                    btns.forEach(answerBtn => {
                        answerBtn.classList.remove("active_answer")
                        
                    })
                    event.target.classList.add("active_answer")
}

function StyleButtonsAfterValidation(){
    btns = document.querySelectorAll(".answer_btn")
    if (btns.legnth > 0){
        btns.forEach(btn => {
            if(btn.innerText.toLowerCase().replace(/\s+/g, '') == selectedAnswer.toLowerCase().replace(/\s+/g, '')){
                btn.classList.add("wrong_answer");
            }
            if(btn.innerText.toLowerCase().replace(/\s+/g, '') == correctAnswer.toLowerCase().replace(/\s+/g, '')){
                btn.classList.add("correct_answer");
            }
        })
    }

    inputs = document.querySelectorAll("input")
    if (inputs.legnth > 0){
        console.log(inp.value.toLowerCase().replace(/\s+/g, ''));
            console.log(correctAnswer.toLowerCase().replace(/\s+/g, ''));
        inputs.forEach(inp => {
            
            if(inp.value.toLowerCase().replace(/\s+/g, '') == correctAnswer.toLowerCase().replace(/\s+/g, '')){
                console.log(inp)
                inp.classList.add("correct_answer");
            }
        })
    }
    
   
}

