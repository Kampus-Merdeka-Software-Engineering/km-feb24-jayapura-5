document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navigation = document.querySelector('.navigation');
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const registerButton = document.querySelector('.register .btn');
    const loginForm = document.querySelector('.login form');

    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

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

    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registrasi berhasil, silahkan login!');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        /* Lakukan logika autentikasi di sini (misalnya dengan cara di bawah ini)
         Jika autentikasi berhasil, arahkan pengguna ke halaman yang ditentukan*/

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        /* Check if email and password match admin credentials */
        if (email === 'admin@gmail.com' && password === 'admin123') {
            /* Set logged in status to localStorage */
            localStorage.setItem('loggedIn', true);
            /* Redirect to admin page */
            window.location.href = '/pages/form/form_admin.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    /* Check if user is logged in when page loads */
    const loggedIn = localStorage.getItem('loggedIn');
    const currentPage = window.location.pathname;

    if (!loggedIn && currentPage.includes('/pages/form/form_admin.html')) {
        /* If user is not logged in and tries to access admin page, redirect to login */
        window.location.href = '/login.html';
    }
});
