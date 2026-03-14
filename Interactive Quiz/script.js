const questions = [
    {
        question: "Who is the founder of the fashion brand Chanel?",
        options: ["Coco Chanel", "Gianni Versace", "Karl Lagerfeld", "Donatella Versace"],
        answer: 0
    },
    {
        question: "What fabric is traditionally used to make denim jeans?",
        options: ["Silk", "Cotton", "Linen", "Wool"],
        answer: 1
    },
    {
        question: "Which city is known as the fashion capital of France?",
        options: ["Rome", "London", "Paris", "Milan"],
        answer: 2
    },
    {
        question: "What does 'Haute Couture' mean?",
        options: ["Ready-to-wear", "High fashion", "Street style", "Vintage clothing"],
        answer: 1
    },
    {
        question: "Which designer is famous for the brand Gucci?",
        options: ["Guccio Gucci", "Armani", "Prada", "Dior"],
        answer: 0
    },
    {
        question: "Which accessory is used to tighten trousers at the waist?",
        options: ["Scarf", "Belt", "Bracelet", "Tie"],
        answer: 1
    },
    {
        question: "What is the name of traditional Japanese clothing?",
        options: ["Kimono", "Sari", "Hanbok", "Cheongsam"],
        answer: 0
    },
    {
        question: "Which material is commonly used in winter coats?",
        options: ["Wool", "Rayon", "Chiffon", "Nylon"],
        answer: 0
    },
    {
        question: "What pattern consists of small repeated flowers?",
        options: ["Polka dot", "Floral", "Striped", "Checked"],
        answer: 1
    },
    {
        question: "Which event showcases new fashion collections?",
        options: ["Film Festival", "Fashion Week", "Music Awards", "Art Expo"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    q.options.forEach((option, index) => {
        const button = document.createElement("div");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => selectAnswer(index);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = "Your Final Score: " + score + " / " + questions.length;

    if (score === questions.length) {
        messageText.textContent = "Excellent! You are a fashion expert!";
    } else if (score >= 7) {
        messageText.textContent = "Good job! You know fashion well.";
    } else {
        messageText.textContent = "Try Again! Keep learning about fashion.";
    }
}

restartButton.onclick = function() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
};

nextButton.style.display = "none";

loadQuestion();
