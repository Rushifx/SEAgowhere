let dynamicCounter = 1;

document.getElementById("add-passenger-btn").addEventListener("click", () => {
    const passengerContainer = document.getElementById("passenger-details");
    dynamicCounter++;
    console.log("Count: " + dynamicCounter);

    // Update the quantity in the booking display
    const bookingQty = document.querySelector(".booking-pax");
    bookingQty.textContent = dynamicCounter; // Increment quantity
    console.log("QTY: " + bookingQty.innerHTML);

    updatePrice(packageDetails);

    const newPassengerRow = `
    <div class="row g-3 additional-passenger border-top pt-3" data-dynamic="true" id="passenger-${dynamicCounter}">
        <div class="col-md-3">
            <label for="title-${dynamicCounter}" class="form-label">Title</label>
            <select class="form-select fw-light" id="title-${dynamicCounter}" required>
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
            <input type="text" class="form-control fw-light" id="firstName-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Valid first name is required.
            </div>
        </div>

        <div class="col-md-3">
            <label for="lastName-${dynamicCounter}" class="form-label">Last Name</label>
            <input type="text" class="form-control fw-light" id="lastName-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Valid last name is required.
            </div>
        </div>

        <div class="col-md-3">
            <label for="nationality-${dynamicCounter}" class="form-label">Nationality</label>
            <select class="form-select fw-light" id="nationality-${dynamicCounter}" required>
                <option value="">Choose...</option>
                <option>Singapore</option>
            </select>
            <div class="invalid-feedback">
                Please choose your nationality.
            </div>
        </div>

        <div class="col-md-3">
            <label for="gender-${dynamicCounter}" class="form-label">Gender</label>
            <select class="form-select fw-light" id="gender-${dynamicCounter}" required>
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
            <input type="date" class="form-control fw-light" id="dob-${dynamicCounter}" required>
            <div class="invalid-feedback">
                Please enter your date of birth.
            </div>
        </div>

        <div class="col-md-3">
            <label for="passportNumber-${dynamicCounter}" class="form-label">Passport Number</label>
            <input type="text" class="form-control fw-light" id="passportNumber-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Please enter your passport number.
            </div>
        </div>

        <div class="col-md-3">
            <label for="passportExpiry-${dynamicCounter}" class="form-label">Passport Expiry Date</label>
            <input type="date" class="form-control fw-light" id="passportExpiry-${dynamicCounter}" required>
            <div class="invalid-feedback">
                Please enter your passport expiry date.
            </div>
        </div>

        <div class="col-md-4 mb-4">
            <label for="mobile-${dynamicCounter}" class="form-label">Mobile</label>
            <input type="tel" class="form-control fw-light" id="mobile-${dynamicCounter}" placeholder="" required>
            <div class="invalid-feedback">
                Please enter your mobile number.
            </div>
        </div>

        <!-- Remove Passenger Button -->
        <div class="col-md-4 mt-5">
            <button class="btn btn-danger remove-passenger-btn" onclick="removePassenger(${dynamicCounter})">Remove Passenger</button>
        </div>
    </div>
    `;

    passengerContainer.insertAdjacentHTML("beforeend", newPassengerRow);
});

function removePassenger(counter) {
    const passengerRow = document.getElementById(`passenger-${counter}`);
    if (passengerRow) {
        passengerRow.remove();
        dynamicCounter--;
        console.log("Passenger removed. Count: " + dynamicCounter);

        // Update the quantity in the booking display
        const bookingQty = document.querySelector(".booking-pax");
        bookingQty.textContent = dynamicCounter;
        console.log("Updated QTY: " + bookingQty.innerHTML);

        updatePrice(packageDetails);
    }
}