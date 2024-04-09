const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const btnClosePopup = document.querySelector('.icon-close');
const registerForm = document.querySelector('.form-box.register form');
const loginForm = document.querySelector('.form-box.login form');



// Event listener for register link
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Event listener for login link
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Event listener for login popup button
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Event listener for close popup button
btnClosePopup.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});

// for the login part 
function loginUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userRecords = JSON.parse(localStorage.getItem("users")) || [];

    let userFound = userRecords.some(user => user.email === email && user.password === password);

    if (userFound) {
        alert("Login Successful");
        let currentUser = userRecords.find(user => user.email === email);
        localStorage.setItem("name", currentUser.name);
        localStorage.setItem("email", currentUser.email);

        if (email === "admin" && password === "admin") {
            window.location.href = "dashboard.html?admin=true";
        } else {
            window.location.href = "dashboard.html?admin=false";
        }
        // window.location.href = "dashbord.html"; 
    } else {
        alert("Login Failed");
    }
}

// Registration section
function registerUser() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let user_records = JSON.parse(localStorage.getItem("users")) || [];

    if (user_records.some(v => v.email === email)) {
        alert("Duplicate Data");
    } else {
        user_records.push({
            "name": name,
            "email": email,
            "password": password,
        });
        localStorage.setItem("users", JSON.stringify(user_records));
        alert("Registration Successful");
    }
}