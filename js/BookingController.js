let packageId = window.location.href.match(/id=([^&]*)/);
console.log("package id: ", packageId[1]);
let packageDetails = null;

fetchPackageDetails(packageId[1]);

async function fetchPackageDetails (packageId) {
    const url = `http://localhost:8080/public/api/packages/${packageId}`
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new (`HTTP error! status: ${response.status}`);
    
        packageDetails = await response.json();
        console.log("Package Details: ", packageDetails);
        this.displayPackageDetails(packageDetails);

        return packageDetails;
    
    } catch (error) {
        console.log("No items found for this package.");
    }
}

function displayPackageDetails(packageDetails) {
    if(!packageDetails){
        console.log("No package details to display");
        return;
    }
    
    const bookingTitle = document.getElementsByClassName('booking-title')[0];
    bookingTitle.textContent = `${packageDetails.name} (${packageDetails.no_of_days}D${packageDetails.no_of_nights}N)`;

    const depDate = document.getElementsByClassName('dep-date')[0];
    depDate.textContent = formatDate(packageDetails.start_date);

    const endDate = document.getElementsByClassName('return-date')[0];
    endDate.textContent = formatDate(packageDetails.end_date);


    const bookingPrice = document.getElementsByClassName('booking-price')[0];
    bookingPrice.textContent = `S$${packageDetails.price}`;

    updatePrice(packageDetails);
}

const formatDate = (date) => {
    const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function multiply(packageDetails) {
    const price = packageDetails.price;
    console.log("PRICE: " + price)
    
    const qtyElement = document.getElementsByClassName('booking-pax')[0];
    const qtyNumber = parseInt(qtyElement.textContent);
    console.log("QTYNUMBER: " + qtyNumber);

    const total = price * qtyNumber;
    console.log("Total: " + total)

    return total;
}

function updatePrice(packageDetails) {
    // const bookingTotal = document.getElementsByClassName('booking-total')[0];
    const totalPrice = document.getElementsByClassName('total-price')[0];

    const total = multiply(packageDetails);
    
    // bookingTotal.textContent = `S$${total}`;
    totalPrice.textContent = `S$${total}`;
    
}
