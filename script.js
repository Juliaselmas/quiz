let questions = [
    {
        question: "Är jorden platt?",
        correctAnswer: false,
        id:"question1"
    },
  ];

let darkModeBtn = document.querySelector("#darkMode");
let startBtn = document.querySelector("#startButton");
let quizQuestion = document.querySelector("#question-container");
//let quizQuestion = document.getElementById("question-container");

darkModeBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkModeBtn.checked);
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
    newAnswerBtn1.type = "radio";
    newAnswerBtn1.name = "options";
    //obs! kolla så att answerbtn2 inte får samma id
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


//funktion för att starta quizet
startBtn.addEventListener("click", () => {
    questions.forEach((question) => {
        let quizElement = createQuestion(question);
        quizQuestion.append(quizElement);
    });

    startBtn.innerText = "NEXT";
});