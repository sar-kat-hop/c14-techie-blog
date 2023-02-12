const logout = async () => {
    // remove session on backend
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // send to login page on successful logout    
        document.location.replace('/login');
    } else {
        alert(response.statusText);
        console.log('Error logging out');
    }
};

document.querySelector('#logout').addEventListener('click', logout);
