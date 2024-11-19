const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["O2", "H2O", "CO2", "N2"],
        correctAnswer: "H2O"
    },
    {
        question: "Who developed the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: "Albert Einstein"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Osmium", "Ozone", "Oxygenated"],
        correctAnswer: "Oxygen"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "George Orwell", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "South Korea", "Japan", "Thailand"],
        correctAnswer: "Japan"
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correctAnswer: "2"
    },
    {
        question: "Which continent is the Sahara Desert located on?",
        answers: ["Asia", "Africa", "Australia", "South America"],
        correctAnswer: "Africa"
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = '';

    question.answers.forEach(answer => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.onclick = () => checkAnswer(answer, answerButton); 
        answersContainer.appendChild(answerButton);
    });

    document.getElementById("score-container").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(selectedAnswer, selectedButton) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const answerButtons = document.querySelectorAll("#answers button");

    answerButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "#28a745"; 
        } else if (button.textContent === selectedAnswer) {
            button.style.backgroundColor = "#dc3545";
        }
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
        userScore++;
    }

    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}
function showFinalScore() {
    document.getElementById("question-container").style.display = "none";
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Quiz completed! Your final score is: ${userScore} / ${questions.length}`;
    document.getElementById("score-container").style.display = "block";

    setTimeout(() => {
        currentQuestionIndex = 0;
        userScore = 0;
        loadQuestion();
        document.getElementById("question-container").style.display = "block";  
        document.getElementById("score-container").style.display = "none"; 
    }, 20000);
}


loadQuestion();


function fetchJoke() {
    const jokeElement = document.getElementById("joke");
    jokeElement.textContent = "Loading...";

    fetch("https://official-joke-api.appspot.com/random_joke")
        .then(response => response.json())
        .then(data => {
            jokeElement.textContent = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            jokeElement.textContent = "Oops! Something went wrong. Try again later.";
        });
}

fetchJoke();
