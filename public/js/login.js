const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    // const loginBtn = document.querySelector('#login-btn');

    if (email && password) {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again.' });
                return;
        };

        const validPassword = await dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password. Please try again.' });
                return;
        }

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Login successful' });
        });
    };

document.querySelector('#login-btn').addEventListener('click', loginFormHandler);

}

//     if (email && password) {
//       // Send email & password to server
//         const response = await fetch('/api/login', { // not sure if this routing is correct... /api/users/login , /api/login, or what?
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/');
//         } else {
//             alert('Could not log in.');
//         }
//     }
// };

// document
//     .querySelector('#login-form')
    // .addEventListener('submit', loginFormHandler);

// loginBtn.addEventListener('click', loginFormHandler);
// }

