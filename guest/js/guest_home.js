document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("auth-link");
  const protectedLinks = document.querySelectorAll(".protected-link");

  // Fetch the user data from backend
  fetch('/get_user', {
    method: 'GET',
    credentials: 'same-origin',  // Ensure session cookie is sent
  })
    .then(response => response.json())
    .then(data => {
      const user = data.user;

      if (user) {
        authLink.textContent = "Logout";
        authLink.href = "#";
        authLink.addEventListener("click", (e) => {
          e.preventDefault();
          const isConfirmed = confirm("Are you sure you want to logout?");
          if (isConfirmed) {
            // Call backend to log out and clear session
            fetch('/logout', { method: 'POST', credentials: 'same-origin' })
              .then(() => {
                window.location.href = "guest_home.html";  // Redirect to guest home
              });
          }
        });
      } else {
        authLink.textContent = "Sign Up / Login";
        authLink.href = "signup_login.html";  // Redirect to signup/login page if no user
      }

      // Protect links for authenticated users
      protectedLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          if (!user) {
            e.preventDefault();
            alert("Please sign up or log in to access this page.");
            window.location.href = "signup_login.html";  // Redirect to login page
          }
        });
      });
    })
    .catch((err) => {
      console.error('Error fetching user data:', err);
    });

  // Slideshow functionality for hero images
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  let slideIndex = 0;

  function showSlide() {
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }

    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  showSlide();

  setInterval(showSlide, 5000);
});









// document.addEventListener("DOMContentLoaded", () => {
//   const authLink = document.getElementById("auth-link");
//   const protectedLinks = document.querySelectorAll(".protected-link");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user) {
//     authLink.textContent = "Logout";
//     authLink.href = "#";
//     authLink.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isConfirmed = confirm("Are you sure you want to logout?");
//       if (isConfirmed) {
//         localStorage.removeItem("user");
//         window.location.href = "guest_home.html";
//       }
//     });
//   } else {
//     authLink.textContent = "Sign Up / Login";
//     authLink.href = "signup_login.html";
//   }

//   protectedLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       if (!user) {
//         e.preventDefault();
//         alert("Please sign up or log in to access this page.");
//         window.location.href = "signup_login.html";
//       }
//     });
//   });

//   // Slideshow functionality for hero images
//   const slides = document.querySelectorAll(".slide");
//   const slidesContainer = document.querySelector(".slides");
//   let slideIndex = 0;

//   function showSlide() {
//     slideIndex++;
//     if (slideIndex >= slides.length) {
//       slideIndex = 0;
//     }

//     slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
//   }

//   showSlide();

//   setInterval(showSlide, 5000);
// });
