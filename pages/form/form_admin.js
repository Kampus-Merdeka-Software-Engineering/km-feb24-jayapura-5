var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    komentar = document.getElementById("komentar"),
    pDate = document.getElementById("pDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modalElement = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser"),
    filterInput = document.getElementById('filterInput'),
    sortSelect = document.getElementById('sortSelect');

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let filteredData = [...getData];

let isEdit = false, editId;

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "/asset/image/user.jpg";
    form.reset();
});

file.onchange = function () {
    if (file.files[0].size < 1000000) {
        const fileReader = new FileReader();
       fileReader.onload = function (e) {
                imgInput.src = e.target.result;
                imgInput.style.display = 'block';
            };
            fileReader.readAsDataURL(file.files[0]);
        } else {
            alert("This file is too large!");
        }
    };

filterInput.addEventListener('input', () => {
    const filterText = filterInput.value.toLowerCase();
    filteredData = getData.filter(item => item.employeeName.toLowerCase().includes(filterText));
    showInfo();
});

sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    switch (sortValue) {
        case "name-asc":
            filteredData.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
            break;
        case "name-desc":
            filteredData.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
            break;
        case "age-asc":
            filteredData.sort((a, b) => a.employeeAge - b.employeeAge);
            break;
        case "age-desc":
            filteredData.sort((a, b) => b.employeeAge - a.employeeAge);
            break;
        case "city":
            filteredData.sort((a, b) => a.employeeCity.localeCompare(b.employeeCity));
            break; 
    }
    showInfo();
});

/* Fungsi validatePhoneLength untuk memvalidasi panjang nomor telepon */
function validatePhoneLength() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value;

    if (phoneValue.length < 11 || phoneValue.length > 12) {
        phoneInput.setCustomValidity('Nomor telepon harus memiliki panjang antara 11 dan 12 digit.');
    } else {
        phoneInput.setCustomValidity('');
    }
}

/* Event listener untuk validasi langsung pada input nomor telepon */
phone.addEventListener('input', validatePhoneLength);

/* Modify showInfo function to accept data as a parameter */
function showInfo() {
    userInfo.innerHTML = '';
    filteredData.forEach((element, index) => {
        const createElement = `
            <tr class="employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.employeeName}</td>
                <td>${element.employeeAge}</td>
                <td>${element.employeeCity}</td>
                <td>${element.employeeEmail}</td>
                <td>${element.employeePhone}</td>
                <td>${element.employeeKomentar}</td>
                <td>${element.postDate}</td>
                <td>
                    <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeKomentar}', '${element.postDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeKomentar}', '${element.postDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, name, age, city, email, phone, komentar, pDate) {
    document.querySelector('.showImg').src = pic;
    document.getElementById('showName').value = name;
    document.getElementById("showAge").value = age;
    document.getElementById("showCity").value = city;
    document.getElementById("showEmail").value = email;
    document.getElementById("showPhone").value = phone;
    document.getElementById("showKomentar").value = komentar;
    document.getElementById("showpDate").value = pDate;
}

function editInfo(index, pic, name, Age, City, Email, Phone, Komentar, pDate) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    userName.value = name;
    age.value = Age;
    city.value = City;
    email.value = Email;
    phone.value = Phone;
    komentar.value = Komentar;
    pDate.value = pDate;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}

function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        filteredData = [...getData];
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

/* Ensure search and sort are updated after adding, editing, or deleting data */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src === undefined ? "/asset/image/user.jpg" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeeKomentar: komentar.value,
        postDate: pDate.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    filteredData = [...getData];
    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();
    imgInput.src = "/asset/image/user.jpg";
});

showInfo();

logoutButton.addEventListener('click', () => {
    // Remove logged in status from localStorage
    localStorage.removeItem('loggedIn');
    // Redirect to login page
    window.location.href = '/pages/login/login.html';
});

// Check if user is logged in when page loads
const loggedIn = localStorage.getItem('loggedIn');
const currentPage = window.location.pathname;

if (!loggedIn && currentPage.includes('/pages/form/form_admin.html')) {
    // If user is not logged in and tries to access admin page, redirect to login
    window.location.href = '/pages/login/login.html';
}