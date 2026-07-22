document.addEventListener("DOMContentLoaded", () => {

    const pageTitle = document.getElementById("page-title");
    const pageContent = document.getElementById("page-content");
    const navItems = [...document.querySelectorAll(".nav-item[data-page]")];

    const pageTitles = {
        dashboard: "Dashboard",
        participants: "Participants",
        questions: "Questions",
        "create-question": "Create Question",
        leaderboard: "Leaderboard",
        analytics: "Analytics",
        settings: "Settings"
    };

    const pageTemplates = {
        dashboard: document.getElementById("template-dashboard"),
        participants: document.getElementById("template-participants"),
        questions: document.getElementById("template-questions"),
        "create-question": document.getElementById("template-create-question"),
        leaderboard: document.getElementById("template-leaderboard"),
        analytics: document.getElementById("template-analytics"),
        settings: document.getElementById("template-settings")
    };

    function normalizePage(page) {
        return page || "dashboard";
    }

    function setActiveNav(page) {

        navItems.forEach(item => {

            const active = item.dataset.page === page;

            item.classList.toggle("active", active);

            if (active)
                item.setAttribute("aria-current", "page");
            else
                item.removeAttribute("aria-current");

        });

    }

    function renderPage(page) {

        page = normalizePage(page);

        pageTitle.textContent = pageTitles[page];

        document.title = `QuizVerse | ${pageTitles[page]}`;

        pageContent.innerHTML = "";

        const template = pageTemplates[page];

        if (template)
            pageContent.appendChild(template.content.cloneNode(true));
// Initialize page specific JS
if (page === "create-question") {
    initializeCreateQuestion();
}

if (page === "questions") {
    initializeQuestions();
}

if (page === "participants") {
    loadParticipants();
}

        setActiveNav(page);

        history.replaceState(null, "", "#" + page);

    }

    navItems.forEach(item => {

        item.addEventListener("click", e => {

            e.preventDefault();

            renderPage(item.dataset.page);

        });

    });

    window.addEventListener("hashchange", () => {

        renderPage(location.hash.replace("#", ""));

    });

    renderPage(location.hash.replace("#", "") || "dashboard");

});


async function loadParticipants() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/participants"
        );

        const result = await response.json();

        if (!result.success) return;

        const tableBody = document.getElementById(
            "participantsTableBody"
        );

        if (!tableBody) return;

        tableBody.innerHTML = "";

        result.data.forEach(participant => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${participant.name}</td>

                <td>${participant.department}</td>

                <td>${participant.year}</td>

                <td>${participant.score}</td>

                <td>
                    <span class="badge ${
                        participant.completed
                        ? "success"
                        : "warning"
                    }">
                        ${
                            participant.completed
                            ? "Completed"
                            : "In Progress"
                        }
                    </span>
                </td>

            `;

            tableBody.appendChild(row);

        });

    }

    catch(error){

        console.error(error);

    }

}