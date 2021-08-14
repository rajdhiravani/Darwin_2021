// Navbar scroll animation

const nav = document.querySelector("nav");
const input = document.querySelectorAll("input");

const height = window.innerHeight;
let incNoDone = false;

const navChangeOnScroll = (scroll) => {
  if (nav.classList.contains("home")) {
    if (scroll > height * 0.2) {
      nav.classList.add("navBGChange");
    } else {
      nav.classList.remove("navBGChange");
    }
  }
};

// Navbar dropdown

const dropdownAppear = (e) => {
  const content = e.nextSibling.nextSibling;
  if (window.innerWidth < 960) {
    if (content.style.display !== "flex") content.style.display = "flex";
    else content.style.display = "none";
  }
};

// Navbar height

const r = document.querySelector(":root");
const rs = getComputedStyle(r);

if (window.innerWidth <= 760) {
  r.style.setProperty("--nav-height", "75px");
}

// Stats animation

const statsAnimateOnScroll = (scroll) => {
  const stats = document.getElementById("stats");
  let stat = stats.childNodes[0].nextSibling;
  let statNo1 = stat.childNodes[0].nextSibling;
  let statNo2 = stat.childNodes[2].nextSibling;
  let statNo3 = stat.childNodes[4].nextSibling;
  let statNo4 = stat.childNodes[6].nextSibling;
  let statNo5 = stat.childNodes[8].nextSibling;

  if (
    !incNoDone &&
    scroll >= stats.offsetTop - 600 &&
    window.innerWidth > 450
  ) {
    incAllNos(statNo1, statNo2, statNo3, statNo4, statNo5);
  } else if (
    !incNoDone &&
    scroll >= stats.offsetTop - 750 &&
    window.innerWidth <= 450
  ) {
    console.log(stats.offsetTop);
    incAllNos(statNo1, statNo2, statNo3, statNo4, statNo5);
  }
};

const incNo = (i, last, elem, speed) => {
  if (i <= last) {
    elem.innerHTML = i;
    setTimeout(() => {
      incNo(i + 1, last, elem);
    }, 10);
  } else if (i > last) {
    elem.innerHTML += "+";
  }
};

const incAllNos = (statNo1, statNo2, statNo3, statNo4, statNo5) => {
  incNoDone = true;
  incNo(0, 101, statNo1.childNodes[0].nextSibling);
  incNo(0, 200, statNo2.childNodes[0].nextSibling);
  incNo(0, 5, statNo3.childNodes[0].nextSibling);
  incNo(0, 40, statNo4.childNodes[0].nextSibling);
  incNo(0, 10, statNo5.childNodes[0].nextSibling);
};

// Carousel

const indicators = document.querySelectorAll(".slider .indicators .indicator");
const arrowPrev = document.querySelector(".slider .arrows .arrow-prev");
const arrowNext = document.querySelector(".slider .arrows .arrow-next");

const handleIndicatorClick = (event) => {
  const indicator = event.target;
  if (!isActive(indicator)) {
    removeActive();
    addActive(indicator);
    showSlide(indicator.dataset.slide);
  }
};

const handlePrevArrowClick = (event) => {
  let activeSlide = 0;
  let newActiveSlide = indicators.length;
  let ready = false;

  indicators.forEach((indicator) => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide;
      if (activeSlide !== "1") {
        newActiveSlide = parseInt(activeSlide) - 1;
      }
      removeActive();
      addActive(
        document.querySelector(
          `.slider .indicators [data-slide='${newActiveSlide}']`
        )
      );
      showSlide(newActiveSlide);
      ready = true;
    }
  });
};

const handleNextArrowClick = (event) => {
  let activeSlide = 0;
  let newActiveSlide = 1;
  let ready = false;

  indicators.forEach((indicator) => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide;
      if (activeSlide !== indicators.length.toString()) {
        newActiveSlide = parseInt(activeSlide) + 1;
      }
      removeActive();
      addActive(
        document.querySelector(
          `.slider .indicators [data-slide='${newActiveSlide}']`
        )
      );
      showSlide(newActiveSlide);
      ready = true;
    }
  });
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", handleIndicatorClick);
});

arrowPrev.addEventListener("click", handlePrevArrowClick);
arrowNext.addEventListener("click", handleNextArrowClick);

const isActive = (indicator) => {
  return indicator.hasAttribute("active");
};

const removeActive = () => {
  document.querySelectorAll(".slider .indicators [active]").forEach((item) => {
    item.removeAttribute("active");
  });
};

const addActive = (indicator) => {
  indicator.setAttribute("active", "");
};

const showSlide = (newActiveSlide) => {
  const newPosition = (100 * (newActiveSlide - 1)).toString();
  document.querySelector(".slider-inner").style.marginLeft = `-${newPosition}%`;
};

const carouselAnimateOnScroll = () => {
  let i = 1;
  setInterval(() => {
    if (i > indicators.length - 1) i = 1;
    else i++;

    removeActive();
    addActive(indicators[i - 1]);
    showSlide(i);
  }, 3000);
};

carouselAnimateOnScroll();

// Modal

const modal = document.getElementById("modal");

const openModal = () => {
  modal.style.display = "block";
};

const openModalWithMessage = (header, body, topic, speakers) => {
  const nameArr = header.split(" ");
  const [, ...rest] = nameArr;
  const restName = rest.join(" ");
  header = `<span>${nameArr[0]}</span> ${restName}`;
  const fullBody = `
  ${topic !== "undefined" ? `<h5><span>Topic:</span> ${topic}</h5>` : ""}
  ${
    speakers !== "undefined"
      ? `<h5><span>Speaker(s):</span> ${speakers}</h5>`
      : ""
  }
  ${body}
  `;
  document.getElementById("modalHeader").innerHTML = header;
  document.getElementById("modalBody").innerHTML = fullBody;
  modal.style.display = "block";
};

const closeModal = () => {
  document.getElementById("modalHeader").innerHTML = "";
  document.getElementById("modalBody").innerHTML = "";
  modal.style.display = "none";
};

// Window functions

window.onscroll = function () {
  let scroll = window.scrollY;

  navChangeOnScroll(scroll);
  statsAnimateOnScroll(scroll);
};
