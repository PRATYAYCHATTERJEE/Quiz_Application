document.addEventListener("DOMContentLoaded", () => {

    initializeQuestions();

});

function initializeQuestions() {

    loadQuestions();

}

async function loadQuestions() {

    try {

        const response = await fetch("http://localhost:5000/api/questions");

        const result = await response.json();

        const container = document.getElementById("questionsContainer");

        if (!container) return;

        container.innerHTML = "";

        result.data.forEach(question => {

            container.innerHTML += `

            <div class="question-card">

                <div class="question-header">

                    <div class="question-badges">

                        <span class="badge difficulty ${question.difficulty.toLowerCase()}">
                            ${question.difficulty}
                        </span>

                        <span class="badge category">
                            ${question.category}
                        </span>

                    </div>

                    <span class="badge marks">
                        ${question.marks} Pts
                    </span>

                </div>

                <h3 class="question-title">
                    ${question.question}
                </h3>

                <div class="question-options">

                    <div class="option ${question.correctAnswer === 0 ? "correct" : ""}">
                        <span class="option-letter">A</span>
                        <span>${question.options[0]}</span>
                    </div>

                    <div class="option ${question.correctAnswer === 1 ? "correct" : ""}">
                        <span class="option-letter">B</span>
                        <span>${question.options[1]}</span>
                    </div>

                    <div class="option ${question.correctAnswer === 2 ? "correct" : ""}">
                        <span class="option-letter">C</span>
                        <span>${question.options[2]}</span>
                    </div>

                    <div class="option ${question.correctAnswer === 3 ? "correct" : ""}">
                        <span class="option-letter">D</span>
                        <span>${question.options[3]}</span>
                    </div>

                </div>

                <div class="question-footer">

                    <div class="question-footer">

    <div class="footer-left">

        <button class="icon-btn edit-btn" data-id="${question._id}">
            ✏️
        </button>

    </div>

    <div class="footer-right">

        <button class="icon-btn delete-btn" data-id="${question._id}">
            🗑️
        </button>

    </div>

</div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}