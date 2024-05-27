const aboutMe = document.querySelector('.svg__experience');

let nav = document.querySelector('nav');
let observer = new IntersectionObserver(verifyEntry, {});
let relativeAboutMe = document.querySelector('.relative__aboutme')
let sections = [...document.querySelectorAll('section')];
let itemsMenu = [...document.querySelectorAll('nav li a')];
observer.observe(aboutMe);

function verifyEntry(entries) {
    let entry = entries[0];
    if (entry.isIntersecting) {
        relativeAboutMe.classList.add('relative__aboutme--active');
    }
}

function scrollItems() {
    window.onscroll = (e) => {
        let exp = document.querySelector('#experiencia');
        sections.map(section => {
            const position = section.getBoundingClientRect().top + window.pageYOffset;
            if ((position - 150) <= window.pageYOffset) {
                triggerActive(section.id)
            } 
            if (window.pageYOffset <= 667) {
                itemsMenu.map(x => x.classList.remove('a--active') );
            }
            function triggerActive(section) {
                let current = itemsMenu.filter(x => x.innerText.toLowerCase().trim().replace(' ', '-') == `${section}`)[0];
                if (current != undefined) {
                    itemsMenu.map(x => x.classList.remove('a--active') );
                    current.classList.add('a--active');
                } 
            }
        });
        
        if (window.pageYOffset > 100) {
            nav.classList.add('nav--active')
        } else {
            nav.classList.remove('nav--active')
        }
    }
}
scrollItems()