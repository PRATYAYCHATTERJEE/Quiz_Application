async function initializeDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/session/status"
        );

        const result = await response.json();

        if (result.success) {

            renderDashboard(result.data);

        }

    }

    catch (error) {

        console.error(error);

    }

}


function renderDashboard(session) {

    const banner = document.getElementById("dashboardBanner");

    if (!banner) return;

    if (!session) {

        banner.innerHTML = `

        <div class="live-banner">

            <div>

                <div class="banner-tag">
                    NO ACTIVE QUIZ
                </div>

                <h2>No Quiz Running</h2>

                <p>
                    Publish a quiz to begin a live session.
                </p>

            </div>

            <button id="openQuizBtn" class="primary-btn">

                Open Live Quiz

            </button>

        </div>

        `;

        return;

    }

    banner.innerHTML = `

    <div class="live-banner">

        <div>

            <div class="banner-tag">

                LIVE SESSION

            </div>

            <h2>

                ${session.quizTitle}

            </h2>

            <p>

                ${session.totalQuestions} Questions

            </p>

        </div>

        <button
            id="endQuizBtn"
            class="danger-btn">

            End Quiz

        </button>

    </div>

    `;

}