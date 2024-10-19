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

        console.log(user);

        if (user.role === "ADMIN") {
            profileRole.innerText = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
        };
    }else if(currentPage.includes(_SIGNUP_URL) || currentPage.includes(_LOGIN_URL)){

        const token = isAuthenticated();
        if(token)
            window.location = _HOME_URL;

    };

    // JavaScript for mobile dropdown
    document.addEventListener('DOMContentLoaded', function() {
        var dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(function(dropdown) {
            dropdown.addEventListener('click', function(event) {
                event.preventDefault();
                var dropdownMenu = this.nextElementSibling;
                if (dropdownMenu.style.display === 'block') {
                    dropdownMenu.style.display = 'none';
                } else {
                    dropdownMenu.style.display = 'block';
                }
            });
        });
    });

    // End here
});
