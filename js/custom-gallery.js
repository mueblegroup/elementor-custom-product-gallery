// =================================================================
// REVISED js/custom-gallery.js - ENHANCED FOR POPUP DIAGNOSTICS
// =================================================================

// NOTE: This version assumes you have restored the HTML element 
// with ID="gallery-main" in your PHP output.

function changeGalleryImage(src) {
    let mainImg = document.getElementById("gallery-main");
    let link = mainImg ? mainImg.parentElement : null;

    if (mainImg) {
        console.log("LOG: changeGalleryImage: Success. Changing image to:", src);
        mainImg.src = src;
        if (link) link.href = src;
    } else {
        // This is a key diagnostic point
        console.error("ERROR: changeGalleryImage: Element #gallery-main NOT found.");
    }
}

function initCustomGallerySwiper() {
    console.log("LOG: initCustomGallerySwiper called.");

    if (typeof Swiper !== "undefined") {
        console.log("LOG: Swiper detected, attempting initialization for thumbnails...");

        // NOTE: This only initializes the THUMBNAILS SWIPER, which is correct for your custom logic.
        let swiperInstance = new Swiper(".thumbnails.swiper", {
            slidesPerView: 'auto',
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });

        console.log("LOG: Swiper initialized successfully:", swiperInstance);
    } else {
        console.error("ERROR: Swiper is NOT defined. Check enqueue status!");
    }
}

/* ----------------------------------------------------------
   MAIN IMAGE SWIPE (Custom Pure JS Swipe)
-----------------------------------------------------------*/
function initMainImageSwipe() {
    let mainImg = document.getElementById("gallery-main");
    if (!mainImg) {
        // This is the most crucial error check when using popups
        console.error("ERROR: initMainImageSwipe: #gallery-main element NOT found. Cannot enable swipe.");
        return;
    }
    console.log("LOG: initMainImageSwipe: Found #gallery-main.");

    const thumbs = document.querySelectorAll(".thumbnails img");
    if (thumbs.length === 0) {
        console.warn("WARN: No thumbnails found. Swipe logic might be incomplete.");
        return;
    }
    console.log(`LOG: initMainImageSwipe: Found ${thumbs.length} thumbnails.`);

    let images = [];
    thumbs.forEach(t => images.push(t.src));

    // Get the initial index based on the currently displayed main image source
    let currentIndex = images.indexOf(mainImg.src);
    if (currentIndex === -1) {
        currentIndex = 0; // Default to the first image if not found
        console.warn("WARN: Current main image source not found in thumbnail array. Defaulting index to 0.");
    }

    let startX = 0;
    let endX = 0;

    // ... (rest of touch event listeners remain the same) ...
    mainImg.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        console.log("DIAG: Touch start at X:", startX);
    });

    mainImg.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        console.log("DIAG: Touch end at X:", endX);
        handleSwipe();
    });

    function handleSwipe() {
        let diff = startX - endX;
        console.log("DIAG: Swipe difference:", diff);

        // Swipe right → next
        if (diff > 50) {
            currentIndex = (currentIndex + 1) % images.length;
            changeGalleryImage(images[currentIndex]);
            console.log("DIAG: Swipe LEFT detected (Next image). New index:", currentIndex);
        }

        // Swipe left → prev
        else if (diff < -50) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            changeGalleryImage(images[currentIndex]);
            console.log("DIAG: Swipe RIGHT detected (Prev image). New index:", currentIndex);
        }
    }

    // Sync when clicking thumbnails
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener("click", () => {
            currentIndex = idx;
            console.log("DIAG: Thumbnail clicked. Current swipe index updated to:", currentIndex);
        });
    });

    console.log("LOG: Main image custom swipe enabled successfully.");
}

/* ----------------------------------------------------------
   POPUP-SAFE INITIALIZATION (For Elementor Popup)
-----------------------------------------------------------*/
function initGalleryInsidePopup() {
    console.log("LOG: initGalleryInsidePopup: Elementor Popup content ready. Initializing gallery.");

    // Initialize Swiper for the thumbnails
    initCustomGallerySwiper(); 
    
    // Initialize the custom swipe logic
    initMainImageSwipe();
}

/* Elementor Popup event */
jQuery(window).on("elementorPro/popup/show", function () {
    console.log("LOG: Elementor popup event 'elementorPro/popup/show' detected.");

    // The timeout gives the dynamic DOM content (the gallery) a moment to be fully inserted.
    // Reducing the timeout might sometimes work, but 200ms is generally safe.
    setTimeout(function () {
        initGalleryInsidePopup();
    }, 200);
});

/* Elementor widget normal load */
jQuery(window).on("elementor/frontend/init", function () {
    console.log("LOG: Elementor frontend init triggered (Normal page load).");
    elementorFrontend.hooks.addAction(
        "frontend/element_ready/custom_gallery_widget.default",
        function ($scope) {
            console.log("LOG: Custom gallery widget ready (Elementor normal render). $scope:", $scope[0]);
            
            // NOTE: When running inside element_ready, we should only initialize 
            // the gallery *within* the scope of the rendered widget to prevent conflicts.
            // Since your current functions rely on document.getElementById("gallery-main"), 
            // this is less important, but good practice.
            
            initCustomGallerySwiper();
            initMainImageSwipe();
        }
    );
});

/* Fallback for non-Elementor pages */
document.addEventListener("DOMContentLoaded", function () {
    console.log("LOG: DOMContentLoaded fired (Non-Elementor/Fallback).");
    initCustomGallerySwiper();
    initMainImageSwipe();
});
