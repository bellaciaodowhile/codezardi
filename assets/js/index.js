// Optimized performance version
const aboutMe = document.querySelector('.svg__experience');
const nav = document.querySelector('nav');
const relativeAboutMe = document.querySelector('.relative__aboutme');
const sections = [...document.querySelectorAll('section')];
const itemsMenu = [...document.querySelectorAll('nav li a')];

// Intersection Observer for about me section
const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        relativeAboutMe.classList.add('relative__aboutme--active');
    }
}, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
});

if (aboutMe) {
    observer.observe(aboutMe);
}

// Throttled scroll handler for better performance
let scrollTimeout;
let lastScrollY = 0;

function handleScroll() {
    const currentScrollY = window.pageYOffset;
    
    // Only process if scroll changed significantly
    if (Math.abs(currentScrollY - lastScrollY) < 5) return;
    
    lastScrollY = currentScrollY;
    
    // Handle navigation active state
    if (currentScrollY > 100) {
        nav.classList.add('nav--active');
    } else {
        nav.classList.remove('nav--active');
    }
    
    // Handle section highlighting
    if (currentScrollY <= 667) {
        itemsMenu.forEach(item => item.classList.remove('a--active'));
        return;
    }
    
    // Find active section
    let activeSection = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const position = rect.top + currentScrollY;
        
        if ((position - 150) <= currentScrollY) {
            activeSection = section.id;
        }
    });
    
    // Update active menu item
    if (activeSection) {
        const currentItem = itemsMenu.find(item => 
            item.innerText.toLowerCase().trim().replace(' ', '-') === activeSection
        );
        
        if (currentItem) {
            itemsMenu.forEach(item => item.classList.remove('a--active'));
            currentItem.classList.add('a--active');
        }
    }
}

// Throttled scroll listener
function throttledScroll() {
    if (!scrollTimeout) {
        scrollTimeout = requestAnimationFrame(() => {
            handleScroll();
            scrollTimeout = null;
        });
    }
}

window.addEventListener('scroll', throttledScroll, { passive: true });

// Video player optimization
const projectImportant = document.querySelector('.project--important .project__main-img');
const play = document.querySelector('.play');
const video = document.querySelector('video');

if (projectImportant && video && play) {
    projectImportant.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (video.paused) {
            video.play().catch(console.error);
            video.controls = true;
            play.classList.add('hidden');
        } else {
            video.pause();
            video.controls = false;
            play.classList.remove('hidden');
        }
    });
    
    // Preload video metadata on hover for better UX
    projectImportant.addEventListener('mouseenter', () => {
        if (video.readyState === 0) {
            video.preload = 'metadata';
        }
    }, { once: true });
}