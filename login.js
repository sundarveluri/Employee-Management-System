
// =====================================
// EMPLOYEE MANAGEMENT SYSTEM
// LOGIN AND REGISTRATION JAVASCRIPT
// =====================================

// GET HTML ELEMENTS

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginFormElement =
    document.getElementById("loginFormElement");

const registerFormElement =
    document.getElementById("registerFormElement");


// =====================================
// SWITCH BETWEEN LOGIN AND REGISTER
// =====================================

showRegister.addEventListener("click", function(event) {

    event.preventDefault();

    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

});

showLogin.addEventListener("click", function(event) {

    event.preventDefault();

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

});


// =====================================
// SHOW OR HIDE PASSWORD
// =====================================

function togglePassword(inputId) {

    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";

    }

}


// =====================================
// REGISTRATION FUNCTION
// =====================================

registerFormElement.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim().toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("registerMessage");


    // CHECK PASSWORD

    if (password !== confirmPassword) {

        showMessage(message, "Passwords do not match", false);

        return;

    }


    // GET EXISTING USERS

    const users = JSON.parse(
        localStorage.getItem("ems_users") || "[]"
    );


    // CHECK EXISTING EMAIL

    const existingUser = users.find(function(user) {

        return user.email === email;

    });


    if (existingUser) {

        showMessage(message, "Email already registered", false);

        return;

    }


    // CREATE NEW USER

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        // Demo only: do not store plaintext passwords in production.
        password: password

    };


    // SAVE USER

    users.push(newUser);

    localStorage.setItem("ems_users", JSON.stringify(users));


    showMessage(
        message,
        "Registration successful! Please login.",
        true
    );


    registerFormElement.reset();

});


// =====================================
// LOGIN FUNCTION
// =====================================

loginFormElement.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim().toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    // GET REGISTERED USERS

    const users = JSON.parse(
        localStorage.getItem("ems_users") || "[]"
    );


    // CHECK LOGIN DETAILS

    const validUser = users.find(function(user) {

        return user.email === email &&
               user.password === password;

    });


    if (!validUser) {

        showMessage(
            message,
            "Invalid email or password",
            false
        );

        return;

    }


    // SAVE CURRENT LOGIN USER

    const currentUser = {

        id: validUser.id,

        name: validUser.name,

        email: validUser.email

    };

    localStorage.setItem(
        "ems_currentUser",
        JSON.stringify(currentUser)
    );


    showMessage(message, "Login successful!", true);


    // OPEN DASHBOARD

    setTimeout(function() {

        window.location.href = "index.html";

    }, 700);

});


// =====================================
// DISPLAY SUCCESS AND ERROR MESSAGES
// =====================================

function showMessage(element, message, success) {

    element.textContent = message;

    element.className = success
        ? "message success"
        : "message error";

}
