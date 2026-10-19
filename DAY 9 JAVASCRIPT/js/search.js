/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   search.js
   Handles student search by name or ID
   ========================================================= */


/* SEARCH STUDENTS */

function searchStudents(studentList, searchTerm) {

    /* If nothing was typed, return all students */

    if (!searchTerm || searchTerm.trim() === "") {
        return studentList;
    }


    /* Convert search term to lowercase */

    const searchValue = searchTerm
        .toString()
        .trim()
        .toLowerCase();


    /* Find matching students */

    return studentList.filter(function (student) {

        const studentID = (
            student.ID ||
            student.id ||
            ""
        )
        .toString()
        .toLowerCase();


        const studentName = (
            student.Name ||
            student.name ||
            student["Student Name"] ||
            ""
        )
        .toString()
        .toLowerCase();


        return (
            studentID.includes(searchValue) ||
            studentName.includes(searchValue)
        );

    });

}