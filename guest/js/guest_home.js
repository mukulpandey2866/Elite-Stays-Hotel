document.addEventListener("DOMContentLoaded", async () => {
  const logoutBtn = document.getElementById("logout-btn");
  const authLink = document.getElementById("auth-link");

  try {
    const response = await fetch("http://127.0.0.1:5000/guest_home");
    const data = await response.json();

    if (response.ok && data.loggedIn) {
      // User is logged in
      logoutBtn.style.display = "inline-block"; // Show logout button
      authLink.style.display = "none"; // Hide signup/login link
    } else {
      logoutBtn.style.display = "none"; // Hide logout button
      authLink.style.display = "inline-block"; // Show signup/login link
    }

    // Logout logic
    logoutBtn.addEventListener("click", async () => {
      const logoutResponse = await fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const logoutData = await logoutResponse.json();
      if (logoutResponse.ok) {
        alert(logoutData.message);
        window.location.href = "signup_login.html";
      } else {
        alert("Error during logout.");
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});








// // 
// document.addEventListener("DOMContentLoaded", async () => {
//   const logoutBtn = document.getElementById("logout-btn");
//   const authLink = document.getElementById("auth-link");

//   // Check if the user is logged in
//   const response = await fetch('http://127.0.0.1:5000/guest_home', { method: 'GET' });
//   const data = await response.json();

//   if (response.ok && data.loggedIn) {
//     // User is logged in, show the logout button
//     logoutBtn.style.display = "inline-block";
//     authLink.style.display = "none"; // Hide the login/signup link
//   } else {
//     // User is not logged in, show the login/signup link
//     logoutBtn.style.display = "none";
//     authLink.style.display = "inline-block";
//   }

//   // Logout function
//   async function logout() {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         // Redirect to login/signup page
//         window.location.href = "signup_login.html";
//       } else {
//         alert("Error during logout.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error occurred during logout. Please try again.");
//     }
//   }
// });















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
