function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?\d{10,15}$/;
    return re.test(phone);
}

function ContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const req = document.getElementById('req').value;
    const msg = document.getElementById('msg').value.trim();
    const responseMessage = document.getElementById('responseMessage');

    if (name === "" || email === "" || phone === "" || req === "" || msg === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }

    responseMessage.innerText = 'Sending...';
    responseMessage.className = 'response-message loading';

    const formData = {
        name,
        email,
        phone,
        service: req,
        message: msg,
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        responseMessage.innerText = data;
        responseMessage.className = 'response-message success';

        setTimeout(() => {
            document.getElementById('contact-form').reset();
            responseMessage.innerText = '';
            responseMessage.className = 'response-message';
        }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
        responseMessage.innerText = 'There was an error. Please try again.';
        responseMessage.className = 'response-message error';
    });

    return false;
}

document.getElementById('contact-form').addEventListener('submit', ContactForm);
