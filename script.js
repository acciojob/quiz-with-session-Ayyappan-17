// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load user progress from sessionStorage or initialize
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Check if previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // Save selection on change
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Function to calculate score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);

  // Optionally clear session storage if you want progress reset
  // sessionStorage.removeItem("progress");
});

// On page load, restore score if exists
window.addEventListener("load", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});

// Initial render
renderQuestions();
