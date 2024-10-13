class NavController {

    constructor(element) {
        this.siteMenu = document.getElementById(element);
        this.navbar = document.createElement("ul");
        this.middleBar = document.createElement("ul");
        this.navItems = [
            { "title": _CART_TITLE, "url": _CART_URL },
            { "title": _LOGIN_TITLE, "url": _LOGIN_URL },
            { "title": _LOGOUT_TITLE, "url": _LOGOUT_URL }
        ];
        this.navMiddleItems = [
            { "title": _EXPERIENCE_FOOD_TITLE, "url": _EXPERIENCE_FOOD_URL },
            { "title": _EXPERIENCE_FESTIVAL_TITLE, "url": _EXPERIENCE_FESTIVAL_URL },
            { "title": _EXPERIENCE_NATURE_TITLE, "url": _EXPERIENCE_NATURE_URL },
            { "title": _EXPERIENCE_CONCERTS_TITLE, "url": _EXPERIENCE_CONCERTS_URL },
            { "title": _EXPERIENCE_CULTURE_TITLE, "url": _EXPERIENCE_CULTURE_URL },
            { "title": _EXPERIENCE_ALL_TITLE, "url": _EXPERIENCE_ALL_URL },
        ];
    }


    displayNav() {

        this.navbar.className = "navbar-nav ms-auto mb-lg-0";
        this.siteMenu.appendChild(this.navbar);


        this.middleBar.className = "dropdown-menu";
        document.getElementById("dropdown_generator").appendChild(this.middleBar);



        const token = isAuthenticated();                                                                        // Obtain the token of the authenticated user

        this.navMiddleItems.forEach((item) => {
            const navItem = document.createElement("li");
            const navLink = document.createElement("a");                                                            // Append link to menu item
            navItem.appendChild(navLink);
            navLink.className = "dropdown-item";
            navLink.setAttribute("data-bs-toggle", "tooltip");
            navLink.setAttribute("href", item.url);
            navLink.innerHTML = item.title;
            const underLinedLink = "dropdown-item";
            document.getElementById("dropdown_generator").getElementsByClassName("dropdown-menu")[0].appendChild(navItem);

            navLink.addEventListener('click', async (event) => {
                // event.preventDefault(); 
                console.log(`Navigating to ${item.title}`);
                const categoryId = getCategoryId(item.title.toLowerCase());
                console.log(categoryId);
            
                if (categoryId !== "unknown") {
                    await window.fetchProductsByCategoryId(categoryId);
                    window.location.href = "category.html?categoryId=" + categoryId; // This navigates to category.html
                } else {
                    console.error("Unknown category ID: ", item.title);
                }
            });
        })


        this.navItems.forEach((item) => {                                                                       // Populate the navbar, and done conditionally for Login or Logout

            const underLinedLink = "nav-link fw-bolder text-decoration-underline";                              // Used for links that require emphasis (join/log in, logout, useremail)

            switch (true) {
                case (item.title.toLowerCase() !== _LOGIN_TITLE && item.title.toLowerCase() !== _LOGOUT_TITLE):
                    this.displayNavItem(item);                                                                  // Display menu items not used for authentication
                    break;
                case (!token && item.title.toLowerCase() === _LOGIN_TITLE):
                    this.displayNavItem(item, underLinedLink);                                                  // Display the link to login for UNauthenticated users
                    break;
                case (token && item.title.toLowerCase() === _LOGOUT_TITLE):
                    this.displayNavItem(item, underLinedLink)                                                   // Display the link to logout for authenticated users
                    break;
                default:                                                                                        // For anything else, include statements to create additional links
                    break;
            }

        });

        if (token) {
            const user = decodeUser(token);
            const userItem = { "title": user.email, "url": _PROFILE_URL };
            this.displayNavProfile(userItem);
        }

        return;
    }

    displayNavItem(item, underLinedLink = null) {

        const navItem = document.createElement("li");                                                           // Append menu item as list item
        this.navbar.appendChild(navItem);
        navItem.className = "nav-item text-nowrap";

        const navLink = document.createElement("a");                                                            // Append link to menu item
        navItem.appendChild(navLink);

        if (underLinedLink !== null)                                                                             // Change the navLinks's class if parameter underLinedLink is NOT equals to null 
            navLink.className = underLinedLink;
        else
            navLink.className = "nav-link";

        navLink.textContent = item.title.charAt(0).toUpperCase() + item.title.slice(1);                         // Set the text and the link

        if (item.title === _CART_TITLE) {
            const iconElement = document.createElement('i');
            iconElement.className = "fs-3 fa fa-shopping-cart px-2";
            navLink.appendChild(iconElement);
            navLink.href = item.url; // Ensure the link is maintained
        } else {
            navLink.textContent = item.title.charAt(0).toUpperCase() + item.title.slice(1); // Set the text and the link
            navLink.href = item.url; // Ensure the link is maintained
        }

        if (item.title === _LOGOUT_TITLE) {                                                                       // If title is 'logout', 
            navLink.href = "#";                                                                                 // Apply a placeholder anchor (#)
            navLink.addEventListener("click", (event) => {                                                      // add eventListener 
                console.log("logging out");
                logout();                                                                                       // call function logout()                                                                        
            })
        } else {
            navLink.href = item.url;                                                                            // Otherwise, apply item URL
        }
    }

    displayNavProfile(item) {

        const navItem = document.createElement("li");                                                           // Append menu item as list item
        this.navbar.appendChild(navItem);
        navItem.className = "nav-item text-nowrap";

        const navLink = document.createElement("a");                                                            // Append link to menu item
        navItem.appendChild(navLink);
        navLink.className = "nav-link";
        navLink.setAttribute("data-bs-toggle", "tooltip");
        navLink.setAttribute("data-bs-title", item.title);

        const iconElement = document.createElement('i');                                                        // Set the ICON and the link
        iconElement.className = "fs-3 fa fa-user-circle px-3";
        navLink.appendChild(iconElement);
        navLink.href = item.url;

        const tooltipProfileLink = navLink;                                                                     // Set a new instance of the tooltip for the profile
        const tooltipProfile = new bootstrap.Tooltip(tooltipProfileLink);
    }
}

function getCategoryId(title) {
    switch (title) {
        case "nature": return 1;
        case "food": return 2;
        case "festivals": return 3;
        case "concerts": return 4;
        case "culture": return 5;
        default: return "unknown"
    }
}