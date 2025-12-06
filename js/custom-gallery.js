// =================================================================
// REVISED js/custom-gallery.js
// =================================================================

// Declare Swiper instances globally within this script scope
let galleryTop;
let galleryThumbs;


// MODIFIED: changeGalleryImage now accepts the slide INDEX and moves the main slider.
function changeGalleryImage(index) {
	// If the galleryTop Swiper instance exists, move it to the specified index.
	if (typeof galleryTop !== 'undefined') {
		console.log("Changing main image to index:", index);
		// Use slideTo to transition the main slider
		galleryTop.slideTo(index);
	} else {
		console.warn("Main image Swiper instance not found!");
	}
}

function initCustomGallerySwiper() {
	console.log("initCustomGallerySwiper called");

	if (typeof Swiper !== "undefined") {
		console.log("Swiper detected, initializing...");

		// 1. Initialize the Thumbnails Swiper
		galleryThumbs = new Swiper(".thumbnails.swiper.gallery-thumbs", {
			slidesPerView: 'auto',
			spaceBetween: 10,
			freeMode: true,
			watchSlidesProgress: true,
			navigation: {
				// Use specific selectors to target the thumbnails' arrows
				nextEl: ".thumbnails.swiper .swiper-button-next", 
				prevEl: ".thumbnails.swiper .swiper-button-prev", 
			}
		});

		// 2. Initialize the Main Image Viewer Swiper
		galleryTop = new Swiper(".main-image.swiper.gallery-top", {
			slidesPerView: 1,
			loop: false, // Must be FALSE for accurate manual slideTo(index) control
			spaceBetween: 0,
			
			// === ADDED: Swipe/Drag for PC and Mobile ===
			simulateTouch: true,  
			grabCursor: true,   

			navigation: {
				// Use specific selectors to target the main slider's arrows
				nextEl: ".main-image.swiper .main-next", 
				prevEl: ".main-image.swiper .main-prev", 
			},

			// === LINKING: Synchronize with the Thumbnails ===
			thumbs: {
				swiper: galleryThumbs,
			},
		});

		console.log("Swiper initialized (Main & Thumbs)");
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
