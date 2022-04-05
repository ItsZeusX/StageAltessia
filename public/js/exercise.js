var externalData = null

exerciseExternalId = null
questions = null
selectedAnswer = null
currentQuestionType = null
currentQuestionIndex = 0
currentScore = 0

window.onload = function (){
    exerciseExternalId = externalData.info.externalId;
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
    
    try{
        ReplaceGaps(currentQuestionType);
    }
    catch {
        //pass
    }
}
function NextQuestion() {
    if(currentQuestionIndex != questions.length - 1 ){
        currentQuestionIndex += 1
        InjectQuestion()
        document.getElementById("validation_btn").style.display = "block"
        document.getElementById("next_btn").style.display = "none"
    }
    else
    {
        percentage = Math.floor(currentScore/questions.length*100)
        if(percentage < 75){
            document.getElementById("wrapper").innerHTML = 
            `
            <div id="wrapper-correct">
            <div id="title">Sorry !</div>
            <lord-icon
                src="https://cdn.lordicon.com/hrqwmuhr.json"
                trigger="loop"
                delay="1000"
                style="width:250px;height:250px">
            </lord-icon>
            <div>You got ${percentage}%</div>
            <div id="mute">You need at least 75% to pass</div>
            <div>
            <a href="/lesson/${externalData.info.lessonExternalId}"><button>CONTINUE</button></a>
            <button onclick="window.location.reload()">TRY AGAIN</button></div>
            
        </div>
            `
            
        }
        else {
            document.getElementById("wrapper").innerHTML = 
                `
                <div id="wrapper-correct">
                <div id="title">Congrats !!</div>
                <script src="https://cdn.lordicon.com/lusqsztk.js"></script>
        <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            delay="1000"
            style="width:250px;height:250px">
        </lord-icon>
                <div>You got ${percentage}%</div>
                
                <a href="/lesson/${externalData.info.lessonExternalId}"><button>CONTINUE</button></a>
                
            </div>
            `
            SetScore()
        }
        
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
    if(selectedAnswer != null){
        correctAnswer = correctAnswer.toLowerCase().replace(/\s+/g, '')
        selectedAnswer = selectedAnswer.toLowerCase().replace(/\s+/g, '')
        if(currentQuestionType === "MULTIPLE_CHOICE"){
            if(selectedAnswer == correctAnswer){
                currentScore += 1
                StyleButtonsAfterValidation()
            }
            else{
                StyleButtonsAfterValidation()
            }
        }

        if(currentQuestionType === "OPEN"){
            selectedAnswer = document.querySelector(".upAnswer").value.toLowerCase().replace(/\s+/g, '')
            if(selectedAnswer == correctAnswer){
                currentScore += 1
                StyleButtonsAfterValidation()
            }
            else{
                StyleButtonsAfterValidation()
            }
        }

        if(currentQuestionType === "DRAG_AND_DROP"){
            currentlySelectedAnswers = []
            spans = document.getElementsByClassName("filledAnswer")
            for (var i=0; i < spans.length; i++) {
                currentlySelectedAnswers.push(spans[i].innerText)
            }

            if(currentlySelectedAnswers.join(" ").toLowerCase().replace(/\s+/g, '')  == correctAnswer.toLowerCase().replace(/\s+/g, '')){
                currentScore += 1
                StyleButtonsAfterValidation(true)
            }
            else{
                StyleButtonsAfterValidation(false)
            }
        }
        }
    selectedAnswer = null
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
function StyleButtonsAfterValidation(isCorrect){
    if(currentQuestionType === "DRAG_AND_DROP"){
        questionContainer = document.querySelector(".question_container")
        if(isCorrect){
            questionContainer.classList.add("question_container_correct")
        }
        else {
            questionContainer.classList.add("question_container_incorrect")
        }
        document.getElementById("validation_btn").style.display = "none"
        document.getElementById("next_btn").style.display = "block"
    }
    else
    {
    //! BUTTONS TYPE ANSWERS
    btns = document.querySelectorAll(".answer_btn")
    
    if (btns.length > 0){
        btns.forEach(btn => {
            if(btn.innerText.toLowerCase().replace(/\s+/g, '') == selectedAnswer.toLowerCase().replace(/\s+/g, '')){
                btn.classList.add("wrong_answer");
            
            }
            if(btn.innerText.toLowerCase().replace(/\s+/g, '') == correctAnswer.toLowerCase().replace(/\s+/g, '')){
                btn.classList.add("correct_answer");
            }
            btn.disabled = true;
        })
    }
    document.getElementById("validation_btn").style.display = "none"
    document.getElementById("next_btn").style.display = "block"
    

    try {
        //! INPUTS TYPE ANSWERS
        inp = document.querySelector("input")
        if(inp.value.toLowerCase().replace(/\s+/g, '') == correctAnswer.toLowerCase().replace(/\s+/g, '')){
            inp.classList.add("correct_answer_input");
        }
        else {
            inp.value = correctAnswer
            inp.classList.add("wrong_answer_input");
        }
        }
        catch{
            //pass
        }
    }
}
function SetScore (){
    fetch(`/api/set_score/${exerciseExternalId}` , {
        method : "POST"
    })
}

