
// =====================================
// ATTENDANCE MANAGEMENT JAVASCRIPT
// =====================================


// GET HTML ELEMENTS

const attendanceForm =
    document.getElementById("attendanceForm");

const attendanceEmployee =
    document.getElementById("attendanceEmployee");

const attendanceDate =
    document.getElementById("attendanceDate");

const attendanceStatus =
    document.getElementById("attendanceStatus");

const attendanceTableBody =
    document.getElementById("attendanceTableBody");

const attendanceMessage =
    document.getElementById("attendanceMessage");

const searchAttendance =
    document.getElementById("searchAttendance");


// =====================================
// GET DATA FROM LOCAL STORAGE
// =====================================

let employees = JSON.parse(
    localStorage.getItem("ems_employees") || "[]"
);

let attendanceRecords = JSON.parse(
    localStorage.getItem("ems_attendance") || "[]"
);


// =====================================
// SET TODAY'S DATE
// =====================================

function getTodayDate() {

    const today = new Date();

    const offset = today.getTimezoneOffset();

    return new Date(today.getTime() - offset * 60000)
        .toISOString()
        .split("T")[0];

}

attendanceDate.value = getTodayDate();

attendanceDate.max = getTodayDate();


// =====================================
// LOAD EMPLOYEES INTO DROPDOWN
// =====================================

function loadEmployees() {

    attendanceEmployee.innerHTML =
        '<option value="">Select Employee</option>';

    employees.forEach(function(employee) {

        const option = document.createElement("option");

        option.value = employee.id;

        option.textContent =
            employee.name + " (ID: " + employee.id + ")";

        attendanceEmployee.appendChild(option);

    });

}


// =====================================
// SAVE ATTENDANCE
// =====================================

function saveAttendance() {

    localStorage.setItem(
        "ems_attendance",
        JSON.stringify(attendanceRecords)
    );

}


// =====================================
// MARK ATTENDANCE
// =====================================

attendanceForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const employeeId = attendanceEmployee.value;

    const date = attendanceDate.value;

    const status = attendanceStatus.value;


    // FIND EMPLOYEE

    const employee = employees.find(function(item) {

        return String(item.id) === String(employeeId);

    });


    if (!employee) {

        showAttendanceMessage(
            "Please select an employee.",
            false
        );

        return;

    }


    // CHECK DUPLICATE ATTENDANCE

    const duplicate = attendanceRecords.some(function(record) {

        return String(record.employeeId) === String(employeeId)
            && record.date === date;

    });


    if (duplicate) {

        showAttendanceMessage(
            "Attendance already marked for this employee on this date.",
            false
        );

        return;

    }


    // CREATE ATTENDANCE RECORD

    const newRecord = {

        id: Date.now(),

        employeeId: employee.id,

        employeeName: employee.name,

        date: date,

        status: status

    };


    attendanceRecords.push(newRecord);

    saveAttendance();

    displayAttendance();

    updateSummary();

    attendanceForm.reset();

    attendanceDate.value = getTodayDate();

    showAttendanceMessage(
        "Attendance marked successfully!",
        true
    );

});


// =====================================
// DISPLAY ATTENDANCE RECORDS
// =====================================

function displayAttendance(data = attendanceRecords) {

    attendanceTableBody.innerHTML = "";

    document.getElementById("emptyAttendance").style.display =
        data.length === 0 ? "block" : "none";


    data.forEach(function(record) {

        const row = document.createElement("tr");


        const values = [

            record.employeeId,

            record.employeeName,

            record.date

        ];


        values.forEach(function(value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });


        // STATUS BADGE

        const statusCell = document.createElement("td");

        const badge = document.createElement("span");

        badge.textContent = record.status;

        badge.className =
            "status status-" + record.status.toLowerCase();

        statusCell.appendChild(badge);

        row.appendChild(statusCell);


        // DELETE BUTTON

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            deleteAttendance(record.id);

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        attendanceTableBody.appendChild(row);

    });

}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary() {

    const present = attendanceRecords.filter(
        record => record.status === "Present"
    ).length;

    const absent = attendanceRecords.filter(
        record => record.status === "Absent"
    ).length;

    const leave = attendanceRecords.filter(
        record => record.status === "Leave"
    ).length;


    document.getElementById("totalRecords").textContent =
        attendanceRecords.length;

    document.getElementById("presentCount").textContent =
        present;

    document.getElementById("absentCount").textContent =
        absent;

    document.getElementById("leaveCount").textContent =
        leave;

}


// =====================================
// DELETE ATTENDANCE
// =====================================

function deleteAttendance(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;


    attendanceRecords = attendanceRecords.filter(function(record) {

        return String(record.id) !== String(id);

    });


    saveAttendance();

    displayAttendance();

    updateSummary();

    showAttendanceMessage(
        "Attendance record deleted successfully.",
        true
    );

}


// =====================================
// SEARCH ATTENDANCE
// =====================================

searchAttendance.addEventListener("input", function() {

    const searchText = this.value.toLowerCase().trim();

    const filteredRecords = attendanceRecords.filter(
        function(record) {

            return record.employeeName.toLowerCase()
                .includes(searchText)
                || String(record.employeeId).includes(searchText);

        }
    );

    displayAttendance(filteredRecords);

});


// =====================================
// DISPLAY MESSAGES
// =====================================

function showAttendanceMessage(message, success) {

    attendanceMessage.textContent = message;

    attendanceMessage.className = success
        ? "message success"
        : "message error";

}


// =====================================
// INITIALIZE ATTENDANCE PAGE
// =====================================

loadEmployees();

displayAttendance();

updateSummary();
