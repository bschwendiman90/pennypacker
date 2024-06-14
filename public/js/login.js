const loginFormHandler = async (event) => {

    event.preventDefault();
    console.log("test1")

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("test1")
        if (response.ok) {
            console.log("test2")
            document.location.replace('/');

        } else {
            alert('Failed to log in');
        }
    }
};


document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);