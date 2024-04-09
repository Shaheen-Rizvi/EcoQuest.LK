const slpData = {
    "h21": "",
    "h22": "",
    "h23": "",
    "h24": "",
    "h25": "",

    "p1": "",
    "p2": "",
    "p3": "",
    "p4": "",
    "p5": "",
    "p6": "",
    "p7": "",
    "p8": "",
    "p9": "",
    "p10": "",
};

function loadPageData() {
    fetch('Srilankan_leopard.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(slpData, data);
            updatePageContent();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updatePageContent() {
    const storedData = localStorage.getItem('slpData');
    if (storedData) {
        Object.assign(slpData, JSON.parse(storedData));
    }
    document.querySelectorAll('[x-text]').forEach(element => {
        const key = element.getAttribute('x-text');
        element.innerText = slpData[key];
    });
}

function openPopup() {
    const popup = window.open("", "Edit Content", "width=900,height=700,toolbar=no");
    popup.document.write(`
        <html>
        <head>
            <title><u>Edit Content</u></title>
            <style>
                body { font-family: Arial, sans-serif; font-size: 25px; }
                .container { max-width: 600px; margin: 20px auto; padding: 20px; }
                label { display: block; margin-bottom: 10px; }
                textarea { width: 100%; height: 400px; margin-bottom: 20px; }
                button { padding: 10px 20px; background-color: #3adb37; color: #fff; border: none; border-radius: 5px; cursor: pointer; }
                button:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Edit Content</h1>
                <label for="editableContent">Content:</label>
                <textarea id="editableContent">${JSON.stringify(slpData, null, 2)}</textarea>
                <button onclick="saveContent()">Save Changes</button>
            </div>
            <script>
                function saveContent() {
                    const editedContent = JSON.parse(document.getElementById("editableContent").value);
                    localStorage.setItem('slpData', JSON.stringify(editedContent));
                    window.opener.location.reload(); // Refresh the page
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
}

window.onload = function () {
    loadPageData();
    const userDetailsJSON = localStorage.getItem('userDetails');
    const editButton = document.getElementById('editContentButton');
    if (userDetailsJSON) {
        editButton.style.display = 'block'; // Show the button for authenticated users
        editButton.addEventListener('click', openPopup);
    } else {
        editButton.style.display = 'none'; // Hide the button for unauthenticated users
    }
};