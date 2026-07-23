/* ==========================================
   LEADERBOARD
========================================== */

async function initializeLeaderboard(){

    try{

        const response=await fetch(
            "http://localhost:5000/api/participants/leaderboard"
        );

        const result=await response.json();

        if(!result.success) return;

        renderPodium(result.data);
        
        renderLeaderboardTable(result.data);

    }

    catch(error){

        console.error(error);

    }

}


function renderPodium(players) {

    if (players.length > 0) {

        document.getElementById("firstName").textContent = players[0].name;
        document.getElementById("firstDept").textContent = players[0].department;
        document.getElementById("firstScore").textContent = players[0].score;
        document.getElementById("firstTotal").textContent = players[0].totalMarks;
        document.getElementById("firstTime").textContent = players[0].timeTaken;

    }

    if (players.length > 1) {

        document.getElementById("secondName").textContent = players[1].name;
        document.getElementById("secondDept").textContent = players[1].department;
        document.getElementById("secondScore").textContent = players[1].score;
        document.getElementById("secondTotal").textContent = players[1].totalMarks;
        document.getElementById("secondTime").textContent = players[1].timeTaken;

    }

    if (players.length > 2) {

        document.getElementById("thirdName").textContent = players[2].name;
        document.getElementById("thirdDept").textContent = players[2].department;
        document.getElementById("thirdScore").textContent = players[2].score;
        document.getElementById("thirdTotal").textContent = players[2].totalMarks;
        document.getElementById("thirdTime").textContent = players[2].timeTaken;

    }

}


function renderLeaderboardTable(players) {

    const tbody = document.getElementById("leaderboardBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    // Skip Top 3
    const remainingPlayers = players.slice(3);

    remainingPlayers.forEach(player => {

        tbody.innerHTML += `

        <tr>

            <td>${player.rank}</td>

            <td>${player.name}</td>

            <td>${player.department}</td>

            <td>${player.score}/${player.totalMarks}</td>

            <td>${player.correct}</td>

            <td>${player.wrong}</td>

            <td>${player.timeTaken}</td>

        </tr>

        `;

    });

}


