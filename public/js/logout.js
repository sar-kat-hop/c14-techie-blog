const logout = async () => {
    // remove session on backend
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // send to login page on successful logout    
        document.location.replace('/login');
        // document.location = '/'; 
    } else {
        alert(response.statusText);
        console.log('Error logging out');
    }
};

document.querySelector('#logout-btn').addEventListener('click', logout);


// const logout = async () => {
//     const response = await fetch("/api/users/logout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
  
//     if (response.ok) {
//       document.location = "/";
//     } else {
//       alert("Failed to log out.");
//     }
//   };
// const logoutBtn = document.querySelector('#logout-btn).click(logout);