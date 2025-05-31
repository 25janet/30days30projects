let timeLeft = 10;
let timerId;
function startTimer() {
    const timerElement = document.getElementById("timer");
    timeLeft = 10;
    timerElement.innerHTML = `Time: ${timeLeft}`;

    timerId = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            autoSelect();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}



const questions = [
    {
        question:"Which movie features a pink-loving law student named Elle Woods?",
        answers:[
            {
                text:"Legally Blonde",correct:true
            },
            {text:"Mean Girls",correct:false},
            {text:"Clueless",correct:false},
            {text:"Barbie", correct:false},
        ]
    },
    {
        question:"In which movie does a group of friends try to get their friend to lose his virginity before graduation?",
        answers:[
            
            {text:"Superbad",correct:false},
            {text:"Porky's",correct:false},
            {text:"American Pie",correct:true},
            {text:"Road Trip", correct:false},
        ]
    },
    {
        question:"In which movie does a doll enter the real world to discover her identity?",
        answers:[
            {text:"Enchanted", correct:false},
            {text:"Freaky Friday", correct:false},
            {text:"Barbie", correct:true},
            {text:"the Princess Diaries", correct:false},
        ]
    },
    {
        question:"Which movie features a group of high school students from different cliques spending a Saturday in detention?",
        answers:[ 
            {text:"Ferris Bueller's Day Off",correct:false},
            {text:"The Breakfast Club",correct:true},
            {text:"Fast Times at Ridgemont High",correct:false},
            {text:"Sixteen Candles", correct:false},
        ]
    },
    {
        question:"Which movie features four best friends and a magical pair of jeans?",
        answers:[
            {text:"13 Going on 30", correct:false},
            {text:"A Cinderella Story", correct:false},
            {text:"The Sisterhood of the Traveling Pants", correct:true},
            {text:"Wild Child", correct:false}
        ]
    },
    {
        question:"In which movie does a group of friends go on a road trip to Las Vegas for a bachelor party?",
        answers:[
            {text:"The Hangover", correct:true},
            {text:"Road Trip", correct:false},
            {text:"EuroTrip", correct:false},
            {text:"Dude, Where's My Car?", correct:false}
        ]
    },
    {
        question:"Which movie features a high school student who pretends to be someone else to win the heart",
        answers:[
            {text:"10 Things I Hate About You", correct:false},
            {text:"Never Been Kissed", correct:false},
            {text:"She's All That", correct:true},
            {text:"To All", correct:false},
        ]
    }

];
const QuestionElment = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    startTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    QuestionElment.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer); 
        
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    stopTimer();
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if(correct){
        score++;
        selectedButton.classList.add("correct");
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex <questions.length)
{
    handlenextbutton();
}
else {
    resetState();
    QuestionElment.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);

}
})
function handlenextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
}
function autoSelect() {
    const buttons = Array.from(answerButtons.children);
    buttons.forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

startQuiz();