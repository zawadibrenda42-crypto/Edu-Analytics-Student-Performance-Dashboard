/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   table.js
   Handles student results table
   ========================================================= */


/* TABLE SUBJECTS */

const tableSubjects = [
    "Maths",
    "English",
    "Swahili",
    "Chemistry",
    "Biology",
    "Physics",
    "Geography",
    "HomeScience"
];


/* DISPLAY STUDENTS IN TABLE */

function displayStudents(studentList) {

    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) {
        console.error("Student table body was not found.");
        return;
    }


    /* CLEAR EXISTING TABLE DATA */

    tableBody.innerHTML = "";


    /* CHECK IF THERE ARE NO STUDENTS */

    if (studentList.length === 0) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td colspan="14" class="empty-table">
                No student records available.
            </td>
        `;

        tableBody.appendChild(row);

        updateStudentCount(0);

        return;
    }


    /* ADD EACH STUDENT */

    studentList.forEach(function (student) {

        const row = document.createElement("tr");


        /* STUDENT ID */

        const idCell = document.createElement("td");
        idCell.textContent = student.ID || student.id || "";
        row.appendChild(idCell);


        /* STUDENT NAME */

        const nameCell = document.createElement("td");
        nameCell.textContent =
            student.Name ||
            student.name ||
            student["Student Name"] ||
            "";

        row.appendChild(nameCell);


        /* GENDER */

        const genderCell = document.createElement("td");
        genderCell.textContent =
            student.Gender ||
            student.gender ||
            "";

        row.appendChild(genderCell);


        /* SUBJECT SCORES */

        tableSubjects.forEach(function (subject) {

            const subjectCell = document.createElement("td");

            const score = student[subject];

            subjectCell.textContent =
                score !== undefined && score !== ""
                    ? score
                    : "-";

            row.appendChild(subjectCell);

        });


        /* AVERAGE */

        const averageCell = document.createElement("td");

        averageCell.textContent =
            student.average !== undefined
                ? Number(student.average).toFixed(2)
                : "0.00";

        row.appendChild(averageCell);


        /* GRADE */

        const gradeCell = document.createElement("td");

        gradeCell.textContent =
            student.grade || "-";

        row.appendChild(gradeCell);


        /* PERFORMANCE */

        const performanceCell = document.createElement("td");

        performanceCell.textContent =
            student.performance || "-";

        row.appendChild(performanceCell);


        /* ADD ROW TO TABLE */

        tableBody.appendChild(row);

    });


    /* UPDATE STUDENT COUNT */

    updateStudentCount(studentList.length);

}


/* UPDATE STUDENT COUNT */

function updateStudentCount(count) {

    const studentCountElement =
        document.getElementById("studentCount");

    if (!studentCountElement) {
        return;
    }

    studentCountElement.textContent =
        count + (count === 1 ? " student" : " students");

}