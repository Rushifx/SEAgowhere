let spinner = null;

// EventListener to instantiate the navController
document.addEventListener("DOMContentLoaded", (event) => {
    
    // Instantiate an instance of the siteMenu
    const navController = new NavController("navbarNav");
    navController.displayNav();

    // Instantiate a spinner, currently used in login.html
    spinner = new Spinner();

    const currentPage = window.location.pathname; //checks the page name
    if (currentPage.includes(_PROFILE_URL)) { //
        console.log('profile page');

        const token = isAuthenticated();

        if(!token)
            window.location = _HOME_URL;

        const user = decodeUser(token);
        const profileEmail = document.getElementById("txtEmail");
        const profileUsername = document.getElementById("txtUsername");
        const profileRole = document.getElementById("txtUserRole");
        profileUsername.classList.add("fw-bold");
        profileEmail.innerText = user.email;
        profileUsername.innerText = user.username;

        if (user.role === "ADMIN") {
            profileRole.innerText = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
        };
    };

    // End here
});