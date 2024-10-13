const containerName = "packagesContainer";                                                                      // Set the id for productContainer
const spinnerContainerName = "spinnerContainer";                                                                // Set the id for spinnerContainer
const btnLoadContainerName = "btnLoadContainer";                                                                // Set the id for btnLoadContainer

const spinnerContainer = document.createElement("div");                                                         // Create element "spinnerContainer" to host productSpinner
spinnerContainer.setAttribute("id", spinnerContainerName);                                                      // Set spiinerContainer with the id: "SpinnerContainer"
spinnerContainer.className = "text-center fw-light mx-auto w-25 pt-4";                               // Style spinnerContainer
spinnerContainer.innerText = " Loading...";                                                                     // Set spinnerContainer innerText " Loading..."

const btnLoad = document.createElement("a");                                                                    // Create element "btnLoad"

let productsController = null;                                                                                  // Instantiate varaible for productController
let currentPage = 1, perPage=6, totalItems, totalPages;                                                         // Manage pagination                        

document.addEventListener("DOMContentLoaded", (event) => {                                                      // Event listener when the page
        event.preventDefault();
        fetchProducts();                                                                                        // Fetch the first page of products
});

async function fetchProducts(page = 1) {

        const btnLoadContainer = document.getElementById(btnLoadContainerName);                                 // Get element by id: "btnLoadContainer"
        btnLoadContainer.innerHTML = "";                                                                        // Remove all elements from btnLoadContainer first
        
        const productContainer = document.getElementById(containerName);                                        // Instantiate an instance of productContainer
        productContainer.append(spinnerContainer);                                                              // Append the spinnerContainer to productContainer
        
        const productSpinner = new Spinner();                                                                   // Instantiate an instance of a Spinner: productSpinner
        productSpinner.createSpinner(spinnerContainerName);                                                     // Prepend productSpinner to spinnerContainer
        productSpinner.displaySpinner(true);
                                 `      `
        await fetch(`http://localhost:8080/api/packages/listing?page=${page}&perPage=${perPage}`)               // !!DONE: API call to actual fetch request in SpringBoot
        .then(response => response.json()) 
        .then(response => {                                                                                     // Promise.resolve returned          
                const {data, page, per_page, total, total_pages} = response;                                    // Extract response' data, page, per_page, total, total_pages
                console.log(data);
                
                if(page === 1)                                                                                  // IF it's the 1st page, 
                        productsController = new ItemsController(containerName);                                // Create a NEW instance of the productController

                productsController.displayItems(data);                                                          // Display more product items from productController                                                           
                currentPage += 1;                                                                            // Add on to the current page
                perPage = per_page;                                                                             // Limits the items per page
                totalItems = total;                                                                             // Identify the number of pages
                totalPages = total_pages;                                                                       // Total number of pages based on items per page

                console.log("currentPage: " + currentPage)
                if(page * per_page < totalItems){                                                                     // IF the items displayed is < totalItems
                        btnLoadStatus(true);                                                                    // Enable the button
                        btnLoadContainer.appendChild(btnLoad);                                                  // Append btnLoad to btnLoadContainer
                }else{                                                                                          // Else
                        btnLoadStatus(false);                                                                   // Disable the button
                        btnLoadContainer.appendChild(btnLoad);                                                  // Append btnLoad to btnLoadContainer
                }

        }).catch(error => {                                                                                     // promise.reject returned                               
                console.log(error);                                                                             // Log the erro
                btnLoadStatus();                                                                                // Enable the button to reload
                btnLoadContainer.appendChild(btnLoad);                                                          // Append btnLoad to btnLoadContainer
        });
        
        productSpinner.displaySpinner(false);                                                                   // Hide productSpinner 
        productContainer.removeChild(spinnerContainer);                                                         // Remove spinnerContainer after loading is completed

}

const handleLoadMore = (event) => {
        event.preventDefault();
        fetchProducts(currentPage);
};

const handleLoadNone = (event) => {
        event.preventDefault();
};

function btnLoadStatus(status = null){

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