document.addEventListener("DOMContentLoaded", function () {
  // Ensure DOM is fully loaded before running script
  document.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const scrollPosition = window.scrollY; // Current scroll position

    // Show the navbar when scrolled down 100px or more
    if (scrollPosition > 100) {
      navbar.style.top = "10px"; // Bring navbar into view
    } else {
      navbar.style.top = "-100px"; // Hide navbar above the viewport
    }
  });

  // Function to remove highlighting from all links
  function removeHighlight() {
    const allLinks = document.querySelectorAll('.nav-menu ul li a, .navbar ul li a');
    allLinks.forEach(link => link.classList.remove('active-link'));
  }

  // Function to handle link highlighting
  function highlightLink(href) {
    removeHighlight(); // Remove existing highlights

    // Highlight links only if not on landing page
    if (href !== "#landing-page-section") {
      const matchingLinks = document.querySelectorAll(`a[href="${href}"]`);
      matchingLinks.forEach(link => link.classList.add('active-link'));
    }
  }

  // Add click event listener to all nav-menu and navbar links
  const navMenuLinks = document.querySelectorAll('.nav-menu ul li a');
  const navbarLinks = document.querySelectorAll('.navbar ul li a');
  const allNavLinks = [...navMenuLinks, ...navbarLinks];

  allNavLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default action (scrolling)

      const href = this.getAttribute('href');
      highlightLink(href);

      // Scroll to the target section
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initial highlighting based on current scroll position
  function initialHighlight() {
    removeHighlight(); // Ensure no links are highlighted on page load
  }

  initialHighlight();
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


// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

function currentSlide(element) {
  const dots = document.getElementsByClassName("thumb");

  // Loop through the dots and attach click event listeners
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function (event) {
      // Get the source of the clicked image
      const src = event.target.src; // More robust than dots[i]
      const imageName = src.substring(src.lastIndexOf('/') + 1);
      const imageNameWithoutExtension = imageName.replace('.JPG', '').replace('.jpg', ''); // Handle lowercase too

      // Convert the image name to a number and update the element
      const slideNumber = Number(imageNameWithoutExtension);
      if (!isNaN(slideNumber)) { // Ensure it's a valid number
        element = slideNumber;
        showSlides(slideIndex = element); // Show the appropriate slide
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
