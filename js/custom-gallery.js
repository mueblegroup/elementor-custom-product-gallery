// =================================================================
// UPDATED js/custom-gallery.js
// =================================================================

// REMOVED: function changeGalleryImage(src) - The manual image swap is no longer needed.

function initCustomGallerySwiper() {
	console.log("initCustomGallerySwiper called");

	if (typeof Swiper !== "undefined") {
		console.log("Swiper detected, initializing...");

		// 1. Initialize the Thumbnails Swiper
		const galleryThumbs = new Swiper(".thumbnails.swiper.gallery-thumbs", {
			slidesPerView: 'auto',
			spaceBetween: 10,
			freeMode: true, // Allows swiping freely
			watchSlidesProgress: true,
			navigation: {
				nextEl: ".thumbnails.swiper .swiper-button-next", // Specific selector
				prevEl: ".thumbnails.swiper .swiper-button-prev", // Specific selector
			}
		});

		// 2. Initialize the Main Image Viewer Swiper
		const galleryTop = new Swiper(".main-image.swiper.gallery-top", {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 0,
			
			// === ADDED: Swipe/Drag for PC and Mobile ===
			simulateTouch: true, // Enables mouse dragging
			grabCursor: true,   // Visual feedback for dragging

			// Navigation for the main gallery
			navigation: {
				nextEl: ".main-image.swiper .main-next", // Specific selector
				prevEl: ".main-image.swiper .main-prev", // Specific selector
			},

			// === ADDED: Link the main viewer to the thumbnails ===
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
// =================================================================
