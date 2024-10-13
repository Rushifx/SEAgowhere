const containerName = "packagesContainer";                                                          // Set the id for spinnerContainer

let productsController = null;                                                                      // Instantiate variable for productController
                                                                                                    
window.fetchProductsByCategoryId = async function (categoryId) {                                    // Define the function globally
    console.log(`fetchProductsByCategoryId called with categoryId: ${categoryId}`);

    const url = `http://localhost:8080/api/packages/category/${categoryId}`;
    const productContainer = document.getElementById(containerName);

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
    }
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
