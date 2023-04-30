const loginFormHandler = async (event) => {
    event.preventDefault();

    // grab user info input
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // send user info to server
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
            alert('You are now logged in.');
        } else {
            alert('Could not log in. Please try again.');
        }
    }
};

document.querySelector('#login-btn').addEventListener('click', loginFormHandler); // change 'click' to 'submit'?
