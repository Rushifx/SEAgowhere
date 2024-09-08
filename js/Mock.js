class Mock{

    constructor(){
        // TODO: WIP
    }
    
    // Static variables
    /* ************** */
    
    // !! Mock response 200 SUCCESS (akin to response.status === 200)
    static successResponse = {                                  
        ok: true,                                               // Indicates the response was successful
        status: 200,                                            // HTTP status code for Not Found
        statusText: 'OK',                                       // Corresponding status text
        json: async () => ({ message: 'Success!' }),            // Mocked JSON response
        text: async () => 'Success!',                           // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock response 404 NOT_FOUND (akin to response.status === 400)
    static notFoundResponse = {                                 
        ok: false,                                              // Indicates the response was NOT successful
        status: 404,                                            // HTTP status code for Not Found
        statusText: 'NOT_FOUND',                                // Corresponding status text
        json: async () => ({ error: 'Resource not found' }),    // Mocked JSON response
        text: async () => 'Resource not found',                 // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock response 403 FORBIDDEN (akin to response.status === 403)
    static forbiddenResponse = {                                 
        ok: false,                                              // Indicates the response was forbidden
        status: 403,                                            // HTTP status code for Forbidden
        statusText: 'FORBIDDEN',                                // Corresponding status text
        json: async () => ({ error: 'Forbidden' }),             // Mocked JSON response
        text: async () => 'Forbidden',                          // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock token containing the userame (uname: momorunner) subscriber (sub: martin@example.com), and Unix Timestamps: issued at (iat: 1st Sept 2024) and expiry (exp: 1st Sept 2025)
    // static mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJ0aW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MjUxNTQzNzEsImV4cCI6MTc1NjY5MDM3M30.h2f3qzjWuDFq3p1kPqY7yFbZ5iy5XqFMRScztyL5F0k";
    static mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbW9ydW5uZXIiLCJlbWFpbCI6Im1hcnRpbkBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyNTU5MDQwNywiZXhwIjoxNzU3MTI2NDA3fQ.zXMOdhfVq4ILL0JLKq0Iq2zR3f2fBdJA37F9dSQYSm4";

    
    // Static methods
    /* ************** */

    static getMockSuccess(){                                    // Returns mock OK status
        return this.successResponse;
    }

    static getMockNotFound(){                                   // Returns mock NOT_FOUND status
        return this.successResponse;
    }

    static getMockForbidden(){                                  // Returns mock FORBIDDEN status
        return this.forbiddenResponse;
    }

    static getToken(status = false){                            // Returns mock NOT_FOUND status
        return status ? this.mockToken : status;
    }

    // Class methods (TBC)
    /* **************** */

}