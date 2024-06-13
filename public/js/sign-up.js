const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    try {
        if (username && password) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                console.log('Error saving user:', response.statusText);
                alert('Failed to create user. Please try again.');
            }
        } else {
            alert('Username and password are required.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);