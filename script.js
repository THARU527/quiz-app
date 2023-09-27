const questions=[
    {
        question:"What is a URL?",
        answers:[
            {text:"Universal Remote Long",correct:false},
            {text:"Uniform Resource Locator",correct:true},
            {text:"Universal Resource Locator",correct:false},
            {text:"None of the above",correct:false},
        ]
    },
    {
        question:"Which part of the computer system that one can physically touch?",
        answers:[
            {text:"Software",correct:false},
            {text:"OS",correct:false},
            {text:"Hardware",correct:true},
            {text:"Programs",correct:false},
        ]
    },
    {
        question:"Which of the following is an example of non-volatile memory?",
        answers:[
            {text:"ROM",correct:true},
            {text:"RAM",correct:false},
            {text:"Cache Memory",correct:false},
            {text:"All of the above",correct:false},
        ]
    },
    {
        question:"Which of these is a free operating system?",
        answers:[
            {text:"Ubuntu",correct:true},
            {text:"Windows 7",correct:false},
            {text:"Windows XP",correct:false},
            {text:"Mac OSX",correct:false},
        ]
    },
    {
        question:"What is a Universal Serial Bus?",
        answers:[
            {text:"USB Port",correct:true},
            {text:"SATA Port",correct:false},
            {text:"HDMI Port",correct:false},
            {text:"All of the above",correct:false},
        ]
    }

];

const quesEl=document.getElementById("question");
const answerButton=document.getElementById("answer-button");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
let currentQuestion=questions[currentQuestionIndex];
let questionNo=currentQuestionIndex+1;
quesEl.innerHTML=questionNo + "." + currentQuestion.question;

currentQuestion.answers.forEach(answer=>{
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    quesEl.innerHTML=`Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
