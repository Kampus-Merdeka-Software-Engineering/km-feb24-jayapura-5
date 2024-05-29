var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    komentar = document.getElementById("komentar"),
    pDate = document.getElementById("pDate");

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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

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

    getData.push(information);

    localStorage.setItem('userProfile', JSON.stringify(getData));

    form.reset();
    imgInput.src = "/asset/image/user.jpg";

    alert('Data has been submitted successfully');
});
