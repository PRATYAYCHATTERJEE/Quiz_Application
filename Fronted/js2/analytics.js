let departmentChart = null;
let yearChart = null;

async function loadAnalytics() {

    try {

        const response = await fetch("http://localhost:5000/api/analytics");
        const result = await response.json();

        if (!result.success) return;
updateSummaryCards(result.departmentStats);

createDepartmentChart(result.departmentStats);

createYearChart(result.yearStats);

    }

    catch (error) {

        console.error("Analytics Error:", error);

    }

}

// ===============================
// Department Bar Chart
// ===============================

function createDepartmentChart(data) {

    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);

    const ctx = document
        .getElementById("departmentChart")
        .getContext("2d");

    // Destroy previous chart
    if (departmentChart) {

        departmentChart.destroy();

    }

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, "#22d3ee");
    gradient.addColorStop(.5, "#3b82f6");
    gradient.addColorStop(1, "#8b5cf6");

    departmentChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels,

            datasets: [{

                label: "Participants",

                data: counts,

                backgroundColor: gradient,

                borderRadius: 14,

                borderSkipped: false,

                hoverBackgroundColor: "#60a5fa",

                maxBarThickness: 45

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {
    duration: 1800,
    easing: "easeOutQuart"
},

animations: {
    y: {
        from: 0,
        duration: 1800,
        easing: "easeOutQuart"
    }
},

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    backgroundColor: "#161b29",

                    titleColor: "#ffffff",

                    bodyColor: "#22d3ee",

                    borderColor: "#22d3ee",

                    borderWidth: 1,

                    cornerRadius: 12,

                    padding: 14

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#d1d5db",

                        font: {

                            size: 13,

                            weight: "600"

                        }

                    },

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#d1d5db",

                        precision: 0

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                }

            }

        }

    });

}

// ===============================
// Year Pie Chart
// ===============================

function createYearChart(data) {

    const canvas = document.getElementById("yearChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);

    // Destroy old chart
    if (yearChart) {
        yearChart.destroy();
        yearChart = null;
    }

    yearChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                data: counts,

                backgroundColor: [
                    "#22d3ee",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899"
                ],

                borderColor: "#121523",

                borderWidth: 4,

                hoverOffset: 12

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "68%",

            animation: {

                duration: 2000,

                easing: "easeOutQuart",

                animateRotate: true,

                animateScale: true

            },

            plugins: {

                legend: {

                    position: "right",

                    labels: {

                        color: "#ffffff",

                        padding: 18,

                        usePointStyle: true,

                        pointStyle: "circle",

                        font: {
                            size: 13,
                            weight: "600"
                        }

                    }

                },

                tooltip: {

                    backgroundColor: "#161b29",

                    titleColor: "#ffffff",

                    bodyColor: "#22d3ee",

                    borderColor: "#22d3ee",

                    borderWidth: 1,

                    cornerRadius: 12,

                    padding: 14

                }

            }

        }

    });

}
function updateSummaryCards(departmentStats){

    // Total Departments
    document.getElementById("totalDepartments").textContent =
        departmentStats.length;

    // Total Participants
    const totalParticipants = departmentStats.reduce((sum, dept)=>{

        return sum + dept.count;

    },0);

    document.getElementById("totalParticipants").textContent =
        totalParticipants;

    // Top Department
    let topDepartment = "-";

    let highest = 0;

    departmentStats.forEach(dept=>{

        if(dept.count > highest){

            highest = dept.count;

            topDepartment = dept._id;

        }

    });

    document.getElementById("topDepartment").textContent =
        topDepartment;

    // Average
    const average =
        departmentStats.length
        ? (totalParticipants / departmentStats.length).toFixed(1)
        : 0;

    document.getElementById("averageDepartment").textContent =
        average;

}