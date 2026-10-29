const QUIZ_LENGTH = 10;

// ---- Element references ----
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const barFill = document.getElementById("bar-fill");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");
const reviewBox = document.getElementById("review");

// ---- State ----
let quiz = [];       // the 10 questions for this round
let current = 0;     // index of the current question
let score = 0;
let missed = [];     // questions answered incorrectly
let answered = false;

// ---- Helpers ----

// Fisher-Yates shuffle: returns a new shuffled array
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Pick 10 random questions and shuffle each question's options too
function buildQuiz() {
  return shuffle(questions)
    .slice(0, Math.min(QUIZ_LENGTH, questions.length))
    .map((q) => {
      const correctText = q.options[q.answer];
      const options = shuffle(q.options);
      return {
        question: q.question,
        options,
        answer: options.indexOf(correctText),
      };
    });
}

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

// ---- Quiz flow ----

function startQuiz() {
  quiz = buildQuiz();
  current = 0;
  score = 0;
  missed = [];
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const q = quiz[current];
  answered = false;

  progressText.textContent = `Question ${current + 1} of ${quiz.length}`;
  scoreText.textContent = `Score: ${score}`;
  barFill.style.width = `${(current / quiz.length) * 100}%`;
  questionText.textContent = q.question;

  optionsBox.innerHTML = "";
  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsBox.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
  nextBtn.textContent = current === quiz.length - 1 ? "See results" : "Next question";
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quiz[current];
  const buttons = optionsBox.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
  });

  if (index === q.answer) {
    score++;
  } else {
    buttons[index].classList.add("wrong");
    missed.push({ question: q.question, yourAnswer: q.options[index], correct: q.options[q.answer] });
  }

  scoreText.textContent = `Score: ${score}`;
  barFill.style.width = `${((current + 1) / quiz.length) * 100}%`;
  nextBtn.classList.remove("hidden");
  nextBtn.focus();
}

function nextQuestion() {
  current++;
  if (current < quiz.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showScreen(resultScreen);
  finalScore.textContent = `You scored ${score} / ${quiz.length}`;

  const ratio = score / quiz.length;
  if (ratio === 1) finalMessage.textContent = "Perfect round!";
  else if (ratio >= 0.7) finalMessage.textContent = "Great work!";
  else if (ratio >= 0.4) finalMessage.textContent = "Not bad. Try again to beat it.";
  else finalMessage.textContent = "Keep practising. A new round has new questions.";

  // Show only the questions that were missed, with the right answer
  reviewBox.innerHTML = "";
  missed.forEach((m) => {
    const item = document.createElement("div");
    item.className = "review-item missed";

    const title = document.createElement("strong");
    title.textContent = m.question;

    const detail = document.createElement("span");
    detail.textContent = `Your answer: ${m.yourAnswer}. Correct: ${m.correct}.`;

    item.append(title, detail);
    reviewBox.appendChild(item);
  });
}

// ---- Events ----
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
