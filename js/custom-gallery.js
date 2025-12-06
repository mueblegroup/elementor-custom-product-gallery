function changeGalleryImage(src) {

  let mainImg = document.getElementById("gallery-main");

  let link = mainImg ? mainImg.parentElement : null;



  if (mainImg) {

    console.log("Changing main image to:", src);

    mainImg.src = src;

    if (link) link.href = src;

  } else {

    console.warn("Main image element #gallery-main not found!");

  }

}



function initCustomGallerySwiper() {

  console.log("initCustomGallerySwiper called");



  if (typeof Swiper !== "undefined") {

    console.log("Swiper detected, initializing...");



    let swiperInstance = new Swiper(".thumbnails.swiper", {

      slidesPerView: 'auto',

      spaceBetween: 10,

      navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",

      }

    });



    console.log("Swiper initialized:", swiperInstance);

  } else {

    console.error("Swiper is NOT defined. Make sure Swiper JS is enqueued!");

  }

}



// Elementor hook

jQuery(window).on("elementor/frontend/init", function() {

  console.log("Elementor frontend init triggered");

  elementorFrontend.hooks.addAction("frontend/element_ready/custom_gallery_widget.default", function() {

    console.log("Custom gallery widget ready (Elementor)");

    initCustomGallerySwiper();

  });

});



// Fallback for non-Elementor pages

document.addEventListener("DOMContentLoaded", function() {

  console.log("DOMContentLoaded fired");

  initCustomGallerySwiper();

});

/* ------------------------------
   MAIN IMAGE SWIPE (Added Feature)
---------------------------------*/

function initMainImageSwipe() {
    let mainImg = document.getElementById("gallery-main");
    if (!mainImg) return;

    // Collect all thumbnail images (your array)
    const thumbs = document.querySelectorAll(".thumbnails img");
    if (thumbs.length === 0) return;

    let images = [];
    thumbs.forEach(t => images.push(t.src));

    let currentIndex = images.indexOf(mainImg.src);

    let startX = 0;
    let endX = 0;

    // Touch start
    mainImg.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    // Touch end
    mainImg.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        let diff = startX - endX;

        // swipe right → next image
        if (diff > 50) {
            currentIndex = (currentIndex + 1) % images.length;
            changeGalleryImage(images[currentIndex]);
        }

        // swipe left → previous image
        if (diff < -50) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            changeGalleryImage(images[currentIndex]);
        }
    }

    // Also update index when user clicks a thumbnail
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener("click", () => {
            currentIndex = idx;
        });
    });
}


// Initialize swipe feature after page load
document.addEventListener("DOMContentLoaded", initMainImageSwipe);
jQuery(window).on("elementor/frontend/init", initMainImageSwipe);

