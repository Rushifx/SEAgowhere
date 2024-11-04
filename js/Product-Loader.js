const containerName = "packagesContainer";                                                                      // Set the id for productContainer
const spinnerContainerName = "spinnerContainer";                                                                // Set the id for spinnerContainer
const btnLoadContainerName = "btnLoadContainer";                                                                // Set the id for btnLoadContainer

const spinnerContainer = document.createElement("div");                                                         // Create element "spinnerContainer" to host productSpinner
spinnerContainer.setAttribute("id", spinnerContainerName);                                                      // Set spiinerContainer with the id: "SpinnerContainer"
spinnerContainer.className = "text-center fw-light mx-auto w-25 pt-4";                                          // Style spinnerContainer
spinnerContainer.innerText = " Loading...";                                                                     // Set spinnerContainer innerText " Loading..."

const btnLoad = document.createElement("a");                                                                    // Create element "btnLoad"

let productsController = null;                                                                                  // Instantiate varaible for productController
let currentPage = 1, perPage = 6, totalItems, totalPages;                                                       // Manage pagination                        

document.addEventListener("DOMContentLoaded", (event) => {                                                      // Event listener when the page
        event.preventDefault();
        fetchProducts();                                                                                        // Fetch the first page of products
});

async function fetchProducts(page = 1) {

        const btnLoadContainer = document.getElementById(btnLoadContainerName);                                 // Get element by id: "btnLoadContainer"
        btnLoadContainer.innerHTML = "";                                                                        // Clear all elements from btnLoadContainer first

        const productContainer = document.getElementById(containerName);                                        // Get the product container
        productContainer.append(spinnerContainer);                                                              // Append the spinnerContainer to productContainer

        const productSpinner = new Spinner();                                                                   // Instantiate a Spinner: productSpinner
        productSpinner.createSpinner(spinnerContainerName);                                                     // Prepend productSpinner to spinnerContainer
        productSpinner.displaySpinner(true);                                                                    // Show the spinner

        setTimeout(() => {
                fetch(`http://localhost:8080/public/api/packages/listing?page=${page}&perPage=${perPage}`)      // Fetch products from the API
                        .then(response => response.json())                                                      // Convert response to JSON
                        .then(response => {                                                                     // Handle the JSON response
                                const { data, page, per_page, total, total_pages } = response;                  // Destructure the response
                                console.log(data);

                                if (page === 1) {                                                                // If it's the first page
                                        productsController = new ItemsController(containerName);                 // Create a new instance of the productController
                                }

                                productsController.displayItems(data);                                           // Display the items
                                currentPage += 1;                                                                // Increment the current page
                                perPage = per_page;
                                totalItems = total;
                                totalPages = total_pages;

                                if (page * per_page < totalItems) {                                              // If more items are available to load
                                        btnLoadStatus(true);                                                     // Enable the button
                                        btnLoadContainer.appendChild(btnLoad);                                   // Append btnLoad to btnLoadContainer
                                } else {
                                        btnLoadStatus(false);                                                    // Disable the button if all results are displayed
                                        btnLoadContainer.appendChild(btnLoad);                                   // Append btnLoad to btnLoadContainer
                                }

                        })
                        .catch(error => {                                                                        // Handle any errors
                                console.log(error);
                                btnLoadStatus();                                                                 // Enable the button to reload
                                btnLoadContainer.appendChild(btnLoad);                                           // Append btnLoad to btnLoadContainer
                        })
                        .finally(() => {
                                productSpinner.displaySpinner(false);                                            // Hide the spinner
                                productContainer.removeChild(spinnerContainer);                                  // Remove spinnerContainer after loading is completed
                        });
        }, 500);                                                                                                 // Set the delay to 0.5 seconds
}



const handleLoadMore = (event) => {
        event.preventDefault();
        fetchProducts(currentPage)
};

const handleLoadNone = (event) => {
        event.preventDefault();
};

function btnLoadStatus(status = null) {

        switch (true) {
                case status === true:
                        btnLoad.className = "btn btn-secondary text-center w-25";                               // Style btnLoad
                        btnLoad.href = "#";                                                                     // Set btnLoad with a hyperlink ref: #
                        btnLoad.innerText = "Load More";                                                        // Ser btnLoad innerText "Load More" 
                        btnLoad.addEventListener("click", handleLoadMore);                                      // Add EventListener handleLoadMore to btnLoad
                        break;
                case status === false:
                        btnLoad.className = "btn btn-outline text-center w-25 disabled"                         // Style btnLoad to disabled
                        btnLoad.innerText = "All results displayed";                                            // Set btnLoad innerText "Load More"
                        btnLoad.addEventListener("click", handleLoadNone);                                      // Add EventListener handleLoadNone to btnLoad           
                        break;
                default:
                        btnLoad.className = "btn btn-danger text-center w-25";                                  // Style btnLoad
                        btnLoad.innerText = "No results. Try reloading.";                                       // Set btnLoad innerText "Load More"
                        btnLoad.addEventListener("click", handleLoadMore);                                      // Add EventListener handleLoadNone to btnLoad           
                        break;
        }


}