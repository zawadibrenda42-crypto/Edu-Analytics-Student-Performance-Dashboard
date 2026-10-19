/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   app.js
   Main Application Controller
   ========================================================= */

let students = [];
let displayedStudents = [];

const subjects = [
    "Maths",
    "English",
    "Swahili",
    "Chemistry",
    "Biology",
    "Physics",
    "Geography",
    "HomeScience"
];

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const fileInput = document.getElementById("fileInput");
const fileNameElement = document.getElementById("fileName");

const totalStudentsElement = document.getElementById("totalStudents");
const averageScoreElement = document.getElementById("averageScore");
const passRateElement = document.getElementById("passRate");
const topStudentElement = document.getElementById("topStudent");

const studentSearch = document.getElementById("studentSearch");
const subjectFilter = document.getElementById("subjectFilter");
const genderFilter = document.getElementById("genderFilter");
const gradeFilter = document.getElementById("gradeFilter");
const resetFiltersButton = document.getElementById("resetFiltersBtn");

const exportReportButton = document.getElementById("exportReportBtn");
const exportCSVButton = document.getElementById("exportCSVBtn");
const exportExcelButton = document.getElementById("exportExcelBtn");
const exportPDFButton = document.getElementById("exportPDFBtn");


/* =========================================================
   INITIALIZE DASHBOARD
   ========================================================= */

function initializeDashboard() {
    students = [];
    displayedStudents = [];

    updateDashboard();

    console.log("Student Performance Analysis System loaded successfully.");
    console.log("Available subjects:", subjects);
}


/* =========================================================
   UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

    updateDisplayedStudents();

    updateSummaryCards();

    if (typeof createAllCharts === "function") {
        createAllCharts(displayedStudents);
    }
}


/* =========================================================
   APPLY SEARCH AND FILTERS
   ========================================================= */

function updateDisplayedStudents() {

    let results = students;

    /* Search */
    if (typeof searchStudents === "function" && studentSearch) {
        results = searchStudents(
            results,
            studentSearch.value
        );
    }

    /* Filters */
    if (typeof filterStudents === "function") {

        const filters = {
            subject: subjectFilter ? subjectFilter.value : "all",
            gender: genderFilter ? genderFilter.value : "all",
            grade: gradeFilter ? gradeFilter.value : "all"
        };

        results = filterStudents(results, filters);
    }

    displayedStudents = results;

    /* Update table */
    if (typeof displayStudents === "function") {
        displayStudents(displayedStudents);
    }
}


/* =========================================================
   UPDATE SUMMARY CARDS
   ========================================================= */

function updateSummaryCards() {

    const total = typeof getTotalStudents === "function"
        ? getTotalStudents(displayedStudents)
        : displayedStudents.length;

    const average = typeof getOverallAverage === "function"
        ? getOverallAverage(displayedStudents)
        : 0;

    const passRate = typeof getPassRate === "function"
        ? getPassRate(displayedStudents)
        : 0;

    const topStudent = typeof getTopStudent === "function"
        ? getTopStudent(displayedStudents)
        : null;


    if (totalStudentsElement) {
        totalStudentsElement.textContent = total;
    }

    if (averageScoreElement) {
        averageScoreElement.textContent =
            Number(average).toFixed(2) + "%";
    }

    if (passRateElement) {
        passRateElement.textContent =
            Number(passRate).toFixed(2) + "%";
    }

    if (topStudentElement) {

        if (topStudent) {

            const name =
                topStudent.Name ||
                topStudent.name ||
                topStudent["Student Name"] ||
                "Unknown Student";

            topStudentElement.textContent = name;

        } else {

            topStudentElement.textContent = "---";
        }
    }
}


/* =========================================================
   FILE UPLOAD
   ========================================================= */

if (fileInput) {

    fileInput.addEventListener("change", function () {

        if (!fileInput.files || fileInput.files.length === 0) {

            if (fileNameElement) {
                fileNameElement.textContent = "No file selected";
            }

            return;
        }

        const selectedFile = fileInput.files[0];

        if (fileNameElement) {
            fileNameElement.textContent = selectedFile.name;
        }

        console.log("Reading file:", selectedFile.name);


        if (typeof readStudentFile !== "function") {

            alert(
                "The file reader is not available. Please check filereader.js."
            );

            return;
        }


        readStudentFile(selectedFile)

            .then(function (studentData) {

                if (!studentData || studentData.length === 0) {

                    alert(
                        "No student records were found in the selected file."
                    );

                    return;
                }


                console.log(
                    "File read successfully:",
                    studentData.length,
                    "records"
                );


                /* Process grades and performance */
                if (typeof processAllStudents === "function") {

                    students = processAllStudents(studentData);

                } else {

                    alert(
                        "The grading system is not available. Please check grading.js."
                    );

                    return;
                }


                console.log(
                    "Student data processed successfully:",
                    students
                );


                /* Refresh entire dashboard */
                updateDashboard();

            })

            .catch(function (error) {

                console.error("File error:", error);

                alert(
                    error.message ||
                    "There was a problem loading the student file."
                );
            });
    });
}


/* =========================================================
   SEARCH
   ========================================================= */

if (studentSearch) {

    studentSearch.addEventListener("input", function () {

        updateDashboard();
    });
}


/* =========================================================
   FILTERS
   ========================================================= */

if (subjectFilter) {

    subjectFilter.addEventListener("change", function () {

        updateDashboard();
    });
}


if (genderFilter) {

    genderFilter.addEventListener("change", function () {

        updateDashboard();
    });
}


if (gradeFilter) {

    gradeFilter.addEventListener("change", function () {

        updateDashboard();
    });
}


/* =========================================================
   RESET FILTERS
   ========================================================= */

if (resetFiltersButton) {

    resetFiltersButton.addEventListener("click", function () {

        if (studentSearch) {
            studentSearch.value = "";
        }

        if (subjectFilter) {
            subjectFilter.value = "all";
        }

        if (genderFilter) {
            genderFilter.value = "all";
        }

        if (gradeFilter) {
            gradeFilter.value = "all";
        }

        updateDashboard();

        console.log("Filters have been reset.");
    });
}


/* =========================================================
   EXPORT REPORT
   ========================================================= */

if (exportReportButton) {

    exportReportButton.addEventListener("click", function () {

        if (typeof exportToCSV === "function") {

            exportToCSV(displayedStudents);

        } else {

            alert("CSV export is not available.");
        }
    });
}


/* =========================================================
   EXPORT CSV
   ========================================================= */

if (exportCSVButton) {

    exportCSVButton.addEventListener("click", function () {

        if (typeof exportToCSV === "function") {

            exportToCSV(displayedStudents);

        } else {

            alert("CSV export is not available.");
        }
    });
}


/* =========================================================
   EXPORT EXCEL
   ========================================================= */

if (exportExcelButton) {

    exportExcelButton.addEventListener("click", function () {

        if (typeof exportToExcel === "function") {

            exportToExcel(displayedStudents);

        } else {

            alert("Excel export is not available.");
        }
    });
}


/* =========================================================
   EXPORT PDF
   ========================================================= */

if (exportPDFButton) {

    exportPDFButton.addEventListener("click", function () {

        if (typeof exportToPDF === "function") {

            exportToPDF(displayedStudents);

        } else {

            alert("PDF export is not available.");
        }
    });
}


/* =========================================================
   START APPLICATION
   ========================================================= */

initializeDashboard();