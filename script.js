// Slider state management
const sliderStates = {
    1: 0,
    2: 0,
    3: 0
};

// Slide function
function slide(sliderId, direction) {
    const slider = document.getElementById('slider' + sliderId);
    const totalSlides = 3;
    
    sliderStates[sliderId] += direction;
    
    if (sliderStates[sliderId] < 0) {
        sliderStates[sliderId] = totalSlides - 1;
    } else if (sliderStates[sliderId] >= totalSlides) {
        sliderStates[sliderId] = 0;
    }
    
    slider.style.transform = 'translateX(' + (sliderStates[sliderId] * 100) + '%)';
    updateDots(sliderId);
}

// Go to specific slide
function goToSlide(sliderId, index) {
    sliderStates[sliderId] = index;
    const slider = document.getElementById('slider' + sliderId);
    slider.style.transform = 'translateX(' + (index * 100) + '%)';
    updateDots(sliderId);
}

// Update dots
function updateDots(sliderId) {
    const card = document.getElementById('slider' + sliderId).closest('.product-card');
    const dots = card.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === sliderStates[sliderId]);
    });
}

// Toggle wishlist
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    const svg = btn.querySelector('svg');
    if (btn.classList.contains('active')) {
        svg.setAttribute('fill', 'currentColor');
    } else {
        svg.setAttribute('fill', 'none');
    }
}

// Custom cursor
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for cursor
document.querySelectorAll('a, button, .product-card').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
        cursor.classList.remove('hover');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function(el) {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal();

// Touch swipe for sliders (mobile)
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.product-images').forEach(function(container, index) {
    const sliderId = index + 1;
    
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(sliderId);
    }, { passive: true });
});

function handleSwipe(sliderId) {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            slide(sliderId, -1);
        } else {
            slide(sliderId, 1);
        }
    }
}

// Hide cursor on mobile
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}
// Lightbox Logic (New)
        function openLightbox(src) {
            document.getElementById('lightboxImg').src = src;
            document.getElementById('lightboxModal').classList.add('active');
        }
        function closeLightbox() {
            document.getElementById('lightboxModal').classList.remove('active');
        }