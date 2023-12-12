let questions = [
    {
        question: "1. Zagreb is the capital city of Poland. True of false?",
        correctAnswer: false,
        id:"question1"
    },
    {
        question: "2. Ottawa is the capital city of Canada. True or false?",
        correctAnswer: true,
        id:"question2"
    },
    {
        question: "3. Suva is the capital of Fiji. True or false??",
        correctAnswer: true,
        id:"question3"
    },
    {
        question: "4. Vaduz is the capital city of Liechtenstein. True or false?",
        correctAnswer: true,
        id:"question4"
    },
    {
        question: "5. Tbilisi is the capital city of Libya. True or false?",
        correctAnswer: false,
        id:"question5"
    },
    {
        question: "6. Kingston is the capital city of Jamaica. True or false?",
        correctAnswer: true,
        id:"question6"
    },
    {
        question: "7. Bamako is the capital city of Malawi. True or false?",
        correctAnswer: false,
        id:"question7"
    },
    {
        question: "8. Kathmandu is the capital city of Nepal. True or false?",
        correctAnswer: true,
        id:"question8"
    },
    {
        question: "9. Doha is the capital city of Paraguay. True or false?",
        correctAnswer: false,
        id:"question9"
    },
    {
        question: "10. Barcelona is the capital of Spain. True or false??",
        correctAnswer: false,
        id:"question10"
    },
    {
        question: "All done! Ready for some results?",
        correctAnswer: true,
        id:"question11"
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
    //skapar ett value:
    newAnswerBtn1.value = "true";

    let newAnswerLabel1 = document.createElement("label");
    newAnswerLabel1.innerHTML = "true";
    newAnswerLabel1.setAttribute("for", newAnswerBtn1.id); 

    let newAnswerBtn2 = document.createElement("input");
    newAnswerBtn2.type = "radio";
    newAnswerBtn2.name = "options";
    newAnswerBtn2.id = `radio${question.id}-2`;
    newAnswerBtn2.value = "false";

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
let selectedAnswers;

//funktion för att starta quizet:
startBtn.addEventListener("click", () => {

    //döljer föregående fråga om det finns en:
    if (quizQuestion.firstChild) {
        quizQuestion.firstChild.style.display = "none";
    }
    //visar en ny fråga och nollställer datan i div:en #question-container:
    if (currentQuestionIndex < questions.length) {

        //Spara svaret på nuvarande fråga:
        selectedAnswers = document.querySelectorAll('input[name="options"]:checked');

        selectedAnswers.forEach((selectedAnswer, index) => {
            let questionIndex = currentQuestionIndex -1;
            let question = questions[questionIndex];

        console.log(selectedAnswer);
        console.log(selectedAnswer.value);
        console.log(question.correctAnswer);

        let isCorrect = selectedAnswer.value === question.correctAnswer.toString();

            if (selectedAnswer && isCorrect) {  
                userResults.push({
                   question: question.question,
                   answer: selectedAnswer.value,
                   isCorrect: true, 
                   questionIndex: questionIndex
                   });
                } else {
                userResults.push({
                    question: question.question,
                    answer: selectedAnswer.value,
                    isCorrect: false, 
                    questionIndex: questionIndex
                   }); 
                }
        
        });


        // Visa ut nästa fråga
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



//funktion för att visa resultatet här:
function showResult(){

    let correctAnswerCount = userResults.filter(result => result.isCorrect).length;

    let resultH2 = document.querySelector("#result-h2");
    let resultP = document.querySelector("#result-paragraph");
    
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

        resultP.innerText = 
        `Is Zagreb the capital of Poland? No, it's the capital of Croatia.
        Is Ottowa the capital of Canada? Yes, that's true!
        Is Suva the capital of Fiji? Yes, that's true!
        Is Vaduz the capital of Liechtenstein? Yes, that's true!
        Is Tbilisi the capital of Libya? No, it's the capital of .....
        Is Kingston the capital of Jamaica? Yes that's true!
        Is Bamako the capital of Malawi? No, it's the capital of .....
        
        `

    return resultH2;
    
};



//lägg till krav på iklickad radiobtn för att kunna gå vidare till nästa fråga?

/*

Visa antal rätt svarade frågor? ex 8/10 rätt?
Eller skapa 10st div kopplade till varsin fråga som blir antingen gröna eller röda beroende på svar?

*/
