const containerName = "packagesContainer";                                                          // Set the id for spinnerContainer
const spinnerContainerName = "spinnerContainer";                                                                // Set the id for spinnerContainer
const btnLoadContainerName = "btnLoadContainer";                                                                // Set the id for btnLoadContainer

const spinnerContainer = document.createElement("div");                                                         // Create element "spinnerContainer" to host productSpinner
spinnerContainer.setAttribute("id", spinnerContainerName);                                                      // Set spiinerContainer with the id: "SpinnerContainer"
spinnerContainer.className = "text-center fw-light mx-auto w-25 pt-4";                               // Style spinnerContainer
spinnerContainer.innerText = " Loading...";                                                                     // Set spinnerContainer innerText " Loading..."

const btnLoad = document.createElement("a");                                                                    // Create element "btnLoad"

let productsController = null;                                                                      // Instantiate variable for productController
let categoryId = null;

window.fetchProductsByCategoryId = async function (categoryId) {                                    // Define the function globally
    console.log(`fetchProductsByCategoryId called with categoryId: ${categoryId}`);

    const btnLoadContainer = document.getElementById(btnLoadContainerName);                                 // Get element by id: "btnLoadContainer"
    btnLoadContainer.innerHTML = "";                                                                        // Remove all elements from btnLoadContainer first

    const productContainer = document.getElementById(containerName);                                        // Instantiate an instance of productContainer
    productContainer.append(spinnerContainer);                                                              // Append the spinnerContainer to productContainer

    const productSpinner = new Spinner();                                                                   // Instantiate an instance of a Spinner: productSpinner
    productSpinner.createSpinner(spinnerContainerName);                                                     // Prepend productSpinner to spinnerContainer
    productSpinner.displaySpinner(true);

    const url = `http://localhost:8080/api/packages/category/${categoryId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const jsonResponse = await response.json();
        console.log("Full Response:", jsonResponse);                                                  // Check the full structure

        const items = jsonResponse || [];                                                             // Adjust based on the actual structure of the response
        console.log("Fetched Packages:", items);                                                      // Log the fetched data

        if (items.length > 0) {
            if (!productsController) {
                productsController = new ItemsController(containerName);
            }
            productsController.displayItems(items);
        } else {
            console.log("No items found for this category.");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        btnLoadStatus();                                                                                // Enable the button to reload
        btnLoadContainer.appendChild(btnLoad);
    }

    productSpinner.displaySpinner(false);                                                                   // Hide productSpinner 
    productContainer.removeChild(spinnerContainer);
};


window.onload = () => {                                                                               // Check for categoryId in the URL and fetch products accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    if (categoryId) {
        fetchProductsByCategoryId(categoryId);
    } else {
        console.error("No categoryId found in URL.");
    }
};

const handleLoadMore = (event) => {
    event.preventDefault();
    fetchProductsByCategoryId(categoryId);
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
            btnLoad.className = "btn btn-outline text-center w-25 disabled"                   // Style btnLoad to disabled
            btnLoad.innerText = "All results displayed";                                            // Set btnLoad innerText "Load More"
            btnLoad.addEventListener("click", handleLoadNone);                                      // Add EventListener handleLoadNone to btnLoad           
            break;
        default:
            btnLoad.className = "btn btn-danger text-center w-25";                                 // Style btnLoad
            btnLoad.innerText = "No results. Try reloading.";                                       // Set btnLoad innerText "Load More"
            btnLoad.addEventListener("click", handleLoadMore);                                      // Add EventListener handleLoadNone to btnLoad           
            break;
    }


}