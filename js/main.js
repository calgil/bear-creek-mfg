const theme = 'theme';
const dataTheme ='data-theme';
const themeTab ='.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const root = document.documentElement;

const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

const gallery = document.querySelector('.gallery-container');
const reviewContainer = document.querySelector('.review-carousel');

const buttons = document.querySelectorAll('.slide-ctrl-container button');

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
    if(document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    } 
    elm.classList.add(active);
}

const setTheme = (val) => {
    if(val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
};

if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    });

    if(currentTheme === 'dark'){
        switcher[1].classList.add(active);
    } else {
        switcher[0].classList.add(active);
    }
};

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if(!tab.className.includes(open)) {
        tab.classList.add(open)
    } else {
        tab.classList.remove(open);
    }
});

for (const elm of switcher){
    elm.addEventListener('click', function() {
        const toggle = this.dataset.toggle;
        setActive(elm, switcherBtn);
        setTheme(toggle);
    })
};

// Full site modal open/close

for (const elm of openModal){
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible)
    });
};

for (const elm of closeModal) {
    elm .addEventListener('click', function () {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
};


const cardArray = [
    {img:'./assets/drill-machine.jpeg', alt: 'metal work', header: 'Custom Fabrication', subHeader: 'Made to order parts and components'},
    {img: './assets/laser.jpeg', alt: 'metal work', header: 'Custom Machining', subHeader: 'We can make the part you need'},
    {img: './assets/milling-machine.jpeg', alt: 'metal work', header: 'Custom Milling', subHeader: 'We have the tools to meet your needs'},
    {img: './assets/machining.jpeg', alt: 'metal work', header: 'Repairs', subHeader: 'We will make a case-by-case decision to help with repairs'},
    {img: './assets/sparks.jpeg', alt: 'metal work', header: 'Metalwork', subHeader: 'Tell us about your project and we will let you know how we can help'},
    {img: './assets/welding.jpeg', alt: 'metal work', header: 'Custom Welding', subHeader: 'We can put it together. Good as new'},
 ];

const createCards = () => {
    const card = cardArray
    .map(({img, alt, header, subHeader}) => 
    `
    <div class="gallery-card">
        <div class="img-wrapper">
            <img src="${img}" alt="${alt}">
        </div>
        <div class="card-hover">
            <p>${header}</p>
            <p>${subHeader}</p>
        </div>
    </div> 
    `
    ).join('')
    gallery.insertAdjacentHTML('afterbegin', card)
};

createCards();

const reviewArray = [
    {reviewText: 'Great service! I was helped quickly and within my budget.',
    img: './assets/avatar.jpeg', authorName: 'Eli Melton', company: 'Linear Manufacturing'},

    {reviewText: 'Super knowledgeable! Helped with a repair when no one else could.',
    img: './assets/avatar-1.jpeg', authorName: 'Rick Johnson', company: 'Micron Manufacturing'},

    {reviewText: 'I couldn\'t have done it without their help.',
    img: './assets/avatar-2.jpeg', authorName: 'Carol Robinson', company: 'LaPlata Fabrication'},

    {reviewText: 'I have worked with them multiple times. They always get the job done right.',
    img: './assets/avatar-3.jpeg', authorName: 'Kyle Ganzer', company: 'Western Excelsior'},
];

const createReview = () => {
    const review = reviewArray
    .map(({reviewText, img, authorName, company}) =>
        `
        <div class="review-item">
            <div class="review-text">
            ${reviewText}
            </div>
            <div class="review-author">
                <div class="avatar">
                    <img src="${img}" alt="avatar">
                </div>
                <div class="details">
                    <div class="author-name">${authorName}</div>
                    <div class="company">${company}</div>
                </div>
            </div>
        </div>
        `
    ).join('')
    reviewContainer.insertAdjacentHTML('afterbegin', review)
};

createReview();


const slides = document.querySelectorAll('.review-item');

let current = Math.floor(Math.random() * slides.length);
let next = current < (slides.length - 1) ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

const update = () => {
    slides.forEach((slide) => {
        slide.classList.remove('active', 'prev', 'next');
    })
    slides[current].classList.add('active');
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
}

const goToNum = (number) => {
    current = number;
    next = current < (slides.length - 1) ? current + 1 : 0;
    prev = current > 0 ? current - 1 : slides.length - 1;
    update();
}

const goToNext = () => current < (slides.length -1) ? goToNum(current + 1) : goToNum(0);

const goToPrev = () => current > 0 ? goToNum(current - 1) : goToNum(slides.length -1);

for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext());
};

update();