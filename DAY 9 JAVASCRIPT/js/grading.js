/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   grading.js
   Handles averages, grades, pass/fail and performance
   ========================================================= */


/* SUBJECTS */

const gradingSubjects = [
    "Maths",
    "English",
    "Swahili",
    "Chemistry",
    "Biology",
    "Physics",
    "Geography",
    "HomeScience"
];


/* CALCULATE STUDENT AVERAGE */

function calculateAverage(student) {
    let total = 0;
    let count = 0;

    gradingSubjects.forEach(function (subject) {
        const score = Number(student[subject]);

        if (!isNaN(score)) {
            total += score;
            count++;
        }
    });

    if (count === 0) {
        return 0;
    }

    return total / count;
}


/* ASSIGN GRADE */

function calculateGrade(average) {

    if (average >= 80) {
        return "A";
    } 
    else if (average >= 70) {
        return "B";
    } 
    else if (average >= 60) {
        return "C";
    } 
    else if (average >= 50) {
        return "D";
    } 
    else {
        return "E";
    }
}


/* DETERMINE PASS OR FAIL */

function calculateResult(average) {

    if (average >= 50) {
        return "Pass";
    } 
    else {
        return "Fail";
    }
}


/* DETERMINE PERFORMANCE LEVEL */

function calculatePerformance(average) {

    if (average >= 80) {
        return "Excellent";
    } 
    else if (average >= 70) {
        return "Very Good";
    } 
    else if (average >= 60) {
        return "Good";
    } 
    else if (average >= 50) {
        return "Average";
    } 
    else {
        return "Needs Improvement";
    }
}


/* ADD CALCULATED RESULTS TO A STUDENT */

function processStudent(student) {

    const average = calculateAverage(student);

    student.average = Number(average.toFixed(2));
    student.grade = calculateGrade(average);
    student.result = calculateResult(average);
    student.performance = calculatePerformance(average);

    return student;
}


/* PROCESS ALL STUDENTS */

function processAllStudents(studentList) {

    return studentList.map(function (student) {
        return processStudent(student);
    });
}