/* =========================================================
   EDUANALYTICS
   PROFESSIONAL PERFORMANCE VISUALIZATIONS
   charts.js
   ========================================================= */


/* =========================================================
   CHART INSTANCES
   ========================================================= */

let subjectChart = null;
let subjectProfileChart = null;
let genderChart = null;
let gradeChart = null;
let scoreChart = null;


/* =========================================================
   COLOR PALETTE
   ========================================================= */

const chartColors = {

    navy: "#173B68",
    navyDark: "#102744",

    ocean: "#2E73B9",
    blue: "#438FD3",
    sky: "#74B3E7",

    purple: "#8176CC",
    lavender: "#A59CE0",

    pink: "#C994B9",
    softPink: "#E1B8D1",

    teal: "#5A9EAB",

    text: "#40536B",
    grid: "rgba(33, 70, 110, 0.08)"

};


/* =========================================================
   SHARED CHART OPTIONS
   ========================================================= */

const commonChartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    animation: {
        duration: 750,
        easing: "easeOutQuart"
    },

    plugins: {

        legend: {
            labels: {
                color: chartColors.text,
                usePointStyle: true,
                pointStyle: "circle",
                padding: 18,
                font: {
                    size: 11,
                    family: "Arial"
                }
            }
        },

        tooltip: {

            backgroundColor: chartColors.navyDark,

            titleColor: "#FFFFFF",

            bodyColor: "#E8F2FF",

            padding: 12,

            cornerRadius: 9,

            displayColors: true

        }

    }

};


/* =========================================================
   DESTROY EXISTING CHART
   ========================================================= */

function destroyChart(chart) {

    if (chart) {
        chart.destroy();
    }

}


/* =========================================================
   CALCULATE SUBJECT AVERAGES
   ========================================================= */

function getSubjectAverages(studentList) {

    const subjectAverages = {};

    subjects.forEach(function (subject) {

        let total = 0;
        let count = 0;

        studentList.forEach(function (student) {

            const rawScore = student[subject];

            if (
                rawScore === "" ||
                rawScore === null ||
                rawScore === undefined
            ) {
                return;
            }

            const score = Number(rawScore);

            if (Number.isFinite(score)) {
                total += score;
                count++;
            }

        });

        subjectAverages[subject] =
            count > 0
                ? Number((total / count).toFixed(2))
                : 0;

    });

    return subjectAverages;

}


/* =========================================================
   SUBJECT PERFORMANCE BAR CHART
   ========================================================= */

function createSubjectPerformanceChart(studentList) {

    const canvas =
        document.getElementById("subjectPerformanceChart");

    if (!canvas) {
        return;
    }

    const averages = getSubjectAverages(studentList);

    const subjectEntries = subjects.map(function (subject) {

        return {
            subject: subject,
            average: averages[subject]
        };

    });

    subjectEntries.sort(function (a, b) {
        return b.average - a.average;
    });

    const labels = subjectEntries.map(function (item) {
        return item.subject;
    });

    const values = subjectEntries.map(function (item) {
        return item.average;
    });

    const barColors = [
        chartColors.navy,
        chartColors.ocean,
        chartColors.blue,
        chartColors.sky,
        chartColors.teal,
        chartColors.purple,
        chartColors.lavender,
        chartColors.pink
    ];

    destroyChart(subjectChart);

    subjectChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Average Score",

                data: values,

                backgroundColor: barColors,

                borderRadius: 7,

                borderSkipped: false,

                barThickness: 16

            }]

        },

        options: {

            ...commonChartOptions,

            indexAxis: "y",

            plugins: {

                ...commonChartOptions.plugins,

                legend: {
                    display: false
                },

                tooltip: {

                    ...commonChartOptions.plugins.tooltip,

                    callbacks: {

                        label: function (context) {
                            return "Average: " +
                                context.parsed.x.toFixed(2) + "%";
                        }

                    }

                }

            },

            scales: {

                x: {

                    beginAtZero: true,

                    max: 100,

                    grid: {
                        color: chartColors.grid
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: chartColors.text,

                        callback: function (value) {
                            return value + "%";
                        }

                    }

                },

                y: {

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: chartColors.text,
                        font: {
                            size: 11
                        }
                    }

                }

            }

        }

    });

}


