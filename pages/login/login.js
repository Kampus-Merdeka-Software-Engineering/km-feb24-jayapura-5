document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('mobile-menu');
    const navigation = document.querySelector('.navigation');

    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.register .btn');
    
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registrasi berhasil, silahkan login!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); /* Hindari pengiriman formulir secara default*/

        /* Lakukan logika autentikasi di sini (misalnya dengan ...)
         Jika autentikasi berhasil, arahkan pengguna ke halaman yang ditentukan*/
        window.location.href = '/pages/form/form_admin.html';
    });
});
