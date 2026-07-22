/* ==========================================
   LOAD PARTICIPANTS
========================================== */

async function loadParticipants() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/participants"
        );

        const result = await response.json();

        if (!result.success) return;

        const tableBody =
            document.getElementById("participantsTableBody");

        tableBody.innerHTML = "";

        result.data.forEach(participant => {

            const row = document.createElement("tr");

            row.innerHTML = `

<td>${participant.name}</td>

<td>${participant.department}</td>

<td>${participant.year}</td>

<td>${participant.phone}</td>

<td>
    <span class="badge ${
        participant.completed ? "success" : "warning"
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

loadParticipants();


/* ==========================================
   EXPORT PARTICIPANTS CSV
========================================== */

async function exportParticipantsCSV() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/participants"
        );

        const result = await response.json();

        if (!result.success) return;

        let csv =
            "Name,Department,Year,Phone,Status\n";

        result.data.forEach(participant => {

            csv += `"${participant.name}",`;
            csv += `"${participant.department}",`;
            csv += `"${participant.year}",`;
            csv += `"${participant.phone}",`;
            csv += `"${participant.completed ? "Completed" : "In Progress"}"\n`;

        });

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "QuizVerse_Participants.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }

    catch(error){

        console.error(error);

        alert("Failed to export participants.");

    }

}