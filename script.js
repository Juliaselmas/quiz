let questions = [
    {
        question: "Är jorden platt?",
        correctAnswer: false,
        id:"question1"
    },
    {
        question: "Är vattnet blött?",
        correctAnswer: true,
        id:"question2"
    },
    {
        question: "Är jorden platt?",
        correctAnswer: true,
        id:"question3"
    },
    {
        question: "Är vattnet blött?",
        correctAnswer: true,
        id:"question4"
    },
    {
        question: "Är jorden platt?",
        correctAnswer: false,
        id:"question5"
    },
    {
        question: "Är vattnet blött?",
        correctAnswer: true,
        id:"question6"
    },
    {
        question: "Är vattnet blött?",
        correctAnswer: false,
        id:"question7"
    },
    {
        question: "Är jorden platt?",
        correctAnswer: true,
        id:"question8"
    },
    {
        question: "Är vattnet blött?",
        correctAnswer: false,
        id:"question9"
    },
    {
        question: "Är jorden platt?",
        correctAnswer: false,
        id:"question10"
    },
  ];

let darkModeBtn = document.querySelector("#darkMode");
let darkModeLabel = document.querySelector("#darkMode-container label")
let startBtn = document.querySelector("#startButton");
let quizQuestion = document.querySelector("#question-container");
let result = document.querySelector("#result-container");

darkModeBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkModeBtn.checked);
    darkModeLabel.innerText = darkModeBtn.checked ? "Light mode, please:" : "Dark mode, please:";
});

//funktion för att skapa ny fråga
function createQuestion(question) {
    let newQuestionContainer = document.createElement("div");
    newQuestionContainer.classList.add("newQuestionContainer");

    let newQuestion = document.createElement("h2");
    newQuestion.textContent = question.question;

    // <label for="uniktID">True/False</label
    // <input type="radio" name="question1" id="uniktID"
    //answer.id = question.id + "-1"
    //answer.id = question.id + "-2"

    let newAnswerBtn1 = document.createElement("input");
    //definierar den nya input som en radiobtn:
    newAnswerBtn1.type = "radio";
    //tilldelar radiobtn ett namn:
    newAnswerBtn1.name = "options";
    //skapar ett dymaniskt ID till varje radiobtn:
    newAnswerBtn1.id = `radio${question.id}-1`;

    let newAnswerLabel1 = document.createElement("label");
    newAnswerLabel1.innerHTML = "True";
    newAnswerLabel1.setAttribute("for", newAnswerBtn1.id); 

    let newAnswerBtn2 = document.createElement("input");
    newAnswerBtn2.type = "radio";
    newAnswerBtn2.name = "options";
    newAnswerBtn2.id = `radio${question.id}-2`;

    let newAnswerLabel2 = document.createElement("label");
    newAnswerLabel2.innerHTML = "False";
    newAnswerLabel2.setAttribute("for", newAnswerBtn2.id);

    newQuestionContainer.appendChild(newQuestion);
    newQuestionContainer.appendChild(newAnswerBtn1);
    newQuestionContainer.appendChild(newAnswerLabel1);
    newQuestionContainer.appendChild(newAnswerBtn2);
    newQuestionContainer.appendChild(newAnswerLabel2);

    return newQuestionContainer;
};


let currentQuestionIndex = 0;

//funktion för att starta quizet:
startBtn.addEventListener("click", () => {

    //döljer föregående fråga om det finns en:
    if (quizQuestion.firstChild) {
        quizQuestion.firstChild.style.display = "none";
    }
    //visar en ny fråga:
    if (currentQuestionIndex < questions.length) {
        let quizElement = createQuestion(questions[currentQuestionIndex]);
        quizQuestion.innerHTML = "";
        quizQuestion.appendChild(quizElement);

        quizQuestion.firstChild.style.display = "block";

        //ändrar texten på knappen:
        if (currentQuestionIndex === questions.length - 1) {
            startBtn.innerText = "Show Result";
        } else {
            startBtn.innerText = "Next Question";
        }

        //ökar indexet för att hålla räkningen på frågorna:
        currentQuestionIndex++;

    } else {
        //kör funktion för att visa resultatet om frågorna är slut:
        showResult();

        //göm knappen här kanske?
    };
});

//skapa en funktion för att visa resultatet här:
function showResult(){
    let resultH2 = document.createElement("h2");
    resultH2.innerText = "Here is your result:";

    //lägg in datan från quizet här:


    result.appendChild(resultH2);

    return result;
};







/*startBtn.addEventListener("click", () => {
    quizQuestion.innerHTML = "";

    questions.forEach((question) => {
        let quizElement = createQuestion(question);
        quizQuestion.append(quizElement);
    });

    startBtn.innerText = "Next";
});
*/