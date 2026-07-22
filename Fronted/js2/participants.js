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