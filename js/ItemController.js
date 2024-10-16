// Create a itemsController class
class ItemsController {

    constructor(element, itemList = []) {

        this.itemContainer = document.getElementById(element);
        this.itemRow = document.createElement("div");

        this.itemRow.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-lg-5 mt-0";
        this.itemContainer.appendChild(this.itemRow);

        this.items = itemList;
    }

    displayItems(items = []) {

        const currentLength = this.items.length;                                // Track the current length of this.items
        const startIndex = currentLength > 0 ? currentLength : 0;               // Set startIndex to currentLength if items.length > 0, else to 0

        if (items.length) {                                                       // IF param items is > 0
            this.items.push(...items);                                          // Push new items to this.items    
        }

        for (let index = startIndex; index < this.items.length; index++) {      // Loop from the calculated startIndex to add New Items
            console.log("Adding item: ", this.items[index]);
            this.addItem(this.items[index]);
        }
        console.log(items);
    }

    // Create the addItem method
    addItem(item) {

        const itemCol = document.createElement("div");
        itemCol.className = "col d-flex flex-column";
        this.itemRow.append(itemCol);

        const cardItem = document.createElement("div");
        cardItem.className = "product-card border-0 rounded-4 flex-fill mt-3";
        itemCol.appendChild(cardItem);

        const cardDetailLink = document.createElement("a");
        // cardDetailLink.href = "products.html?id=" + item.id;

        const cardImage = document.createElement("img");
        cardImage.className = "card-img-top rounded-top-4";
        cardImage.src = item.image_url;
        cardDetailLink.append(cardImage);

        cardItem.append(cardDetailLink);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardItem.append(cardBody);

        const cardTitle = document.createElement("h6");
        cardTitle.className = "card-Title fs-4 ms-2 d-flex align-items-center px-2 mt-2";
        cardTitle.innerText = item.name;
        cardBody.append(cardTitle);

        const cardCategory = document.createElement("span");
        const categoryId = item.category ? item.category.id : null;
        if (categoryId === null) {
            console.error("Category ID is not found in item:", item);
            cardCategory.innerText = "unknown";
        } else {
            const categoryName = getCategoryName(categoryId);
            cardCategory.className = "card-category text-capitalize px-3 py-2 rounded-5 text-white ms-2 fw-semibold mt-2";
            cardCategory.innerText = categoryName;

            const categoryClass = getCategoryClass(categoryName);
            if (categoryClass)
                cardCategory.classList.add(categoryClass);
        }
        cardBody.append(cardCategory);

        const cardCountry = document.createElement("span");
        cardCountry.className = "card-country text-capitalize px-3 py-2 rounded-5 text-white ms-2 fw-semibold";
        cardCountry.innerText = item.country;
        cardBody.append(cardCountry);

        const cardText = document.createElement("p");
        cardText.className = "card-blurb fw-light small mt-4 px-2";
        cardText.innerText = item.blurb;
        cardBody.append(cardText);

        const daysAndNight = document.createElement("p");
        daysAndNight.className = "card-text";
        daysAndNight.innerText = item.no_of_days + "D" + item.no_of_nights + "N";
        cardBody.append(daysAndNight);

        const cardPrice = document.createElement("p");
        cardPrice.className = "card-text mt-2";
        cardPrice.innerText = "$" + item.price + "/pax";
        cardBody.append(cardPrice);

        const cardButton = document.createElement("p");
        cardButton.className = "card-text text-center mb-4";
        cardBody.append(cardButton);

        const cardDetail = document.createElement("a");
        cardDetail.className = "btn btn-secondary rounded-4 text-center mt-2 border-0 me-2";
        cardDetail.innerText = "Find out more!";
        cardDetail.setAttribute("data-bs-toggle", "modal");
        cardDetail.setAttribute("data-bs-target", "#modalPackageDetail");
        cardButton.append(cardDetail);
        cardDetail.addEventListener("click", (event) => {
            this.handleProductDetail(
                item.name, 
                item.country, 
                item.desc,
                item.start_date, 
                item.end_date, 
                item.no_of_days, 
                item.no_of_nights,
                item.price, 
                item.image_1, 
                item.image_2, 
                item.image_3, 
                item.image_4, 
                event);
            console.log("TO CHECK: ", item.name, item.country, item.desc,
                item.start_date, item.end_date, item.no_of_days, item.no_of_nights,
                item.price, item.image_1, item.image_2, item.image_3, item.image_4, event)
        });

        const cardLink = document.createElement("a");
        cardLink.className = "btn btn-custom rounded-4 text-white text-center mt-2 me-2";
        cardLink.innerText = "Add to Cart";
        // cardLink.href = "cart.html?id=" + item.id;           // TODO: Add link to Cart.html
        cardButton.append(cardLink);
    }

