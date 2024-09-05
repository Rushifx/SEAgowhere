// modal opening and closing
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', (event) => {
    event.preventDefault();
    modal_container.classList.add('show');
})

close.addEventListener('click', (event) => {
    event.preventDefault();
    modal_container.classList.remove('show');
})

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if(event.target === modal_container){
        modal_container.classList.remove('show');
    }
})

// User subscribe thank you message
const form = document.getElementById('form')
const subscribeContent = document.getElementById('subscribe-content');
const thankYouContent = document.getElementById('thank-you-content');

form.addEventListener('submit', event => {
    event.preventDefault();

    if(validateInputs()){
        subscribeContent.style.display = 'none';
        thankYouContent.style.display = 'block';

        setTimeout(() => {
            modal_container.classList.remove('show');
            resetModal();
        }, 3000);
    }

    
});

const resetModal = () => {
    form.reset();

    subscribeContent.style.display = 'block';
    thankYouContent.style.display = 'none';

    const inputControls = document.querySelectorAll('.input-control');
    inputControls.forEach(inputControl => {
        inputControl.classList.remove('success','errors');
    });
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(String(email).toLowerCase());
}

// email validation
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const newsEmail = document.getElementById('newsEmail');

const validateInputs = () => {
    const fNameValue = firstName.value.trim();
    const lNameValue = lastName.value.trim();
    const emailValue = newsEmail.value.trim();
    let valid = true

    if(fNameValue === "") {
        setError(firstName, 'First name is required');
        valid = false;
    } else {
        setSuccess(firstName);
    }

    if(lNameValue === "") {
        setError(lastName, 'Last name is required');
        valid = false;
    } else {
        setSuccess(lastName);
    }

    if(emailValue === "") {
        setError(newsEmail, 'Email is required');
        valid = false;
    } else if(!isValidEmail(emailValue)) {
        setError(newsEmail, 'Provide a valid email address');
        valid = false;
    } else {
        setSuccess(newsEmail);
    }
    
    return valid;
};