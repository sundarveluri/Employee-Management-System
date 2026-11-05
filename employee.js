
// =====================================
// EMPLOYEE MANAGEMENT JAVASCRIPT
// =====================================

const employeeForm = document.getElementById("employeeForm");

const employeeTableBody =
    document.getElementById("employeeTableBody");

const employeeMessage =
    document.getElementById("employeeMessage");

const searchEmployee =
    document.getElementById("searchEmployee");

const emptyMessage =
    document.getElementById("emptyMessage");


// =====================================
// GET EMPLOYEE DATA FROM LOCAL STORAGE
// =====================================

let employees = JSON.parse(
    localStorage.getItem("ems_employees") || "[]"
);


// =====================================
// SAVE EMPLOYEE DATA
// =====================================

function saveEmployees() {

    localStorage.setItem(
        "ems_employees",
        JSON.stringify(employees)
    );

}


// =====================================
// DISPLAY EMPLOYEES
// =====================================

function displayEmployees(data = employees) {

    employeeTableBody.innerHTML = "";

    emptyMessage.style.display =
        data.length === 0 ? "block" : "none";

    data.forEach(function(employee) {

        const row = document.createElement("tr");

        const values = [
            employee.id,
            employee.name,
            employee.email,
            employee.department,
            employee.designation,
            Number(employee.salary).toLocaleString("en-IN"),
            employee.phone
        ];

        values.forEach(function(value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });


        // ACTION BUTTONS

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "action-btn edit-btn";

        editButton.addEventListener("click", function() {

            editEmployee(employee.id);

        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "action-btn delete-btn";

        deleteButton.addEventListener("click", function() {

            deleteEmployee(employee.id);

        });


        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        employeeTableBody.appendChild(row);

    });

}


// =====================================
// ADD OR UPDATE EMPLOYEE
// =====================================

employeeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id =
        document.getElementById("employeeId").value;

    const name =
        document.getElementById("employeeName").value.trim();

    const email =
        document.getElementById("employeeEmail").value.trim();

    const department =
        document.getElementById("employeeDepartment").value;

    const designation =
        document.getElementById("employeeDesignation").value.trim();

    const salary =
        document.getElementById("employeeSalary").value;

    const phone =
        document.getElementById("employeePhone").value.trim();


    // CHECK DUPLICATE EMAIL

    const duplicateEmail = employees.some(function(employee) {

        return employee.email.toLowerCase() === email.toLowerCase()
            && String(employee.id) !== id;

    });

    if (duplicateEmail) {

        showEmployeeMessage("Email already exists.", false);

        return;

    }


    const employeeData = {

        id: id || Date.now(),

        name: name,

        email: email,

        department: department,

        designation: designation,

        salary: Number(salary),

        phone: phone

    };


    if (id) {

        // UPDATE EMPLOYEE

        employees = employees.map(function(employee) {

            return String(employee.id) === id
                ? employeeData
                : employee;

        });

        showEmployeeMessage(
            "Employee updated successfully!",
            true
        );

    } else {

        // ADD EMPLOYEE

        employees.push(employeeData);

        showEmployeeMessage(
            "Employee added successfully!",
            true
        );

    }


    saveEmployees();

    displayEmployees();

    employeeForm.reset();

    resetFormMode();

});


// =====================================
// EDIT EMPLOYEE
// =====================================

function editEmployee(id) {

    const employee = employees.find(function(item) {

        return String(item.id) === String(id);

    });

    if (!employee) return;


    document.getElementById("employeeId").value = employee.id;

    document.getElementById("employeeName").value = employee.name;

    document.getElementById("employeeEmail").value = employee.email;

    document.getElementById("employeeDepartment").value =
        employee.department;

    document.getElementById("employeeDesignation").value =
        employee.designation;

    document.getElementById("employeeSalary").value =
        employee.salary;

    document.getElementById("employeePhone").value =
        employee.phone;


    document.getElementById("formTitle").textContent =
        "Update Employee";

    document.getElementById("submitBtn").textContent =
        "Update Employee";

    document.getElementById("cancelBtn").hidden = false;

    employeeForm.scrollIntoView({ behavior: "smooth" });

}


// =====================================
// DELETE EMPLOYEE
// =====================================

function deleteEmployee(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;


    employees = employees.filter(function(employee) {

        return String(employee.id) !== String(id);

    });


    saveEmployees();

    displayEmployees();

    showEmployeeMessage(
        "Employee deleted successfully!",
        true
    );

}


// =====================================
// CANCEL EDIT
// =====================================

function resetFormMode() {

    document.getElementById("employeeId").value = "";

    document.getElementById("formTitle").textContent =
        "Add New Employee";

    document.getElementById("submitBtn").textContent =
        "Add Employee";

    document.getElementById("cancelBtn").hidden = true;

}


document.getElementById("cancelBtn").addEventListener(
    "click",
    function() {

        employeeForm.reset();

        resetFormMode();

    }
);


// =====================================
// SEARCH EMPLOYEES
// =====================================

searchEmployee.addEventListener("input", function() {

    const searchText = this.value.toLowerCase().trim();

    const filteredEmployees = employees.filter(function(employee) {

        return employee.name.toLowerCase().includes(searchText)
            || employee.email.toLowerCase().includes(searchText)
            || employee.department.toLowerCase().includes(searchText);

    });

    displayEmployees(filteredEmployees);

});


// =====================================
// DISPLAY MESSAGE
// =====================================

function showEmployeeMessage(message, success) {

    employeeMessage.textContent = message;

    employeeMessage.className = success
        ? "message success"
        : "message error";

}


// =====================================
// INITIALIZE EMPLOYEE TABLE
// =====================================

displayEmployees();
