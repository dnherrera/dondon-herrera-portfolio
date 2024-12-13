document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const allSections = document.querySelectorAll("section");
  const allNavLinks = document.querySelectorAll('.nav-menu ul li a, .navbar ul li a');

  function removeHighlight() {
    allNavLinks.forEach(function (link) {
      link.classList.remove('active-link');
    });
  }

  function highlightLink(href) {
    removeHighlight(); 
    const matchingLinks = document.querySelectorAll(`a[href="${href}"]`);
    matchingLinks.forEach(function (link) {
      // Add highlight to the clicked link
      link.classList.add('active-link');  
    });
  }

  // Add click event to each navigation link
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent the default link behavior
      const href = this.getAttribute('href'); 
      const targetElement = document.querySelector(href); 

       // Smoothly scroll to the section
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
        highlightLink(href);
      }
    });
  });

  // Scroll event to handle highlighting based on scroll position
  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;  // Current scroll position

    // Hide or show the navbar based on scroll position
    if (scrollPosition > 100) {
      navbar.style.top = "10px";  // Show navbar when scrolled down
    } else {
      navbar.style.top = "-100px";  // Hide navbar when at the top
    }

    // Remove highlight when the page is at the very top
    if (scrollPosition === 0) {
      removeHighlight();
      return;
    }

    // Loop through all sections to find the one currently in view
    allSections.forEach(function (section) {
      const sectionTop = section.offsetTop;  // top position of the section
      const sectionHeight = section.offsetHeight;  // height of the section
      const sectionId = `#${section.getAttribute("id")}`;  // id of the section

      // check if the scroll position is within the range of the section
      if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
        highlightLink(sectionId); 
      }
    });
  });
});


// Add keyboard event listener for arrow keys 
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    plusSlides(1);
  } else if (event.key === "ArrowLeft") {
    plusSlides(-1);
  }
});

let slideIndex = 1;
const slidesLength = 12;
let currentSet = 0;

showSlides(slideIndex);

function plusSlides(n) {
  slideIndex += n;
  if (slideIndex > slidesLength) slideIndex = 1;
  else if (slideIndex < 1) slideIndex = slidesLength;

  const newSet = Math.floor((slideIndex - 1) / 6);
  if (newSet !== currentSet) {
    showThumbnailSlides(slideIndex, n, newSet);
    currentSet = newSet;
  }

  showSlides(slideIndex);
}


function currentSlide(element) {
  const dots = document.getElementsByClassName("thumb");

  // Loop through the dots and attach click event listeners
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function (event) {

      const src = event.target.src; 
      const imageName = src.substring(src.lastIndexOf('/') + 1);
      const imageNameWithoutExtension = imageName.replace('.JPG', '').replace('.jpg', ''); // Handle lowercase too

      // Convert the image name to a number and update the element
      const slideNumber = Number(imageNameWithoutExtension);
      if (!isNaN(slideNumber)) { // Ensure it's a valid number
        element = slideNumber;
        showSlides(slideIndex = element);
      }
    });
  }
}

function showSlides(n) {
  const dots = document.getElementsByClassName("thumb");
  const captionText = document.getElementById("caption");
  const img = document.getElementById("image-hobby");

  let imgDesc = [
    "Capturing Beauty: Chasing Cherry Blossoms in Jinhae",
    "Unleash Inner Warrior: Joining the Spartan Race",
    "Pedal Power: Thrilling Cycling Adventures",
    "Journey to the Land of the Rising Sun: Exploring Japan",
    "Dive into Adventure: Scuba Diving Wonders",
    "Banff Bound: Discovering Nature's Majesty",
    "Cultural Gems: Visiting Eunpyeong's Treasures",
    "Nature's Sculpture: Discovering Horseshoe Canyon",
    "A Date with History: Visiting Mesuem's Wonders",
    "Culinary Journeys: Embark on a Food Tripping Adventure",
    "Cultural Explorer: Experiencing the World's Diverse Cultures",
    "Hiking Heights: Conquering Nature's Trails"
  ];

  img.src = `images/hobby/${slideIndex}.JPG`;

  // Loop through the thumb elements only
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  dots[(slideIndex - 1) % dots.length].classList.add("active");

  // Assign the description to caption text
  captionText.innerHTML = imgDesc[(slideIndex - 1) % imgDesc.length];
}

function showThumbnailSlides(slideIndex, direction, set) {
  const thumbs = [
    "thumb-img-1",
    "thumb-img-2",
    "thumb-img-3",
    "thumb-img-4",
    "thumb-img-5",
    "thumb-img-6"
  ].map(id => document.getElementById(id));

  let count = 5;
  const updateThumbs = start => {
    thumbs.forEach((thumb, i) => {
      thumb.src = `images/hobby/${start + i}.JPG`;
    });
  };

  if (set === 1) {
    slideIndex === 7 ? updateThumbs(slideIndex) : updateThumbs(slideIndex - count);
  } else {
    slideIndex === 6 ? updateThumbs(slideIndex - count) : updateThumbs(slideIndex);
  }
}

// Cheat Sheet
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    panel.classList.toggle("open");
  });
}

// Set the initial max-height for the first panel to ensure it's open
document.addEventListener("DOMContentLoaded", function () {
  var firstPanel = document.querySelector(".panel");
  firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
});
