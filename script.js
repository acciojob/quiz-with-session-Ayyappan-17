// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load user progress from sessionStorage or initialize
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    // Choices
    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Check previously selected answer
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // Save selection to session storage
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate score
function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });
  return score;
}

// Submit button click handler
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission if inside a form
  const score = calculateScore();
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Restore score on page load if it exists
window.addEventListener("load", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});

// Initial render
renderQuestions();