/* =========================================================
   SUBJECT PERFORMANCE PROFILE — LINE GRAPH
   ========================================================= */

function createSubjectProfileChart(studentList) {

    const canvas =
        document.getElementById("subjectProfileChart");

    if (!canvas) {
        return;
    }

    const averages = getSubjectAverages(studentList);

    const values = subjects.map(function (subject) {
        return averages[subject];
    });

    destroyChart(subjectProfileChart);

    const context = canvas.getContext("2d");

    const gradient = context.createLinearGradient(
        0, 0, 0, 280
    );

    gradient.addColorStop(
        0,
        "rgba(129, 118, 204, 0.24)"
    );

    gradient.addColorStop(
        1,
        "rgba(129, 118, 204, 0.01)"
    );

    subjectProfileChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: subjects,

            datasets: [{

                label: "Average Score",

                data: values,

                borderColor: chartColors.purple,

                backgroundColor: gradient,

                borderWidth: 3,

                fill: true,

                tension: 0.35,

                pointRadius: 4,

                pointHoverRadius: 6,

                pointBackgroundColor: chartColors.navy,

                pointBorderColor: "#FFFFFF",

                pointBorderWidth: 2

            }]

        },

        options: {

            ...commonChartOptions,

            plugins: {

                ...commonChartOptions.plugins,

                legend: {
                    display: false
                },

                tooltip: {

                    ...commonChartOptions.plugins.tooltip,

                    callbacks: {

                        label: function (context) {
                            return "Average: " +
                                context.parsed.y.toFixed(2) + "%";
                        }

                    }

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    grid: {
                        color: chartColors.grid
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: chartColors.text,

                        callback: function (value) {
                            return value + "%";
                        }

                    }

                },

                x: {

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: chartColors.text,

                        maxRotation: 45,

                        minRotation: 30,

                        font: {
                            size: 10
                        }

                    }

                }

            }

        }

    });

}


/* =========================================================
   GENDER PERFORMANCE CHART
   ========================================================= */

function createGenderPerformanceChart(studentList) {

    const canvas =
        document.getElementById("genderPerformanceChart");

    if (!canvas) {
        return;
    }

    const genderData = {};

    studentList.forEach(function (student) {

        const gender =
            student.Gender ||
            student.gender ||
            "Unknown";

        if (!genderData[gender]) {

            genderData[gender] = {
                total: 0,
                count: 0
            };

        }

        genderData[gender].total +=
            Number(student.average) || 0;

        genderData[gender].count++;

    });

    const labels = Object.keys(genderData);

    const averages = labels.map(function (gender) {

        return Number(
            (
                genderData[gender].total /
                genderData[gender].count
            ).toFixed(2)
        );

    });

    const colors = labels.map(function (gender) {

        if (gender.toLowerCase() === "male") {
            return chartColors.navy;
        }

        if (gender.toLowerCase() === "female") {
            return chartColors.lavender;
        }

        return chartColors.sky;

    });

    destroyChart(genderChart);

    genderChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Average Score",

                data: averages,

                backgroundColor: colors,

                borderRadius: 10,

                borderSkipped: false,

                maxBarThickness: 85

            }]

        },

        options: {

            ...commonChartOptions,

            plugins: {

                ...commonChartOptions.plugins,

                legend: {
                    display: false
                },

                tooltip: {

                    ...commonChartOptions.plugins.tooltip,

                    callbacks: {

                        label: function (context) {
                            return "Average: " +
                                context.parsed.y.toFixed(2) + "%";
                        }

                    }

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    grid: {
                        color: chartColors.grid
                    },

                    border: {
                        display: false
                    },

                    ticks: {

                        color: chartColors.text,

                        callback: function (value) {
                            return value + "%";
                        }

                    }

                },

                x: {

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: chartColors.text
                    }

                }

            }

        }

    });

}


/* =========================================================
   GRADE DISTRIBUTION — DOUGHNUT CHART
   ========================================================= */

