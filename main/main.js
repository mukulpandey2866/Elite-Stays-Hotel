document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("admin-btn");
  const modal = document.getElementById("admin-modal");
  const closeModal = document.getElementById("close-modal");
  const adminForm = document.getElementById("admin-form");
  const errorMessage = document.getElementById("error-message");

  // Show modal when admin button is clicked
  adminBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Close modal when close button is clicked
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    errorMessage.classList.add("hidden");
  });

  // Handle admin login form submission
  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      // Send login request to backend
      const response = await fetch("http://127.0.0.1:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Pass username and password
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, redirect to admin home
        window.location.href = "../admin/html/admin_home.html";
      } else {
        // If login fails, show error message
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = data.message || "Invalid credentials";
      }
    } catch (error) {
      // Handle network errors
      console.error("Error during login:", error);
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = "An error occurred. Please try again.";
    }
  });
});












// document.addEventListener("DOMContentLoaded", () => {
//   const adminBtn = document.getElementById("admin-btn");
//   const modal = document.getElementById("admin-modal");
//   const closeModal = document.getElementById("close-modal");
//   const adminForm = document.getElementById("admin-form");
//   const errorMessage = document.getElementById("error-message");

//   adminBtn.addEventListener("click", () => {
//     modal.classList.remove("hidden");
//   });

//   closeModal.addEventListener("click", () => {
//     modal.classList.add("hidden");
//     errorMessage.classList.add("hidden");
//   });

//   adminForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     try {
//       // Send login request to backend
//       const response = await fetch("http://127.0.0.1:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // If login is successful, redirect to admin home
//         window.location.href = "../admin/html/admin_home.html";
//       } else {
//         // If login fails, show error message
//         errorMessage.classList.remove("hidden");
//         errorMessage.textContent = data.message || "Invalid credentials";
//       }
//     } catch (error) {
//       // Handle network errors
//       console.error("Error during login:", error);
//       errorMessage.classList.remove("hidden");
//       errorMessage.textContent = "An error occurred. Please try again.";
//     }
//   });
// });






// // document.addEventListener("DOMContentLoaded", () => {
// //   const adminBtn = document.getElementById("admin-btn");
// //   const modal = document.getElementById("admin-modal");
// //   const closeModal = document.getElementById("close-modal");
// //   const adminForm = document.getElementById("admin-form");
// //   const errorMessage = document.getElementById("error-message");

// //   // admin credentials
// //   const ADMIN_USERNAME = "admin";
// //   const ADMIN_PASSWORD = "12345";

// //   adminBtn.addEventListener("click", () => {
// //     modal.classList.remove("hidden");
// //   });

// //   closeModal.addEventListener("click", () => {
// //     modal.classList.add("hidden");
// //     errorMessage.classList.add("hidden");
// //   });

// //   adminForm.addEventListener("submit", (e) => {
// //     e.preventDefault();

// //     const username = document.getElementById("username").value;
// //     const password = document.getElementById("password").value;

// //     if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
// //       window.location.href = "../admin/html/admin_home.html";
// //     } else {
// //       errorMessage.classList.remove("hidden");
// //     }
// //   });
// // });
