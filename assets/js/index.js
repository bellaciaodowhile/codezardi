const aboutMe = document.querySelector('.experience__aboutme');

let observer = new IntersectionObserver(verifyEntry, {});
let relativeAboutMe = document.querySelector('.relative__aboutme')
observer.observe(aboutMe);

function verifyEntry(entries) {
    let entry = entries[0];
    if (entry.isIntersecting) {
        console.log('Visible')
        console.log(relativeAboutMe)
        relativeAboutMe.classList.add('relative__aboutme--active');
    } else {
        console.log('Hidden')
    }
}
