const loginFormHandler = async (event) => {
    event.preventDefault();

    // grab user info input on page
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // send user info to server
    if (email && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not log in. Please try again.');
        }
    }
};

document.querySelector('#login-btn').addEventListener('click', loginFormHandler); // change 'clicl' to 'submit'?

//     const email = document.querySelector('#login-email').value.trim();
//     const password = document.querySelector('#login-password').value.trim();
//     // const loginBtn = document.querySelector('#login-btn');

//     if (email && password) {
//         const userData = await User.findOne({
//             where: {
//                 email: req.body.email,
//                 password: req.body.password,
//             }
//         });

//         if (!userData) {
//             res.status(400).json({ message: 'Incorrect email or password: please try again.' });
//             return;
//         };

//         const validPassword = await userData.checkPassword(req.body.password);
//             if (!validPassword) {
//                 res.status(400).json({ message: 'Incorrect password: please try again.' });
//                 return;
//         }

//         req.session.save(() => {
//             req.session.logged_in = true;
//             res.status(200).json({ user: userData, message: 'Login successful' });
//         });

//         document.location.replace('/'); // best place to put this? not sure if this will redirect only on user auth or not...
//     };

// document.querySelector('#login-btn').addEventListener('click', loginFormHandler);

// }