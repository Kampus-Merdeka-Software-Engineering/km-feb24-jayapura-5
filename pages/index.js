const form = document.getElementById("myForm");
const entries = document.getElementById("entries");
let editIndex = -1;

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const entry = {
        name,
        email,
        subject,
        message
    };

    if (editIndex === -1) {
        addEntry(entry);
    } else {
        updateEntry(entry);
    }

    form.reset();
    editIndex = -1;
});

function addEntry(entry) {
    const entryElement = document.createElement("div");
    entryElement.classList.add("entry");
    entryElement.innerHTML = `
        <strong>Name:</strong> ${entry.name}<br>
        <strong>Email:</strong> ${entry.email}<br>
        <strong>Subject:</strong> ${entry.subject}<br>
        <strong>Message:</strong> ${entry.message}<br>
        <button class="edit-btn" onclick="editEntry(this)">Edit</button>
        <button class="delete-btn" onclick="deleteEntry(this)">Delete</button>
    `;
    
    entries.appendChild(entryElement);
}

function deleteEntry(entryButton) {
    entryButton.parentNode.remove();
}

function editEntry(entryButton) {
    const entryElement = entryButton.parentNode;
    const [name, email, subject, message] = entryElement.innerText.split("\n").filter(line => line.trim() !== "").map(line => line.split(": ")[1]);
    
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("subject").value = subject;
    document.getElementById("message").value = message;

    editIndex = Array.from(entries.children).indexOf(entryElement);
    entryElement.remove();
}

function updateEntry(entry) {
    const entryElement = document.createElement("div");
    entryElement.classList.add("entry");
    entryElement.innerHTML = `
        <strong>Name:</strong> ${entry.name}<br>
        <strong>Email:</strong> ${entry.email}<br>
        <strong>Subject:</strong> ${entry.subject}<br>
        <strong>Message:</strong> ${entry.message}<br>
        <button class="edit-btn" onclick="editEntry(this)">Edit</button>
        <button class="delete-btn" onclick="deleteEntry(this)">Delete</button>
    `;
    
    entries.appendChild(entryElement);
}
