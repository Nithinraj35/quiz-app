const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;
let time = 10;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("time");
const resultEl = document.getElementById("result");

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(option));
    optionsEl.appendChild(btn);
  });
  startTimer();
}

function selectAnswer(option) {
  clearInterval(timer);
  if (option === questions[currentQuestion].answer) {
    score++;
  }
  nextBtn.disabled = false;
}

function startTimer() {
  time = 10;
  timerEl.textContent = time;
  timer = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerEl.textContent = 10;
  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").style.display = "none";
    resultEl.style.display = "block";
    resultEl.textContent = "Quiz finished! Your score: " + score + "/" + questions.length;
  }
});

// Start first question
showQuestion();
