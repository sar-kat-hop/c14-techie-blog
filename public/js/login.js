const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    const loginBtn = document.querySelector('#login-btn');

    if (email && password) {
      // Send email & password to server
        const response = await fetch('/api/login', { // not sure if this routing is correct... /api/users/login , /api/login, or what?
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not log in.');
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
