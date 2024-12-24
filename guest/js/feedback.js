

document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById('feedback-form');
  const successMessage = document.getElementById('success-message');
  const authLink = document.getElementById("auth-link");
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is logged in
  if (user) {
      authLink.textContent = "Logout";
      authLink.href = "#";
      authLink.addEventListener("click", (e) => {
          e.preventDefault();
          const isConfirmed = confirm("Are you sure you want to logout?");
          if (isConfirmed) {
              localStorage.removeItem("user");
              window.location.href = "guest_home.html";
          }
      });
  } else {
      authLink.textContent = "Sign Up / Login";
      authLink.href = "signup_login.html";
  }

  // Feedback form submission handling
  feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const rating = document.getElementById('rating').value;
      const review = document.getElementById('review').value;

      if (!name || !email || !rating || !review) {
          alert("Please fill in all the fields.");
          return;
      }

      const feedback = { name, email, rating, review };

      try {
          const response = await fetch('http://127.0.0.1:5000/feedback', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(feedback),
          });

          if (response.ok) {
              successMessage.classList.remove('hidden');
              feedbackForm.reset();

              setTimeout(() => {
                  successMessage.classList.add('hidden');
              }, 5000);
          } else {
              alert("Failed to save feedback. Please try again.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
  });
});











// document.addEventListener("DOMContentLoaded", () => {
//     const feedbackForm = document.getElementById('feedback-form');
//     const successMessage = document.getElementById('success-message');
//     const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//     const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  
//     // Check if user is logged in
//     if (user) {
//       authLink.textContent = "Logout";
//       authLink.href = "#";
//       authLink.addEventListener("click", (e) => {
//         e.preventDefault();
//         const isConfirmed = confirm("Are you sure you want to logout?");
//         if (isConfirmed) {
//           localStorage.removeItem("user");  // Remove user data from localStorage
//           window.location.href = "guest_home.html";  // Redirect to home screen (index.html or another page)
//         }
//       });
//     } else {
//       authLink.textContent = "Sign Up / Login";
//       authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
//     }
  
//     // Feedback form submission handling
//     feedbackForm.addEventListener('submit', async (event) => {
//       event.preventDefault();
  
//       // Get form values
//       const name = document.getElementById('name').value;
//       const email = document.getElementById('email').value;
//       const rating = document.getElementById('rating').value;
//       const review = document.getElementById('review').value;
  
//       // Check if all fields are filled
//       if (!name || !email || !rating || !review) {
//         alert("Please fill in all the fields.");
//         return;
//       }
  
//       // Prepare feedback data to send
//       const feedback = { name, email, rating, review };
  
//       try {
//         const response = await fetch("http://127.0.0.1:5000/feedback", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(feedback),
//         });
  
//         const data = await response.json();
//         if (response.ok) {
//           // Show success message
//           successMessage.classList.remove('hidden');
//           setTimeout(() => {
//             successMessage.classList.add('hidden');
//           }, 5000);
//         } else {
//           alert(data.message || "Error saving feedback.");
//         }
  
//         // Optionally reset the form
//         feedbackForm.reset();
  
//       } catch (error) {
//         alert("An error occurred while saving feedback.");
//         console.error(error);
//       }
//     });
//   });
  
  
  
  
  
  
  
  
//   document.addEventListener("DOMContentLoaded", () => {
//     const feedbackForm = document.getElementById('feedback-form');
//     const successMessage = document.getElementById('success-message');
//     const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//     const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

//     // Check if user is logged in
//     if (user) {
//         // Show the logout button
//         authLink.textContent = "Logout";
//         authLink.href = "#";
//         authLink.addEventListener("click", (e) => {
//             e.preventDefault();
//             const isConfirmed = confirm("Are you sure you want to logout?");
//             if (isConfirmed) {
//                 localStorage.removeItem("user");  // Remove user data from localStorage
//                 window.location.href = "guest_home.html";  // Redirect to home screen (index.html or another page)
//             }
//         });
//     } else {
//         // If the user is not logged in, show "Sign Up / Login"
//         authLink.textContent = "Sign Up / Login";
//         authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
//     }

//     // Feedback form submission handling
//     feedbackForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         // Get form values
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const rating = document.getElementById('rating').value;
//         const review = document.getElementById('review').value;

//         // Check if all fields are filled
//         if (!name || !email || !rating || !review) {
//             alert("Please fill in all the fields.");
//             return;
//         }

//         // Save feedback to localStorage (or send to server if needed)
//         const feedback = { name, email, rating, review };
//         localStorage.setItem('feedback', JSON.stringify(feedback));

//         // Show success message
//         successMessage.classList.remove('hidden');

//         // Optionally reset the form
//         feedbackForm.reset();

//         // Hide success message after 5 seconds
//         setTimeout(() => {
//             successMessage.classList.add('hidden');
//         }, 5000);
//     });
// });
