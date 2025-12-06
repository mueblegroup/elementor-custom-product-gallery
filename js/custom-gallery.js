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
