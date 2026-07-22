/* ==========================================================
   LOAD PARTICIPANT DETAILS
========================================================== */

document.getElementById("participantName").textContent =
    localStorage.getItem("participantName") || "Participant";

document.getElementById("participantDepartment").textContent =
    localStorage.getItem("participantDepartment") || "---";

document.getElementById("participantYear").textContent =
    localStorage.getItem("participantYear") || "---";

/* ==========================================================
   BACK TO HOME
========================================================== */

function goHome() {

    // Remove participant session
    localStorage.removeItem("participantId");
    localStorage.removeItem("participantName");
    localStorage.removeItem("participantDepartment");
    localStorage.removeItem("participantYear");
    localStorage.removeItem("quizResult");
    localStorage.removeItem("quizverseQuizState");

    // Redirect
    window.location.href = "index.html";

}