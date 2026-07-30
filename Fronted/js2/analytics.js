let departmentChart = null;
let yearChart = null;

async function loadAnalytics() {

    try {

        const response = await fetch("http://localhost:5000/api/analytics");
        const result = await response.json();

        if (!result.success) return;

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

    if (departmentChart) {

        departmentChart.destroy();

    }

    departmentChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels,

            datasets: [{

                label: "Participants",

                data: counts,

                borderRadius: 10,

                backgroundColor: [
                    "#06b6d4",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
                    "#14b8a6",
                    "#6366f1",
                    "#84cc16",
                    "#0ea5e9",
                    "#d946ef"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                },

                x: {

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        display: false

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

    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);

    const ctx = document
        .getElementById("yearChart")
        .getContext("2d");

    if (yearChart) {

        yearChart.destroy();

    }

    yearChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels,

            datasets: [{

                data: counts,

                backgroundColor: [

                    "#06b6d4",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899"

                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#ffffff",

                        padding: 20,

                        font: {

                            size: 14

                        }

                    }

                }

            }

        }

    });

}