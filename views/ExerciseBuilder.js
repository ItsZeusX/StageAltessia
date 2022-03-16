answersContainer = document.getElementById("answers-container");
questionContainer = document.getElementById("question-container");

currentQuestion = 0;
currentLockedInAnswer = "";
currentScore = 0;
firstTime = true;

InjectQuestion();
function InjectQuestion() {
  //Show Score If Next is clicked after the final question
  if (currentQuestion + 1 == data.items.length) {
    ShowScore();
  }
  //Clear Fields
  answersContainer.innerHTML = questionContainer.innerHTML = "";
  //Increment currentQuestion
  if (currentQuestion <= data.items[currentQuestion].answers[0].length) {
    if (!firstTime) {
      currentQuestion += 1;
    } else {
      firstTime = false;
    }
  }
  //Answers Injection
  for (i = 0; i < data.items[currentQuestion].answers[0].length; i++) {
    answersContainer.innerHTML += `<button class="answer-button" onClick='LockInAnswer(this)'>${data.items[currentQuestion].answers[0][i]}</button>`;
  }
  //Question Injection
  questionContainer.innerHTML += data.items[currentQuestion].question.replace(
    "[GAP]",
    "<span>  XXXX  </span>"
  );
  //Check If Correct After Clicking Next (Unleas currentQuestion = 0 )
  if (currentQuestion != 0) {
    CheckIfCorrect();
  }
}
function LockInAnswer(elem) {
  currentLockedInAnswer = elem.innerHTML;
  [].forEach.call(
    document.getElementsByClassName("answer-button"),
    function (elem) {
      elem.classList.remove("lockedIn");
    }
  );
  elem.classList.add("lockedIn");
}
function CheckIfCorrect() {
  if (
    currentLockedInAnswer ==
    data.items[currentQuestion - 1].correctAnswers[0][0]
  ) {
    alert("Correct");
    currentScore += 1;
  } else {
    alert("Incorrect");
  }
}
function ShowScore() {
  document.body.innerHTML = `Your Score is ${
    (currentScore / data.items.length) * 100
  }`;
}
