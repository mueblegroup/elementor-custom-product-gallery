// =================================================================
// REVISED js/custom-gallery.js
// =================================================================

// Removed: function changeGalleryImage(src) - The manual function is now obsolete.

function initCustomGallerySwiper() {
	console.log("initCustomGallerySwiper called");

	if (typeof Swiper !== "undefined") {
		console.log("Swiper detected, initializing...");

		// 1. Initialize the Thumbnails Swiper (The controlling slider)
		// NOTE: Selector targets the element with BOTH classes 'thumbnails' and 'swiper', and 'gallery-thumbs'
		const galleryThumbs = new Swiper(".thumbnails.swiper.gallery-thumbs", {
			slidesPerView: 'auto',
			spaceBetween: 10,
			freeMode: true,
			watchSlidesProgress: true,
			
			// Use specific navigation selectors for the THUMBNAILS slider
			navigation: {
				nextEl: ".thumbnails.swiper .swiper-button-next", 
				prevEl: ".thumbnails.swiper .swiper-button-prev", 
			}
		});

		// 2. Initialize the Main Image Viewer Swiper (The one with the swipe gesture)
		// NOTE: Selector targets the element with BOTH classes 'main-image' and 'swiper', and 'gallery-top'
		const galleryTop = new Swiper(".main-image.swiper.gallery-top", {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 0,
			
			// === ADDED: Swipe/Drag for PC and Mobile ===
			// These settings enable the swiping gesture you requested.
			simulateTouch: true,  
			grabCursor: true,   

			// Use specific navigation selectors for the MAIN IMAGE slider
			navigation: {
				nextEl: ".main-image.swiper .main-next", // Use the unique class set in PHP
				prevEl: ".main-image.swiper .main-prev", // Use the unique class set in PHP
			},

			// === LINKING: Synchronize with the Thumbnails ===
			// This makes clicking a thumbnail or swiping the main image update both.
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
