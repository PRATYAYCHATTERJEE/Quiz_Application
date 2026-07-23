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