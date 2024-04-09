// newsletter part
let newsLetter = JSON.parse(localStorage.getItem("newsLetter")) || [];
const emailList = document.getElementById("emailList");

function displayEmails() {
    emailList.innerHTML = ""; // Clear previous list

    // go through emails and create list items
    newsLetter.forEach((emailObject, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${emailObject.email}</span>
        <button onclick="editEmail(${index})">Edit</button>
        <button onclick="deleteEmail(${index})">Delete</button>
    `;

        emailList.appendChild(li); // Append list item to emailList
    });
}

function editEmail(index) {
    const newEmail = prompt("Enter new email:", newsLetter[index].email);

    // If user provides a new email and confirms, update the email in the list
    if (newEmail !== null) {
        newsLetter[index].email = newEmail;
        localStorage.setItem("newsLetter", JSON.stringify(newsLetter));
        displayEmails();
        location.reload();

    }
}

//function to delete and email
function deleteEmail(index) {
    const confirmDelete = confirm("Are you sure you want to delete this email?");

    if (confirmDelete) {
        newsLetter.splice(index, 1);
        localStorage.setItem("newsLetter", JSON.stringify(newsLetter));
        displayEmails();
        location.reload();
    }
}
displayEmails();



  // Retrieve query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin');

  // Check if user is admin and display admin content
  if (isAdmin === "true") {
    document.getElementById("admin-content").style.display = "flex";
} else {
    document.getElementById("admin-content").style.display = "none";
};
