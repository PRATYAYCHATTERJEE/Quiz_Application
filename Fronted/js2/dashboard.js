async function initializeDashboard() {
    
    loadQuizHistory();

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

        <div class="empty-session-card">

    <div class="empty-session-content">

        <span class="empty-tag">
            NO ACTIVE QUIZ
        </span>

        <h2>No Quiz Running</h2>

        <p>
            Publish a quiz to begin a live session.
        </p>

        <p class="empty-note">
            Publish a quiz from the Participants page to start a live session.
        </p>

    </div>

</div>

        `;

        return;

    }

    banner.innerHTML = `

<div class="live-session-card">

    <div class="live-session-left">

        <span class="live-badge">

            🔴 LIVE SESSION

        </span>

        <h2 class="live-title">

            ${session.quizTitle}

        </h2>

        <div class="live-info">

            <span>📝 ${session.totalQuestions} Questions</span>

            <span>👥 <span id="liveParticipants">0</span> Participants</span>

            <span>⏱ ${new Date(session.startedAt).toLocaleTimeString()}</span>

        </div>

    </div>

    <button
        id="endQuizBtn"
        class="end-quiz-btn">

        🛑 End Quiz

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

// =========================
// END QUIZ MODAL
// =========================

function initializeEndQuiz() {

    document.addEventListener("click", async (e) => {
        console.log("Clicked:", e.target.id);

        // Open Modal
        if (e.target.id === "endQuizBtn") {

            document
                .getElementById("endQuizModal")
                .classList.add("show");

        }

        // Close Without Saving
        if (e.target.id === "notNowBtn") {
            console.log("Not Now Clicked");

            await endQuizOnly();

            document
                .getElementById("endQuizModal")
                .classList.remove("show");

        }

        // Save History
       if (e.target.id === "saveQuizBtn") {

    const saved = await saveQuizHistory();

    if(saved){

        await endQuizOnly();

        document
            .getElementById("endQuizModal")
            .classList.remove("show");

        alert("Quiz Saved Successfully");

    }

    else{

        alert("Unable to Save Quiz");

    }

}

    });

}

// =========================
// SAVE HISTORY
// =========================

async function saveQuizHistory() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/history/save",

            {

                method: "POST"

            }

        );

        const result = await response.json();

        if(result.success){

            console.log("Quiz History Saved");

            return true;

        }

        return false;

    }

    catch(error){

        console.error(error);

        return false;

    }

}


// =========================
// END QUIZ
// =========================

async function endQuizOnly(){

    try{

        await fetch(

            "http://localhost:5000/api/session/end",

            {

                method:"POST"

            }

        );

        await refreshBanner();

await loadDashboardStats();
        

    }

    catch(error){

        console.error(error);

    }

}

async function loadQuizHistory() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/history"
        );

        const result = await response.json();

        if (!result.success) return;

        const container =
            document.getElementById("historyContainer");

        if (!container) return;

        container.innerHTML = "";

       const latest = result.data[0];

if(latest){

            container.innerHTML += `

<div class="history-card">

    <div class="history-top">

        <h3>${latest.quizTitle}</h3>

        <span class="history-date">

            ${new Date(latest.endedAt).toLocaleDateString()}

        </span>

    </div>

    <div class="history-grid">

        <div>

            👥 Participants

            <strong>${latest.totalParticipants}</strong>

        </div>

        <div>

            ✅ Completed

            <strong>${latest.completedParticipants}</strong>

        </div>

        <div>

            📝 Questions

            <strong>${latest.totalQuestions}</strong>

        </div>

        <div>

            📊 Average

            <strong>${latest.averageScore}</strong>

        </div>

    </div>

    <div class="history-footer">

    <div>

        🏆 Winner :
        <strong>${latest.winner}</strong>

    </div>

    

</div>

</div>

`;

        }

if(result.data.length > 1){

    container.innerHTML += `

        <div id="historyList" class="history-list">

        </div>

    `;

    const historyList = document.getElementById("historyList");

    result.data.slice(1).forEach(history=>{

        historyList.innerHTML += `

<div class="history-card">

    <div class="history-top">

        <h3>${history.quizTitle}</h3>

        <span class="history-date">

            ${new Date(history.endedAt).toLocaleDateString()}

        </span>

    </div>

    <div class="history-grid">

        <div>
            👥 Participants
            <strong>${history.totalParticipants}</strong>
        </div>

        <div>
            ✅ Completed
            <strong>${history.completedParticipants}</strong>
        </div>

        <div>
            📝 Questions
            <strong>${history.totalQuestions}</strong>
        </div>

        <div>
            📊 Average
            <strong>${history.averageScore}</strong>
        </div>

    </div>

    <div class="history-footer">

    <div>

        🏆 Winner :
        <strong>${history.winner}</strong>

    </div>

</div>

`;

    });
initializeHistoryToggle();
}
    }

    catch(error){

        console.error(error);

    }

}



function initializeHistoryToggle(){

    const btn = document.getElementById("historyToggle");

    if(!btn) return;

    btn.onclick = ()=>{

        const list = document.getElementById("historyList");

        if(!list) return;

        list.classList.toggle("show");

        if(list.classList.contains("show")){

            btn.innerHTML = "Less ▲";

        }

        else{

            btn.innerHTML = "More ▼";

        }

    };

}

