/* untuk index.html */

const form = document.getElementById("myForm");
const entries = document.getElementById("entries");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const entry = document.createElement("div");
    entry.classList.add("entry");
    entry.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Subject:</strong> ${subject}<br>
        <strong>Message:</strong> ${message}<br>
        <button class="edit-btn" onclick="editEntry(this)">Edit</button>
        <button class="delete-btn" onclick="deleteEntry(this)">Delete</button>
    `;
    
    entries.appendChild(entry);
    form.reset();
});

function deleteEntry(entry) {
    entry.parentNode.remove();
}

function editEntry(entry) {
    const currentEntry = entry.parentNode;
    const [name, email, subject, message] = currentEntry.innerText.split("\n").filter(line => line.trim() !== "");
    
    form.name.value = name.split(": ")[1];
    form.email.value = email.split(": ")[1];
    form.subject.value = subject.split(": ")[1];
    form.message.value = message.split(": ")[1];

    currentEntry.remove();
}
