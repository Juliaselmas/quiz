let questions = [
    {
        question: "1. Är jorden platt?",
        correctAnswer: "false",
        id:"question1"
    },
    {
        question: "2. Är vattnet blött?",
        correctAnswer: "true",
        id:"question2"
    },
    {
        question: "3. Är jorden platt?",
        correctAnswer: "true",
        id:"question3"
    },
    {
        question: "4. Är vattnet blött?",
        correctAnswer: "true",
        id:"question4"
    },
    {
        question: "5. Är jorden platt?",
        correctAnswer: "false",
        id:"question5"
    },
    {
        question: "6. Är vattnet blött?",
        correctAnswer: "true",
        id:"question6"
    },
    {
        question: "7. Är vattnet blött?",
        correctAnswer: "false",
        id:"question7"
    },
    {
        question: "8. Är jorden platt?",
        correctAnswer: "true",
        id:"question8"
    },
    {
        question: "9. Är vattnet blött?",
        correctAnswer: "false",
        id:"question9"
    },
    {
        question: "10. Är jorden platt?",
        correctAnswer: "false",
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

    let newAnswerBtn1 = document.createElement("input");
    //definierar den nya input som en radiobtn:
    newAnswerBtn1.type = "radio";
    //tilldelar radiobtn ett namn:
    newAnswerBtn1.name = "options";
    //skapar ett dymaniskt ID till varje radiobtn:
    newAnswerBtn1.id = `radio${question.id}-1`;

    let newAnswerLabel1 = document.createElement("label");
    newAnswerLabel1.innerHTML = "true";
    newAnswerLabel1.setAttribute("for", newAnswerBtn1.id); 

    let newAnswerBtn2 = document.createElement("input");
    newAnswerBtn2.type = "radio";
    newAnswerBtn2.name = "options";
    newAnswerBtn2.id = `radio${question.id}-2`;

    let newAnswerLabel2 = document.createElement("label");
    newAnswerLabel2.innerHTML = "false";
    newAnswerLabel2.setAttribute("for", newAnswerBtn2.id);

    newQuestionContainer.appendChild(newQuestion);
    newQuestionContainer.appendChild(newAnswerBtn1);
    newQuestionContainer.appendChild(newAnswerLabel1);
    newQuestionContainer.appendChild(newAnswerBtn2);
    newQuestionContainer.appendChild(newAnswerLabel2);

    return newQuestionContainer;
};

//behövs för att hålla koll på numrering på frågorna:
let currentQuestionIndex = 0;
let userResults = [];

//funktion för att starta quizet:
startBtn.addEventListener("click", () => {

    //döljer föregående fråga om det finns en:
    if (quizQuestion.firstChild) {
        quizQuestion.firstChild.style.display = "none";
    }
    //visar en ny fråga och nollställer datan i div:en #question-container:
    if (currentQuestionIndex < questions.length) {
        let quizElement = createQuestion(questions[currentQuestionIndex]);
        quizQuestion.innerHTML = "";
        quizQuestion.appendChild(quizElement);

        //motsatsen till style.display = "block". Visar en ny fråga:
        quizQuestion.firstChild.style.display = "block";

        //ändrar texten på knappen när det finns inte finns fler frågor att hämta:
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
        startBtn.remove();
    };
});

let selectedAnswers = document.querySelectorAll('input[name="options"]:checked'); 
questions.forEach((question, index) => {
    let selectedAnswer = selectedAnswers[index];
    //console.log(selectedAnswer);

    if (selectedAnswer) {

    if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
        userResults.push({
           question: question.question,
           answer: selectedAnswer.value,
           isCorrect: true 
        });
    } else {
        userResults.push({
            question: question.question,
            answer: selectedAnswer.value,
            isCorrect: false 
         }); 
    }
}

});


//funktion för att visa resultatet här:
function showResult(){
    //skippa denna och gör en tom h2 i html istället?
    //let resultHeadline = document.createElement("h2");
    //resultHeadline.innerText = "Here is your result:";

    //lägg in datan från quizet här:

    //ev att denna ej kommer behövas.
    //let selectedAnswers = document.querySelectorAll('input[name="options"]:checked'); 
    console.log(selectedAnswers);
    console.log(selectedAnswers[0]);

    //lägg denna array globalt!!
    

    //lägg funktionen globalt!! just nu når den inte slectedAnswers som ligger i ett annat scope.
    /*
    questions.forEach((question, index) => {
        //let correctAnswerString = question.correctAnswer.toString();
        let selectedAnswer = selectedAnswers[index];
        console.log(selectedAnswer);

        if (selectedAnswer) {

        if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
            userResults.push({
               question: question.question,
               answer: selectedAnswer.value,
               isCorrect: true 
            });
        } else {
            userResults.push({
                question: question.question,
                answer: selectedAnswer.value,
                isCorrect: false 
             }); 
        }
    }

    });
    */


    let correctAnswerCount = userResults.filter(result => result.isCorrect).length;

    let resultH2 = document.querySelector("#result-h2");
    
        if (correctAnswerCount > 8) {
            resultH2.innerText = "This went great!";
            resultH2.classList.add("resultGreen");
        } else if (correctAnswerCount <= 5) {
            resultH2.innerText = "This did not go very well...";
            resultH2.classList.add("resultRed");
        } else {
            resultH2.innerText = "This went alright!";
            resultH2.classList.add("resultOrange"); 
        };

    return result;
};

//lägg till krav på iklickad radiobtn för att kunna gå vidare till nästa fråga?

/*

Visa antal rätt svarade frågor? ex 8/10 rätt?
Eller skapa 10st div kopplade till varsin fråga som blir antingen gröna eller röda beroende på svar?

*/
