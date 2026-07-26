async function initializeDashboard() {

    // Load Statistics
    loadDashboardStats();

    // Load Banner
    await refreshBanner();

    // Auto Refresh Every 5 Seconds
    setInterval(loadDashboardStats, 5000);

    setInterval(refreshBanner, 5000);

}

async function refreshBanner() {

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

            <div class="banner-note">

    Publish a quiz from the Participants page to start a live session.

</div>

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







async function loadDashboardStats() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard/stats");

        const result = await response.json();

        if (!result.success) return;

        document.getElementById("totalParticipants").textContent =
            result.data.participants;

        document.getElementById("totalQuestions").textContent =
            result.data.questions;

        document.getElementById("averageScore").textContent =
            result.data.averageScore;

        document.getElementById("completedParticipants").textContent =
            result.data.completed;

    }

    catch(error){

        console.error(error);

    }

}

