async function fetchBookingsByUserId() {
  const url = 'http://localhost:8080/user/api/booking/user';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
      }
    });
    console.log("Token: ", localStorage.getItem('usertoken'));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const bookings = await response.json();
    const bookingsContainer = document.querySelector(".profile-bookings");

    const uniqueBookings = new Set();

    bookings.forEach(booking => {
      console.log("booking details: ", booking);
      console.log("package details: ", booking.packages)

      const packageDetails = booking.packages;

      if (!uniqueBookings.has(packageDetails.id)) {
        uniqueBookings.add(packageDetails.id);

        const categoryDetails = booking.packages.category;
        console.log("Category Details: ", categoryDetails)

        const bookingCard = `
                <div class="col-md-4 col-sm-6 mb-3 d-flex">
                      <div class="booking-card border border-2 border-black rounded-2 flex-fill">
                        <div class="booking-img">
                          <img src="${packageDetails.image_url}" alt="${packageDetails.name}"
                            class="h-25 w-100 rounded-0 rounded-1">
                        </div>
                        <div class="w-100 p-2">
                        <span class="fs-3 fw-bold">${packageDetails.name}</span>
                        </div>
                        <div class="booking-content ms-2 mt-2">
                          <div class="booking-category ${getCategoryName(categoryDetails.id)}">
                            <span class="p-2 rounded text-white text-capitalize">${categoryDetails.name}</span></div>
                          <div class="booking-content d-flex flex-column mt-2 ms-3">
                            <span>Depart: <strong>${packageDetails.start_date}</strong></span>
                            <span>Return: <strong>${packageDetails.end_date}</strong></span>
                            <span class="mb-2 mt-2">${packageDuration(packageDetails)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
            `;

        bookingsContainer.innerHTML += bookingCard;
      } else {
        console.log(`Duplicate package detected: ${packageDetails.name}`);
      }
    });
    
  } catch (error) {
    console.log("Error fetching bookings: ", error);
  }
}

function packageDuration(packageDetails) {
  const days = packageDetails.no_of_days;
  const nights = packageDetails.no_of_nights;
  return `${days}D${nights}N`;
}

function getCategoryName(categoryName) {
  switch (categoryName) {
    case 1: return "nature";
    case 2: return "food";
    case 3: return "festivals";
    case 4: return "concerts";
    case 5: return "culture";
    default: return "unknown"
  }
}

fetchBookingsByUserId();