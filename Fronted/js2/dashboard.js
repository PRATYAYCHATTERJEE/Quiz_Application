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



async function loadDashboardBanner() {

    const banner = document.getElementById("dashboardBanner");

    if (!banner) return;

    try {

        const response = await fetch("http://localhost:5000/api/session/status");

        const result = await response.json();

        if (!result.success || !result.data.isActive) {

            banner.innerHTML = noQuizBanner();

            return;

        }

        banner.innerHTML = liveQuizBanner(result.data);

    }

    catch (error) {

        console.error(error);

        banner.innerHTML = noQuizBanner();

    }

}

function liveQuizBanner(session) {

    return `

    <div class="hero-card live-session">

        <div>

            <p class="eyebrow">🔴 LIVE SESSION</p>

            <h2>${session.quizTitle}</h2>

            <p>

                ${session.totalQuestions} Questions

                &nbsp;&nbsp;&nbsp;

                Started :
                ${new Date(session.startedAt).toLocaleTimeString()}

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