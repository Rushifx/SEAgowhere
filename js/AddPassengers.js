let dynamicCounter = 1;

document.getElementById("add-passenger-btn").addEventListener("click", () => {
    const passengerContainer = document.getElementById("passenger-details");
    dynamicCounter++;
    console.log("Count: " + dynamicCounter);

    // Update the quantity in the booking display
    const bookingQty = document.querySelector(".booking-pax");
    bookingQty.textContent = dynamicCounter; // Increment quantity
    console.log("QTY: " + bookingQty.innerHTML);

    // multiply(dynamicCounter);

    const newPassengerRow = `
    <div class="row g-3 additional-passenger border-top pt-3" data-dynamic="true">
        <div class="col-md-3">
            <label for="title-${dynamicCounter}" class="form-label">Title</label>
            <select class="form-select" id="title-${dynamicCounter}" required>
                <option value="">Choose...</option>
                <option>Mr</option>
                <option>Ms</option>
                <option>Mrs</option>
            </select>
            <div class="invalid-feedback">
                Please select a title.
            </div>
        </div>

        <div class="col-md-3">
            <label for="firstName-${dynamicCounter}" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstName-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Valid first name is required.
            </div>
        </div>

        <div class="col-md-3">
            <label for="lastName-${dynamicCounter}" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastName-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Valid last name is required.
            </div>
        </div>

        <div class="col-md-3">
            <label for="nationality-${dynamicCounter}" class="form-label">Nationality</label>
            <select class="form-select" id="nationality-${dynamicCounter}" required>
                <option value="">Choose...</option>
                <option>Singapore</option>
            </select>
            <div class="invalid-feedback">
                Please choose your nationality.
            </div>
        </div>

        <div class="col-md-3">
            <label for="gender-${dynamicCounter}" class="form-label">Gender</label>
            <select class="form-select" id="gender-${dynamicCounter}" required>
                <option value="">Choose...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
            <div class="invalid-feedback">
                Please select a gender.
            </div>
        </div>

        <div class="col-md-3">
            <label for="dob-${dynamicCounter}" class="form-label">Date of Birth</label>
            <input type="date" class="form-control" id="dob-${dynamicCounter}" required>
            <div class="invalid-feedback">
                Please enter your date of birth.
            </div>
        </div>

        <div class="col-md-3">
            <label for="passportNumber-${dynamicCounter}" class="form-label">Passport Number</label>
            <input type="text" class="form-control" id="passportNumber-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Please enter your passport number.
            </div>
        </div>

        <div class="col-md-3">
            <label for="passportExpiry-${dynamicCounter}" class="form-label">Passport Expiry Date</label>
            <input type="date" class="form-control" id="passportExpiry-${dynamicCounter}" required>
            <div class="invalid-feedback">
                Please enter your passport expiry date.
            </div>
        </div>

        <div class="col-md-4 mb-4">
            <label for="mobile-${dynamicCounter}" class="form-label">Mobile</label>
            <input type="tel" class="form-control" id="mobile-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Please enter your mobile number.
            </div>
        </div>
        </div>
    </div>
    `;

    passengerContainer.insertAdjacentHTML("beforeend", newPassengerRow);
});

async function submitForm(event) {
    event.preventDefault();

    const formData = {};
    const passengerDetails = document.querySelectorAll("#passenger-details .row");

    passengerDetails.forEach(row => {
        if(row.hasAttribute('data-dynamic')) {
            console.log("Skipping dynamically added row");
            return;
        }

    })
}