let isValid = false;
let passwordsMatch = false;

function validateForm() {
    const form = document.getElementById('sign-up-form');
    const fullNameEl = document.getElementById('full-name');
    const emailEl = document.getElementById('email');
    const password1El = document.getElementById('password1');
    const password2El = document.getElementById('password2');
    const messageContainer = document.querySelector('.message-container');
    const message = document.getElementById('message');

    // Reset validation flags
    isValid = true;
    passwordsMatch = true;

    // Check if all fields are filled
    if (!fullNameEl.value || !emailEl.value || !password1El.value || !password2El.value) {
        isValid = false;
        message.textContent = 'Please fill out all fields.';
        message.style.color = '#fc3d21';
        messageContainer.style.borderColor = '#fc3d21';
        return;
    }

    // Check email format using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEl.value)) {
        isValid = false;
        message.textContent = 'Enter a valid email address.';
        message.style.color = '#fc3d21';
        messageContainer.style.borderColor = '#fc3d21';
        emailEl.style.borderColor = '#fc3d21';
        return;
    } else {
        emailEl.style.borderColor = '#18181b';
    }

    // Check password length
    if (password1El.value.length < 8) {
        isValid = false;
        message.textContent = 'Password must be longer.';
        message.style.color = '#fc3d21';
        messageContainer.style.borderColor = '#fc3d21';
        password1El.style.borderColor = '#fc3d21';
        return;
    } else {
        password1El.style.borderColor = '#18181b';
    }

    // Check if passwords match
    if (password1El.value !== password2El.value) {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.';
        message.style.color = '#fc3d21';
        messageContainer.style.borderColor = '#fc3d21';
        password1El.style.borderColor = '#fc3d21';
        password2El.style.borderColor = '#fc3d21';
        return;
    } else {
        password1El.style.borderColor = '#18181b';
        password2El.style.borderColor = '#18181b';
    }

    // If all validations pass
    if (isValid && passwordsMatch) {
        message.textContent = 'Successfully Registered!';
        message.style.color = '#18181b';
        messageContainer.style.borderColor = '#18181b';
    }
}

function storeFormData() {
    const form = document.getElementById('sign-up-form');
    const user = {
        fullName: form['full-name'].value,
        email: form['email'].value,
        password: form['password1'].value, 
    };

    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(user));

    // Debugging: Print stored data
    console.log('Stored Data:', user);
}

// Function called on form submission
function processFormData(e) {
    e.preventDefault();

    // Validate Form
    validateForm();

    // Submit Data if Valid
    if (isValid && passwordsMatch) {
        storeFormData();
        
        // Reset form after successful submission
        document.getElementById('sign-up-form').reset();

        // Reset input border colors
        document.getElementById('full-name').style.borderColor = '#18181b';
        document.getElementById('email').style.borderColor = '#18181b';
        document.getElementById('password1').style.borderColor = '#18181b';
        document.getElementById('password2').style.borderColor = '#18181b';

        // Reset message after 2 seconds
        setTimeout(() => {
        message.textContent = 'UNLOCK IT';
        message.style.color = '#18181b';
        messageContainer.style.borderColor = '#18181b';
    }, 2000);
    }
}

// Event Listener
document.getElementById('sign-up-form').addEventListener('submit', processFormData);