function createGradeDistributionChart(studentList) {

    const canvas =
        document.getElementById("gradeDistributionChart");

    if (!canvas) {
        return;
    }

    const gradeCounts = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    };

    studentList.forEach(function (student) {

        const grade = student.grade;

        if (
            Object.prototype.hasOwnProperty.call(
                gradeCounts,
                grade
            )
        ) {
            gradeCounts[grade]++;
        }

    });

    destroyChart(gradeChart);

    gradeChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [
                "A — Excellent",
                "B — Very Good",
                "C — Good",
                "D — Fair",
                "E — Needs Improvement"
            ],

            datasets: [{

                label: "Students",

                data: [
                    gradeCounts.A,
                    gradeCounts.B,
                    gradeCounts.C,
                    gradeCounts.D,
                    gradeCounts.E
                ],

                backgroundColor: [
                    chartColors.navy,
                    chartColors.ocean,
                    chartColors.purple,
                    chartColors.pink,
                    chartColors.softPink
                ],

                borderColor: "#FFFFFF",

                borderWidth: 3,

                hoverOffset: 7,

                spacing: 2

            }]

        },

        options: {

            ...commonChartOptions,

            cutout: "70%",

            plugins: {

                ...commonChartOptions.plugins,

                legend: {

                    position: "bottom",

                    labels: {

                        color: chartColors.text,

                        usePointStyle: true,

                        pointStyle: "circle",

                        padding: 13,

                        boxWidth: 9,

                        font: {
                            size: 10
                        }

                    }

                },

                tooltip: {

                    ...commonChartOptions.plugins.tooltip,

                    callbacks: {

                        label: function (context) {

                            const count = context.raw;

                            const total =
                                context.dataset.data.reduce(
                                    function (sum, value) {
                                        return sum + value;
                                    },
                                    0
                                );

                            const percentage =
                                total > 0
                                    ? ((count / total) * 100).toFixed(1)
                                    : "0.0";

                            return count + " students (" +
                                percentage + "%)";

                        }

                    }

                }

            }

        }

    });

}


/* =========================================================
   SCORE DISTRIBUTION
   ========================================================= */

function createScoreDistributionChart(studentList) {

    const canvas =
        document.getElementById("scoreDistributionChart");

    if (!canvas) {
        return;
    }

    const ranges = {
        "0-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70-79": 0,
        "80-89": 0,
        "90-100": 0
    };

    studentList.forEach(function (student) {

        const score = Number(student.average);

        if (!Number.isFinite(score)) {
            return;
        }

        if (score < 50) {
            ranges["0-49"]++;
        }

        else if (score < 60) {
            ranges["50-59"]++;
        }

        else if (score < 70) {
            ranges["60-69"]++;
        }

        else if (score < 80) {
            ranges["70-79"]++;
        }

        else if (score < 90) {
            ranges["80-89"]++;
        }

        else {
            ranges["90-100"]++;
        }

    });

    destroyChart(scoreChart);

    scoreChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: Object.keys(ranges),

            datasets: [{

                label: "Number of Students",

                data: Object.values(ranges),

                backgroundColor: [
                    chartColors.softPink,
                    chartColors.pink,
                    chartColors.lavender,
                    chartColors.purple,
                    chartColors.blue,
                    chartColors.navy
                ],

                borderRadius: 8,

                borderSkipped: false,

                maxBarThickness: 75

            }]

        },

        options: {

            ...commonChartOptions,

            plugins: {

                ...commonChartOptions.plugins,

                legend: {
                    display: false
                },

                tooltip: {

                    ...commonChartOptions.plugins.tooltip,

                    callbacks: {

                        label: function (context) {
                            return context.parsed.y +
                                " students";
                        }

                    }

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0,

                        color: chartColors.text

                    },

                    grid: {
                        color: chartColors.grid
                    },

                    border: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: "Number of Students",
                        color: chartColors.text
                    }

                },

                x: {

                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: chartColors.text
                    },

                    title: {
                        display: true,
                        text: "Average Score Range",
                        color: chartColors.text
                    }

                }

            }

        }

    });

}


/* =========================================================
   CREATE ALL CHARTS
   ========================================================= */

function createAllCharts(studentList) {

    createSubjectPerformanceChart(studentList);

    createSubjectProfileChart(studentList);

    createGenderPerformanceChart(studentList);

    createGradeDistributionChart(studentList);

    createScoreDistributionChart(studentList);

}