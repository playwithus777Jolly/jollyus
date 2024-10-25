/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



// Funzione per hashare la password utilizzando SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

// Gestione dell'invio del modulo
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impedisce il comportamento predefinito del modulo

    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    // Hash della password valida
    const validHash = '529259b4aaef4ae43685148fe21eb6ea043396986b31264cbf864e90dd11f2f2'; // Sostituisci con l'hash corretto

    // Hash della password inserita dall'utente
    const hashedPassword = await hashPassword(password);

    // Confronto degli hash
    if (hashedPassword === validHash) {
        document.getElementById('submitSuccessMessage').classList.remove('d-none');
        document.getElementById('submitErrorMessage').classList.add('d-none');
    } else {
        document.getElementById('submitErrorMessage').classList.remove('d-none');
        document.getElementById('submitSuccessMessage').classList.add('d-none');
    }
});