    handleProductDetail(name, country, desc, start_date, end_date, days, nights, price, image1, image2, image3, image4, event) {

        event.preventDefault();
        console.log("Check against: ", name, country, desc, start_date, end_date, days, nights, price, image1, image2, image3, image4)

        const existingBackdrop = document.querySelector('.modal-backdrop');
        if (existingBackdrop) {
            existingBackdrop.remove();
        }

        // TODO to run a fetch request based on the query parameter instead.

        const modalPackageDetail = document.getElementById("modalPackageDetail");
        if (!modalPackageDetail) {
            console.error("Modal package detail element not found");
            return;
        }

        // Clearing the previous modal content
        const modalDialog = document.querySelector('.modal-dialog');
        if (modalDialog) {
            modalDialog.classList.add('modal-xl');
        }

        const packageTitle = modalPackageDetail.querySelector(".modal-header h3");
        if (packageTitle) {
            packageTitle.textContent = '';
        }

        const packageDaysNights = modalPackageDetail.querySelector(".daysAndNights");
        if (packageDaysNights) {
            packageDaysNights.textContent = '';
        }

        const packageDates = modalPackageDetail.querySelector(".packageDates");
        if (packageDates) {
            packageDates.textContent = '';
        }

        const packagePrice = modalPackageDetail.querySelector(".price");
        if (packagePrice) {
            packagePrice.textContent = '';
        }

        const packageDesc = modalPackageDetail.querySelector(".modal-body p");
        if (packageDesc) {
            packageDesc.textContent = '';
        }

        const packageImage1 = modalPackageDetail.querySelector(".modal-body .image1");
        const packageImage2 = modalPackageDetail.querySelector(".modal-body .image2");
        const packageImage3 = modalPackageDetail.querySelector(".modal-body .image3");
        const packageImage4 = modalPackageDetail.querySelector(".modal-body .image4");

        packageImage1.setAttribute("src", '');
        packageImage2.setAttribute("src", '');
        packageImage3.setAttribute("src", '');
        packageImage4.setAttribute("src", '');

        // Setting new values
        if (packageTitle) {
            packageTitle.textContent = `${name}, ${country}`;
        }

        if (packageDates) {
            packageDates.textContent = `Dates: ${start_date} to ${end_date}`;
            console.log("start_date passed to handleProductDetail: ", start_date);
            console.log("end_date passed to handleProductDetail: ", end_date);            
        }

        if (packageDaysNights) {
            packageDaysNights.textContent =`${days} Days, ${nights} Nights`            
        }

        if (packagePrice) {
            packagePrice.textContent = `From $${price} per Pax`;            
        }

        if (packageDesc) {
            packageDesc.textContent = desc;            
        }

        if(packageImage1) packageImage1.setAttribute("src", image1 || '');
        if(packageImage2) packageImage2.setAttribute("src", image2 || '');
        if(packageImage3) packageImage3.setAttribute("src", image3 || '');
        if(packageImage4) packageImage4.setAttribute("src", image4 || '');

        const modal = new bootstrap.Modal(modalPackageDetail);
        modal.show();

        // Cleanup on modal close
        modal._element.addEventListener('hidden.bs.modal', () => {
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => backdrop.remove());

            // Ensure body overflow is restored
            document.body.style.overflow = '';
        });
    }
}

function getCategoryName(categoryId) {
    switch (categoryId) {
        case 1: return "nature";
        case 2: return "food";
        case 3: return "festivals";
        case 4: return "concerts";
        case 5: return "culture";
        default: return "unknown"
    }
}

function getCategoryClass(categoryClass) {
    switch (categoryClass) {
        case "nature": return "nature";
        case "food": return "food";
        case "festivals": return "festivals";
        case "concerts": return "concerts";
        case "culture": return "culture";
        default: return "unknown"
    }
}