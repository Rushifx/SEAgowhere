// Function to authenticate the user via site's JWT token
function isAuthenticated() {

    const token = window.localStorage.getItem(_USERTOKEN);          // Retrieve usertoken from local storage

    const expired = isTokenExpired(token);                          // Check the token's expiry 

    if (expired)                                                     // If expired, return (false)
        return;

    return token;                                                   // Else return token (usertoken)
}

// Function to check if the token has expired
function isTokenExpired(token) {

    if (!token) return true;                                        // Return true if token passed in is undefined 

    const payload = JSON.parse(atob(token.split('.')[1]));          // Decode the JWT token (a base64-encoded JSON payload)

    const expirationTime = payload.exp;                             // Get the expiration time from the token payload

    const currentTime = Math.floor(Date.now() / 1000);              // Current time in seconds

    return expirationTime < currentTime;                            // Return true ONLY when currentTime is LESS THAN token's expirationTime
}

// Function to decode the user's email from the parameter
function decodeUser(token) {

    // !! Extract authenticated user's email from the token
    const arrToken = token.split(".");
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const email = decodedToken.email;
    const username = decodedToken.lastName + " " + decodedToken.firstName;
    const fullname = decodedToken.lastName + " " + decodedToken.firstName;
    const phoneNumber = decodedToken.number;
    const role = decodedToken.role;
    return { email: email, username: username, fullname: fullname, number: phoneNumber, role: role };

}

// ?? async / await
// ?? Async functions return results wrapped in a resolved Promise; for any errors, a 'rejected' Promise is returned 
// ?? In an async function, await pauses execution for the function until a Promise is resolved/rejected. 

// Funtion to login
async function login(formData = {}) {

    if (Object.entries(formData).length === 0)                                               // Return if the object is empty
        return;

    // !! Try/catch block (exception handling) to send data to login enpoint
    try {
        // FETCH requests - send data or retrive data by calling an API endpoint            

        const response = await fetch(_ENDPOINT_LOGIN, {                                 // Perform an async POST request to process the form data
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });



        if (response.ok) {                                                                    // If response is ok

            const result = await response.json();
            const token = result.token;
            const user = decodeUser(token);
            const redirectTo = window.localStorage.getItem('redirectTo')
            window.localStorage.setItem(_USERTOKEN, token);                                 // Store the string in localStorage with the key 'usertoken'

            if (redirectTo) {
                console.log("Redirecting to: " + redirectTo);
                window.location.href = redirectTo;
                localStorage.removeItem('redirectTo');
            } else {
                console.log("No redirectTo found, going to home.");
                window.location.href = _HOME_URL;                                           // Redirect the user to homepage
            }

        }

        return;                                                                             // Else return false

    } catch (error) {
        console.log("Exception error gotten is: ", error.message);
        return;
    }

}

// Function to Sign Up
async function signup(formData = {}) {
    if (Object.entries(formData).length === 0)                                               // Return if the object is empty
        return;

    try {
        const response = await fetch(_ENDPOINT_SIGNUP, { // Perform an async POST request to process the form data
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const loginData = {
                email: formData.email,
                password: formData.password
            };

            const loginResult = await login(loginData);

            if (loginResult) {
                const redirectTo = window.localStorage.getItem('redirectTo');

                if (redirectTo) {
                    console.log("Redirecting to: " + redirectTo);
                    window.location.href = redirectTo;
                    localStorage.removeItem('redirectTo');
                } else {
                    console.log("No redirectTo found, going to home.");
                    window.location.href = _HOME_URL; 
                }
            }
        } else {
            console.log("Signup failed:", await response.json());
        }
        return;
    } catch (error) {
        console.log("Exception error gotten is: ", error.message);
        return;
    }
}

// Function to update profile
async function update(formData = {}) {

    const token = localStorage.getItem(_USERTOKEN);

    if (Object.entries(formData).length === 0)                                               // Return if the object is empty
        return;

    try {

        const response = await fetch(_ENDPOINT_UPDATEPROFILE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Send the bearer token for authentication
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {

            const result = await response.json();
            const newToken = result.token;

            window.localStorage.removeItem(_USERTOKEN);
            window.localStorage.setItem(_USERTOKEN, newToken);

            // Redirect back to profile.html
            window.location = _PROFILE_URL;

        } else {
            console.log("Update failed:", await response.json());
        }

        return;

    } catch (error) {
        console.log("Exception error gotten is: ", error.message)
        return;
    }
}

// Function to logout
function logout() {
    window.localStorage.removeItem(_USERTOKEN);                                             // Store the string in localStorage with the key 'token'
    window.location = _HOME_URL;                                                            // Redirect the user to homepage
}
