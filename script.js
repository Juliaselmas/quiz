let questions = [
    {
        question: "1. Skydiving Archery",
        description: "Competitors are challenged to aim and score as high points as possible while skydiving from a plane.",
        correctAnswer: false,
        id:"question1"
    },
    {
        question: "2. Cheese Rolling",
        description: "A sport that involves a big round cheese getting chased by a bunch of people while rolling down a hill.",
        correctAnswer: true,
        id:"question2"
    },
    {
        question: "3. Extreme Ironing",
        description: "Whoever irons their clothes in the wierdest and most challenging places win.",
        correctAnswer: true,
        id:"question3"
    },
    {
        question: "4. Chess Boxing",
        description: "Just as the name tells you; a sport where chess and boxing is combined. You either win by chess mate or knockout.",
        correctAnswer: true,
        id:"question4"
    },
    {
        question: "5. Extreme Hula Hoop Marathon",
        description: "The first one to finish the marathon while still hula hooping wins.",
        correctAnswer: false,
        id:"question5"
    },
    {
        question: "6. Worm charming",
        description: "The person that has managed to attract the most worms from the ground wins.",
        correctAnswer: true,
        id:"question6"
    },
    {
        question: "7. Pumpkin Precision Bowling",
        description: "Imagine regular bowling but with a very uneven bowling ball.",
        correctAnswer: false,
        id:"question7"
    },
    {
        question: "8. Wife Carrying",
        description: "A race where men are running through a obstacle course while carrying their wifes on their backs.",
        correctAnswer: true,
        id:"question8"
    },
    {
        question: "9. Handstand Hammer Throw",
        description: "A sport where the goal is to throw your hammer as far as possible, while being upside down.",
        correctAnswer: false,
        id:"question9"
    },
    {
        question: "10. Unusual Outfit Orientation",
        description: "The wierder and more creative outfit, the higher score you'll get.",
        correctAnswer: false,
        id:"question10"
    },
  ];

let darkModeBtn = document.querySelector("#darkMode");
let darkModeLabel = document.querySelector("#darkMode-container label")
let myH1 = document.querySelector("h1");
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

    let newDescription = document.createElement("p");
    newDescription.textContent = question.description;

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
    newQuestionContainer.appendChild(newDescription);
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
    myH1.innerText = `Wait, are theese sports
    actually for real?`;
    myH1.classList.add("quizTitle");

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
        

        let resultText = `You got ${correctAnswerCount} out of ${questions.length} questions correct!`;
    
        // Ändra texten på resultH2
        resultP.innerText = resultText;


    return resultH2;
    
};

