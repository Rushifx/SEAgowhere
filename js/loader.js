let spinner = null;

// EventListener to instantiate the navController
document.addEventListener("DOMContentLoaded", async (event) => {
    
    // Instantiate an instance of the siteMenu
    const navController = new NavController("navbarNav");
    navController.displayNav();

    // Instantiate a spinner, currently used in login.html
    spinner = new Spinner();

    const currentPage = window.location.pathname; //checks the page name
    if (currentPage.includes(_PROFILE_URL)) {

        const token = isAuthenticated();

        if(!token)
            window.location = _HOME_URL;

        const profileEmail = document.getElementById("txtEmail");
        const profileUsername = document.getElementById("txtUsername");
        const profileFullName = document.getElementById("txtFullName");
        const profileFirstName = document.getElementById("txtFirstName");
        const profileLastName = document.getElementById("txtLastName");
        const profileRole = document.getElementById("txtUserRole");
        const profileNumber = document.getElementById("txtPhone")
        profileUsername.classList.add("fw-bold");


        const response = await fetch(_ENDPOINT_PROFILE, {                                   // !! DONE: API call to get the profile info.
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,                                         // !! Send the bearer token to allow server-side authentication
                "Content-Type": "application/json"
            }
        });

        if(response.ok){                                                                    // If response status == 200 (ok)
            const user = await response.json();                                             // Obtain JSON response to display authenticated user
            
            profileEmail.innerText = user.email;
            profileUsername.innerText = user.firstName + " " + user.lastName;
            profileFullName.innerText = user.lastName + " " + user.firstName;
            profileNumber.innerText = user.number;

            profileFirstName.value = user.firstName;
            profileLastName.value = user.lastName;

            console.log(user);
        };


        if (user.role === "ADMIN") {
            profileRole.innerText = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
        };
    }else if(currentPage.includes(_SIGNUP_URL) || currentPage.includes(_LOGIN_URL)){

        const token = isAuthenticated();
        if(token)
            window.location = _HOME_URL;

    }else if(currentPage.includes(_CART_URL)){

        const token = isAuthenticated();

        if(!token)
            window.location = _LOGIN_URL;
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
