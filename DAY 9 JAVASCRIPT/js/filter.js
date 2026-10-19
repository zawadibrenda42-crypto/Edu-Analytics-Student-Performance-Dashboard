/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   filter.js
   Handles student filters
   ========================================================= */


/* FILTER STUDENTS */

function filterStudents(studentList, filters) {

    return studentList.filter(function (student) {

        /* SUBJECT FILTER */

        if (
            filters.subject &&
            filters.subject !== "all"
        ) {

            const subjectScore = student[filters.subject];

            if (
                subjectScore === undefined ||
                subjectScore === ""
            ) {
                return false;
            }
        }


        /* GENDER FILTER */

        if (
            filters.gender &&
            filters.gender !== "all"
        ) {

            const studentGender =
                student.Gender ||
                student.gender ||
                "";

            if (
                studentGender.toLowerCase() !==
                filters.gender.toLowerCase()
            ) {
                return false;
            }
        }


        /* GRADE FILTER */

        if (
            filters.grade &&
            filters.grade !== "all"
        ) {

            if (student.grade !== filters.grade) {
                return false;
            }
        }


        /* ALL FILTERS PASSED */

        return true;

    });

}