// Link to Tutorial: https://www.youtube.com/watch?v=6QE8dXq9SOE

const carousel = document.querySelector(".testimonial-carousel");
const arrowBtns = document.querySelectorAll(".review-nav");
const firstCardWidth = carousel.querySelector(".testimonial-card").offsetWidth;
const carouselChildrens = [...carousel.children];

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "prev" ? -firstCardWidth : firstCardWidth;
    })
});

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition")
    } 
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition")
    }

}

carousel.addEventListener("scroll", infiniteScroll);

// Auto play function
window.onload = function() {
    var nextArrow = document.querySelector("#next");
    
    function clickNext() {
      nextArrow.click();
    }
   
    setInterval(clickNext, 3000);
  };