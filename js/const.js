// site pages' titles
const _HOME_TITLE = "home";             
const _ABOUT_TITLE = "about";
const _CART_TITLE = "   ";
const _CONTACT_TITLE = "contact";
const _LOGIN_TITLE = "join/log in";
const _LOGOUT_TITLE = "logout";
const _PROFILE_TITLE = "user profile";
const _SIGNUP_TITLE = "sign up";

const _EXPERIENCE_FOOD_TITLE = "Food";
const _EXPERIENCE_FESTIVAL_TITLE = "Festival";
const _EXPERIENCE_NATURE_TITLE = "Nature";
const _EXPERIENCE_CONCERTS_TITLE = "Concerts";
const _EXPERIENCE_CULTURE_TITLE = "Culture";
const _EXPERIENCE_ALL_TITLE = "All Experiences";

// correspononding site pages' links
const _HOME_URL = "index.html";             
const _ABOUT_URL = "about.html";
const _CART_URL = "booking.html";
const _CONTACT_URL = "contact.html";
const _LOGIN_URL = "login.html";
const _LOGOUT_URL = "logout.html";
const _PROFILE_URL = "profile.html";
const _SIGNUP_URL = "signup.html";

function getCategoryUrl(categoryId){
    return `category.html?categoryId=${categoryId}`;
}

const _EXPERIENCE_FOOD_URL = getCategoryUrl(2);
const _EXPERIENCE_FESTIVAL_URL = getCategoryUrl(3);
const _EXPERIENCE_NATURE_URL = getCategoryUrl(1);
const _EXPERIENCE_CONCERTS_URL = getCategoryUrl(4);
const _EXPERIENCE_CULTURE_URL = getCategoryUrl(5);
const _EXPERIENCE_ALL_URL = "experiences.html";

// token name
const _USERTOKEN = "usertoken";

// endponts
const _ENDPOINT_LOGIN = "http://localhost:8080/auth/api/signin";
const _ENDPOINT_SIGNUP = "http://localhost:8080/auth/api/signup";
const _ENDPOINT_PROFILE = "http://localhost:8080/restricted/api/profile";
const _ENDPOINT_UPDATEPROFILE = "http://localhost:8080/restricted/api/profile/update";