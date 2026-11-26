const questions = [
  {
    question: "Wie viele Bits hat ein Byte?",
    answers: ["4 Bits", "8 Bits", "16 Bits"],
    correct: 1,
    explanation: "Ein Byte besteht aus 8 Bits."
  },
  {
    question: "Welche Ziffern verwendet das Binärsystem?",
    answers: ["0 und 1", "0 bis 7", "1 bis 9"],
    correct: 0,
    explanation: "Im Binärsystem gibt es nur die Ziffern 0 und 1."
  },
  {
    question: "Was ist ein Algorithmus?",
    answers: ["Ein Bauteil im Computer", "Eine Folge von Anweisungen", "Eine Programmiersprache"],
    correct: 1,
    explanation: "Ein Algorithmus ist eine eindeutige Folge von Schritten zur Lösung einer Aufgabe."
  }
];

const quizPanel = document.querySelector("#quiz-panel");
const quizFinish = document.querySelector("#quiz-finish");
const quizCounter = document.querySelector("#quiz-counter");
const quizScore = document.querySelector("#quiz-score");
const quizProgress = document.querySelector("#quiz-progress");
const quizQuestion = document.querySelector("#quiz-question");
const quizAnswers = document.querySelector("#quiz-answers");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizNext = document.querySelector("#quiz-next");
let questionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const current = questions[questionIndex];
  answered = false;
  quizCounter.textContent = `Frage ${questionIndex + 1} von ${questions.length}`;
  quizScore.textContent = `Punkte: ${score}`;
  quizProgress.style.width = `${(questionIndex / questions.length) * 100}%`;
  quizQuestion.textContent = current.question;
  quizFeedback.textContent = "";
  quizNext.disabled = true;
  quizNext.textContent = questionIndex === questions.length - 1 ? "Ergebnis" : "Weiter";
  quizAnswers.replaceChildren();

  current.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(answerIndex));
    quizAnswers.append(button);
  });
}

function chooseAnswer(answerIndex) {
  if (answered) return;
  answered = true;
  const current = questions[questionIndex];
  const answerButtons = [...quizAnswers.querySelectorAll(".answer-button")];
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === current.correct) button.classList.add("correct");
    if (index === answerIndex && index !== current.correct) button.classList.add("incorrect");
  });

  if (answerIndex === current.correct) {
    score += 1;
    quizFeedback.textContent = `Richtig! ${current.explanation}`;
  } else {
    quizFeedback.textContent = `Noch nicht ganz. ${current.explanation}`;
  }

  quizScore.textContent = `Punkte: ${score}`;
  quizNext.disabled = false;
}

function finishQuiz() {
  quizPanel.hidden = true;
  quizFinish.hidden = false;
  quizProgress.style.width = "100%";
  document.querySelector("#quiz-finish-title").textContent = `${score} von ${questions.length} Punkten`;
  document.querySelector("#quiz-finish-copy").textContent =
    score === questions.length ? "Stark – du hast alle Fragen richtig beantwortet!" :
    score === 0 ? "Ein guter Start. Schau dir die Apps an und probier es nochmal." :
    "Gut gemacht! Mit jeder Runde bleibt mehr hängen.";
}

quizNext.addEventListener("click", () => {
  if (questionIndex === questions.length - 1) {
    finishQuiz();
    return;
  }

  questionIndex += 1;
  renderQuestion();
});

document.querySelector("#quiz-restart").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  quizPanel.hidden = false;
  quizFinish.hidden = true;
  renderQuestion();
});

renderQuestion();
