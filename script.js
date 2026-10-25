
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const questionNumber = document.querySelector(".question-number");
const scoreElement = document.querySelector("#score");
const nextButton = document.querySelector("#next");

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1
  },
  {
    question: "Which language makes web pages interactive?",
    answers: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    correctAnswer: 2
  },
  {
    question: "Which keyword declares a variable that can be reassigned?",
    answers: [
      "const",
      "let",
      "fixed",
      "static"
    ],
    correctAnswer: 1
  }
];

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let answerValidated = false;

// Afficher une question et ses réponses
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  question.textContent = currentQuestion.question;

  questionNumber.textContent =
    `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  scoreElement.textContent = `Score: ${score}`;

  // Vider les anciennes réponses
  answers.innerHTML = "";

  // Réinitialiser la sélection
  selectedAnswer = null;
  answerValidated = false;

  // Créer les boutons de réponse
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;
    button.classList.add("answer");

    // Détecter le clic sur une réponse
    button.addEventListener("click", () => {
      if (answerValidated) {
        return;
      }

      selectedAnswer = index;

      // Retirer la sélection précédente
      const answerButtons = answers.querySelectorAll(".answer");

      answerButtons.forEach((answerButton) => {
        answerButton.classList.remove(
          "selected",
          "correct",
          "incorrect"
        );
      });

      // Mettre en évidence la réponse sélectionnée
      button.classList.add("selected");
    });

    answers.appendChild(button);
  });

  nextButton.disabled = false;

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "Finish"
      : "Next";
}

// Gérer le bouton Suivant
nextButton.addEventListener("click", () => {
  // Vérifier si la réponse a déjà été validée
  if (!answerValidated) {
    // Obliger l'utilisateur à sélectionner une réponse
    if (selectedAnswer === null) {
      alert("Please select an answer first!");
      return;
    }

    answerValidated = true;

    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = answers.querySelectorAll(".answer");

    // Désactiver les réponses après validation
    answerButtons.forEach((button) => {
      button.disabled = true;
    });

    // Vérifier si la réponse est correcte
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score++;

      answerButtons[selectedAnswer].classList.add("correct");
    } else {
      answerButtons[selectedAnswer].classList.add("incorrect");

      answerButtons[
        currentQuestion.correctAnswer
      ].classList.add("correct");
    }

    // Actualiser le score
    scoreElement.textContent = `Score: ${score}`;

    // Modifier le texte du bouton
    nextButton.textContent =
      currentQuestionIndex === questions.length - 1
        ? "Show result"
        : "Next question";

    return;
  }

  // Afficher le résultat après la dernière question
  if (currentQuestionIndex === questions.length - 1) {
    question.textContent = "Quiz completed!";

    answers.innerHTML = "";

    questionNumber.textContent = "Finished";

    scoreElement.textContent =
      `Final score: ${score} / ${questions.length}`;

    nextButton.textContent = "Restart";
    nextButton.disabled = false;

    return;
  }

  // Passer à la question suivante
  currentQuestionIndex++;

  displayQuestion();
});

// Démarrer le quiz
displayQuestion();
