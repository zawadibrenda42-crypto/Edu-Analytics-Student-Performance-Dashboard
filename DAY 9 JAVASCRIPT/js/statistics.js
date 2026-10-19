/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   statistics.js
   Handles overall student statistics
   ========================================================= */


/* TOTAL NUMBER OF STUDENTS */

function getTotalStudents(studentList) {

    return studentList.length;
}


/* OVERALL AVERAGE SCORE */

function getOverallAverage(studentList) {

    if (studentList.length === 0) {
        return 0;
    }

    let total = 0;

    studentList.forEach(function (student) {
        total += Number(student.average) || 0;
    });

    return total / studentList.length;
}


/* PASS RATE */

function getPassRate(studentList) {

    if (studentList.length === 0) {
        return 0;
    }

    let passedStudents = 0;

    studentList.forEach(function (student) {

        if (student.result === "Pass") {
            passedStudents++;
        }

    });

    return (passedStudents / studentList.length) * 100;
}


/* FIND TOP STUDENT */

function getTopStudent(studentList) {

    if (studentList.length === 0) {
        return null;
    }

    let topStudent = studentList[0];

    studentList.forEach(function (student) {

        if (Number(student.average) > Number(topStudent.average)) {
            topStudent = student;
        }

    });

    return topStudent;
}


/* GRADE DISTRIBUTION */

function getGradeDistribution(studentList) {

    const grades = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    };

    studentList.forEach(function (student) {

        if (grades.hasOwnProperty(student.grade)) {
            grades[student.grade]++;
        }

    });

    return grades;
}


/* GENDER STATISTICS */

function getGenderStatistics(studentList) {

    const genderStats = {};

    studentList.forEach(function (student) {

        const gender = student.Gender || student.gender;

        if (!gender) {
            return;
        }

        if (!genderStats[gender]) {
            genderStats[gender] = {
                count: 0,
                totalScore: 0
            };
        }

        genderStats[gender].count++;
        genderStats[gender].totalScore += Number(student.average) || 0;

    });


    Object.keys(genderStats).forEach(function (gender) {

        const data = genderStats[gender];

        data.average = data.totalScore / data.count;

    });


    return genderStats;
}