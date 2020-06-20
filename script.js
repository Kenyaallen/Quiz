//question list
var quizQuestions = [{
    question: "The arithmatic/logic unit performs the following actions?",
    answers: [
        "checks data for accuracy",
        "does calculations using addition, subtraction, multiplication, and division",
        "does logical comparisons such as equal to, greater than, less than",
        "does both calculations and logical comparisons",
    ],   
    correct : 3     
}, {
    question: "The computer's processor consists of the following parts",
    answers: [
        "CPU and Main Memory",
        "Hard Disk and Floppy Drive",
        "Main Memory and Storage",
        "Control Unit and ALU",
    ],   
    correct : 3     
}, {
    question: "A microprocessor is the brain of the computer and is also called a(n)...",
    answers: [
        "macrochip",
        "calculator",
        "macroprocessor",
        "microchip",
    ],   
    correct : 3     
}, {
    question: "Main memory works in conjuction with......",
    answers: [
        "SFC",
        "RAM",
        "IBM",
        "CPU",
    ],   
    correct : 3     
}, {
    question: "The primary goal of a computer is to turn data into ______.",
    answers: [
        "ideas",
        "suggestions",
        "reports",
        "information",
    ],   
    correct : 3     
}, {
    question: "Once information is input into a computer it becomes (a/an) _________.",
    answers: [
        "objects",
        "ideas",
        "facts",
        "data",
    ],   
    correct : 3     
}, 
];


var introEl = document.getElementById("intro");
var highScoreBtnEl = document.getElementById("highScoreBtn");
var startButton = document.getElementById("startButton");
var getQuiz = document.getElementById("quizContainer");
var timer = document.getElementById("time");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answerButton");
var gameOverScreen = document.getElementById("gameOver");
var highScoreScreen = document.getElementById("highScore");
var finalScoreEl = document.getElementById("finalScore");
var goBack = document.getElementById("goBack");
var clearScore = document.getElementById("clearScore");


var questionIndex = 0;
var score = 0;
var secondsLeft =60;


//add submit highscore and view highscore button
//add choosing answer button to go to next question

//function for screen transition
function showHide(show, hide){
    show.classList.remove("hide");     
    hide.classList.add("hide"); 
}

//Timer set
function setTime(){
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = "Time Remaining: " + secondsLeft;
    
        //stop timer when time runs out or the quiz is done.
        if(secondsLeft === 0 || questionIndex >= quizQuestions.length) {
            clearInterval(timerInterval); 
           //remove the main screen and show game over screen
            viewGameOverScreen();  
        }


    }, 1000);
    }

function startQuiz(){
    //remove intro scene and display the quiz question
    showHide(getQuiz,introEl);

    //starts timer
    setTime();

    //shows the question 
    showQuestion();
    

}

//function to show the quiz's question and answer
function showQuestion(){
    var correctAns = quizQuestions[questionIndex].correct;

    //showing the quiz's question
    questionEl.textContent = quizQuestions[questionIndex].question;
    //print out the quiz's multiple choice
    for(var i = 0; i < quizQuestions[questionIndex].answers.length; i++){
        var ansBtn = document.createElement("button");
        answerButtonEl.appendChild(ansBtn);
        ansBtn.setAttribute("class", "block btn btn-primary ansBtn")
        ansBtn.textContent = quizQuestions[questionIndex].answers[i];

        //attach the correct answer with 'true' attribute, marking the correct answer
        if(quizQuestions[questionIndex].answers[i] === quizQuestions[questionIndex].answers[correctAns]){
            ansBtn.setAttribute("true","true");
        }
    }
    nextQuestion();

}

//function to move on after an answer button was clicked and populate with new question and answers
function nextQuestion(){
    document.querySelectorAll(".ansBtn").forEach(ans =>{
        ans.addEventListener("click", function(e){           
            checkAnswer(e);

            questionIndex++;
            answerButtonEl.innerHTML = "";

            if(questionIndex < quizQuestions.length){
                console.log("show");
                showQuestion();
            }else{
                viewGameOverScreen();
            }
        })
    })
}

function checkAnswer(e) {
    //Keeps score
        console.log(e.currentTarget);

    //Increases the score
    if (e.currentTarget.hasAttribute("true")) {
        score+= 100;

        console.log(score);
    //Speeds of timer
    } else {
        secondsLeft-=20 ;
    }
}

//Score and storage-------------------------------------------------------

var scoreStorage = [];
var userSumbitBtnEl = document.getElementById("userSubmitBtn");
var userInitialEl = document.getElementById("userInitial");
var highScoreListEl = document.getElementById("highScoreList");

init();

function renderScoreStorage(){
    highScoreListEl.innerHTML = "";
    //make new li for each submit
    for(var i = 0; i < scoreStorage.length; i++ ){
        var scoreList = scoreStorage[i];
        var li = document.createElement("li");

        li.textContent = scoreList;
        li.setAttribute("data-index", i);

        highScoreListEl.appendChild(li);


    }
}
// allows me to start quiz
function init(){
    var storedScores = JSON.parse(localStorage.getItem("storage"));

    if (storedScores !== null){
        scoreStorage = storedScores;
    } 

    renderScoreStorage();
}

// Stringify and set "storage" in localStorage to scoreStorage array
function storeScores(){
    localStorage.setItem("storage", JSON.stringify(scoreStorage));
}

//function to take and submit user's initial
function submitIni(e){
    e.preventDefault();

    var initial = userInitialEl.value.trim();
    //if name input form is empty return nothing
    if(initial === ""){
        return;
    }
    //push initial and score into scoreStorage array then set them back to empty and 0
    scoreStorage.push(scoreStorage.length + 1 + ". " + initial + "--you scored  " + score +" points")
    userInitialEl.value = "";
    score = 0;

    storeScores();
    renderScoreStorage();
    viewHighScore();

}

//clear the highscore
function clearHighScore(){
    var listAmt = highScoreListEl.childElementCount;
    var index = document.querySelectorAll("li");

    scoreStorage.splice(index, listAmt);

    storeScores();
    renderScoreStorage();
}

//view end screen
function viewGameOverScreen(){
    showHide(gameOverScreen,getQuiz);
    finalScoreEl.textContent = "your final score is : " + score;

}

//view high score screen
function viewHighScore(){
    showHide(highScoreScreen,gameOverScreen);
    showHide(highScoreScreen,getQuiz);
    showHide(highScoreScreen,introEl);

}

//go back to start screen and take the quiz again
function goBackToStart(){
    location.reload();
}

//button list--------------------------------------------------------------
startButton.addEventListener("click", startQuiz);
highScoreBtnEl.addEventListener("click", viewHighScore);
goBack.addEventListener("click", goBackToStart);
clearScore.addEventListener("click", clearHighScore);
userSumbitBtnEl.addEventListener("click", submitIni);