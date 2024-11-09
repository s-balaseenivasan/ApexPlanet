document.querySelector('#contactForm').addEventListener('submit', function(e) {
    let valid = true;
    let errorMessages = '';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const errorContainer = document.getElementById('errorMessages');
    errorContainer.innerHTML = '';

    if (name.trim() === '') {
        valid = false;
        errorMessages += '<p>Name is required.</p>';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        valid = false;
        errorMessages += '<p>Please enter a valid email address.</p>';
    }

    if (message.trim() === '') {
        valid = false;
        errorMessages += '<p>Message cannot be empty.</p>';
    }

    if (!valid) {
        e.preventDefault();
        errorContainer.innerHTML = errorMessages;
    }
});