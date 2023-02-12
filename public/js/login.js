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
            res.status(400).json({ message: 'Incorrect email or password: please try again.' });
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password: please try again.' });
                return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'Login successful' });
        });

        document.location.replace('/'); // best place to put this? not sure if this will redirect only on user auth or not...
    };

document.querySelector('#login-btn').addEventListener('click', loginFormHandler);

}

//     if (email && password) {
//       // Send email & password to server
//         const response = await fetch('/api/login', { // not sure if this routing is correct... /api/users/login , /api/login, or what? 
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' }, // causing MIME type error in Chrome? (not fetching json user data? change to fetch another path? unsure how to point to userData.json)
//         });

//         if (response.ok) {
//             document.location.replace('/');
//         } else {
//             alert('Could not log in.');
//         }
//     }
// };

// document.querySelector('#login-form').addEventListener('click', loginFormHandler);
// }

