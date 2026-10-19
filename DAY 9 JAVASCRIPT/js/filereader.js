/* =========================================================
   STUDENT PERFORMANCE ANALYSIS SYSTEM
   fileReader.js
   Handles CSV and Excel file reading
   ========================================================= */


/* READ SELECTED FILE */

function readStudentFile(file) {

    return new Promise(function (resolve, reject) {

        if (!file) {
            reject(new Error("No file was selected."));
            return;
        }


        const fileName = file.name.toLowerCase();


        /* CHECK FILE TYPE */

        if (fileName.endsWith(".csv")) {

            readCSVFile(file)
                .then(resolve)
                .catch(reject);

        }

        else if (
            fileName.endsWith(".xlsx") ||
            fileName.endsWith(".xls")
        ) {

            readExcelFile(file)
                .then(resolve)
                .catch(reject);

        }

        else {

            reject(
                new Error(
                    "Unsupported file type. Please upload a CSV or Excel file."
                )
            );

        }

    });

}


/* READ CSV FILE */

function readCSVFile(file) {

    return new Promise(function (resolve, reject) {

        const reader = new FileReader();


        reader.onload = function (event) {

            try {

                const text = event.target.result;

                const students = parseCSV(text);

                resolve(students);

            }

            catch (error) {

                reject(
                    new Error(
                        "There was a problem reading the CSV file."
                    )
                );

            }

        };


        reader.onerror = function () {

            reject(
                new Error(
                    "The CSV file could not be read."
                )
            );

        };


        reader.readAsText(file);

    });

}


/* PARSE CSV DATA */

function parseCSV(csvText) {

    const lines = csvText
        .trim()
        .split(/\r?\n/);


    if (lines.length < 2) {
        return [];
    }


    /* GET HEADERS */

    const headers = lines[0]
        .split(",")
        .map(function (header) {
            return header.trim();
        });


    const students = [];


    /* READ EACH STUDENT */

    for (let i = 1; i < lines.length; i++) {

        if (lines[i].trim() === "") {
            continue;
        }


        const values = lines[i]
            .split(",")
            .map(function (value) {
                return value.trim();
            });


        const student = {};


        headers.forEach(function (header, index) {

            student[header] =
                values[index] !== undefined
                    ? values[index]
                    : "";

        });


        students.push(student);

    }


    return students;

}


/* READ EXCEL FILE */

function readExcelFile(file) {

    return new Promise(function (resolve, reject) {

        if (typeof XLSX === "undefined") {

            reject(
                new Error(
                    "Excel reader is not available. Please make sure the SheetJS library is connected."
                )
            );

            return;
        }


        const reader = new FileReader();


        reader.onload = function (event) {

            try {

                const data = new Uint8Array(
                    event.target.result
                );


                const workbook = XLSX.read(
                    data,
                    {
                        type: "array"
                    }
                );


                const firstSheetName =
                    workbook.SheetNames[0];


                const worksheet =
                    workbook.Sheets[firstSheetName];


                const students =
                    XLSX.utils.sheet_to_json(
                        worksheet,
                        {
                            defval: ""
                        }
                    );


                resolve(students);

            }

            catch (error) {

                reject(
                    new Error(
                        "There was a problem reading the Excel file."
                    )
                );

            }

        };


        reader.onerror = function () {

            reject(
                new Error(
                    "The Excel file could not be read."
                )
            );

        };


        reader.readAsArrayBuffer(file);

    });

}