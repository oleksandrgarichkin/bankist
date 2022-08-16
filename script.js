"use strict";

const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const modalController = function () {
  modalWindow.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

/////// Open Modal window
btnOpenModal.forEach((btn) => {
  btn.addEventListener("click", modalController);
});
btnCloseModal.addEventListener("click", modalController);
overlay.addEventListener("click", modalController);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden"))
    modalController();
});

/////////
/////////SMOOTH SCROLING
/////////
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////
/////////NAVIGATION
/////////

const navigation = document.querySelector(".nav__links");

navigation.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__link--btn")
  ) {
    console.log(e.target);
    const href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  }
});

/////////
/////////TABS
/////////

const btnTabsContainer = document.querySelector(".operations__tab-container");
const btnTabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

btnTabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  //Make active button
  btnTabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  const dataset = clicked.dataset.tab;

  //Show content of tab
  tabsContent.forEach((tabCont) =>
    tabCont.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${dataset}`)
    .classList.add("operations__content--active");
});

/////////
/////////Navigation Hover efect
/////////

const nav = document.querySelector(".nav");

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector(".nav__logo");
    siblings.forEach((s) => {
      if (link !== s) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

/////////
/////////Sticky Navigation
/////////
const header = document.querySelector(".header");
const obs = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove("sticky");
  if (!entry.isIntersecting) nav.classList.add("sticky");
};

const observer = new IntersectionObserver(obs, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});
observer.observe(header);

/////////
/////////Sticky Navigation
/////////
// const allSections = document.querySelectorAll(".section");
// const options = {
//   root: null,
//   threshold: [0.01, 0.12, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
// };
// const reveal = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// };
// const revelObs = new IntersectionObserver(reveal, options);
// allSections.forEach((section) => {
//   section.classList.add("section--hidden");
//   revelObs.observe(section);
// });

/////////
/////////Image Lazy load
/////////

const lazyImgs = document.querySelectorAll("img[data-src]");
const lazyOpt = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};
const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const lazyObs = new IntersectionObserver(lazyLoad, lazyOpt);

lazyImgs.forEach((img) => lazyObs.observe(img));

/////////
/////////Slider
/////////

const allSlides = document.querySelectorAll(".slide");
const btnSliderRight = document.querySelector(".slider__btn--right");
const btnSliderLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
const maxSlide = allSlides.length - 1;
let curSlide = 0;

//Render dots in the page
allSlides.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;
  dotsContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});
const allDots = document.querySelectorAll(".dots__dot");

//// Mark active dot
const activeDotFunc = function (curSlide) {
  allDots.forEach((dot, i) => {
    dot.classList.remove("dots__dot--active");
    if (dot.dataset.slide == curSlide) {
      dot.classList.add("dots__dot--active");
    }
  });
};
activeDotFunc(0);

////Move to slide
const moveToSlide = function (curSlide) {
  allSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
  activeDotFunc(curSlide);
};

const nextSlide = function () {
  if (curSlide == maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  moveToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  moveToSlide(curSlide);
};

btnSliderRight.addEventListener("click", nextSlide);
btnSliderLeft.addEventListener("click", prevSlide);

dotsContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dots__dot")) return;
  curSlide = e.target.dataset.slide;
  moveToSlide(curSlide);
  activeDotFunc(curSlide);
});

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
