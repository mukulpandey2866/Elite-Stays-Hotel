document.addEventListener("DOMContentLoaded", () => {
  // Check-in form submission
  document.getElementById("checkin-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const checkinData = {
      name: document.getElementById("checkin-name").value,
      room: document.getElementById("checkin-room").value,
      date: document.getElementById("checkin-date").value,
    };

    if (!checkinData.name || !checkinData.room || !checkinData.date) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkinData),
      });

      if (response.ok) {
        alert("Check-in data saved successfully!");
        document.getElementById("checkin-form").reset();
      } else {
        alert("Failed to save check-in data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Check-out form submission
  document.getElementById("checkout-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const checkoutData = {
      name: document.getElementById("checkout-name").value,
      room: document.getElementById("checkout-room").value,
      date: document.getElementById("checkout-date").value,
    };

    if (!checkoutData.name || !checkoutData.room || !checkoutData.date) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        alert("Check-out data saved successfully!");
        document.getElementById("checkout-form").reset();
      } else {
        alert("Failed to save check-out data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
});

















// document.addEventListener("DOMContentLoaded", () => {
//   // Check-in form submission
//   document.getElementById("checkin-form").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     let checkinData = {
//       name: document.getElementById("checkin-name").value,
//       room: document.getElementById("checkin-room").value,
//       date: document.getElementById("checkin-date").value,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/checkin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkinData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Check-in data saved successfully!");
//       } else {
//         alert(data.message || "Error saving check-in data.");
//       }

//       // Clear form after submission
//       document.getElementById("checkin-form").reset();
//     } catch (error) {
//       alert("An error occurred while saving check-in data.");
//       console.error(error);
//     }
//   });

//   // Checkout form submission
//   document.getElementById("checkout-form").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     let checkoutData = {
//       name: document.getElementById("checkout-name").value,
//       room: document.getElementById("checkout-room").value,
//       date: document.getElementById("checkout-date").value,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkoutData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Checkout data saved successfully!");
//       } else {
//         alert(data.message || "Error saving checkout data.");
//       }

//       // Clear form after submission
//       document.getElementById("checkout-form").reset();
//     } catch (error) {
//       alert("An error occurred while saving checkout data.");
//       console.error(error);
//     }
//   });

//   const bookingForm = document.getElementById("booking-form");
//   const errorMessage = document.getElementById("error-message");
//   const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Check if user is logged in
//   if (user) {
//     authLink.textContent = "Logout";
//     authLink.href = "#";
//     authLink.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isConfirmed = confirm("Are you sure you want to logout?");
//       if (isConfirmed) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("checkinData");
//         localStorage.removeItem("checkoutData");
//         window.location.href = "guest_home.html";
//       }
//     });
//   } else {
//     authLink.textContent = "Sign Up / Login";
//     authLink.href = "signup_login.html";
//   }

//   bookingForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const roomType = document.getElementById("room-type").value;
//     const checkInDate = document.getElementById("check-in").value;
//     const checkOutDate = document.getElementById("check-out").value;

//     if (!name || !email || !roomType || !checkInDate || !checkOutDate) {
//       errorMessage.textContent = "Please fill in all fields.";
//       errorMessage.style.display = "block";
//       return;
//     }

//     const bookingData = {
//       name,
//       email,
//       roomType,
//       checkInDate,
//       checkOutDate,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Form submitted successfully! Your booking data has been saved.");
//       } else {
//         errorMessage.textContent = data.message || "Error saving booking data.";
//         errorMessage.style.display = "block";
//       }
//     } catch (error) {
//       alert("An error occurred while saving the booking.");
//       console.error(error);
//     }

//     bookingForm.reset();
//     errorMessage.style.display = "none";
//   });
// });








// document.addEventListener("DOMContentLoaded", () => {
//   // Check-in form submission
//   document
//     .getElementById("checkin-form")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();

//       let checkinData = {
//         name: document.getElementById("checkin-name").value,
//         room: document.getElementById("checkin-room").value,
//         date: document.getElementById("checkin-date").value,
//       };

//       localStorage.setItem("checkinData", JSON.stringify(checkinData));
//       alert("Check-in data saved successfully!");

//       // Clear form after submission
//       document.getElementById("checkin-form").reset();
//     });

//   // Checkout form submission
//   document
//     .getElementById("checkout-form")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();

//       let checkoutData = {
//         name: document.getElementById("checkout-name").value,
//         room: document.getElementById("checkout-room").value,
//         date: document.getElementById("checkout-date").value,
//       };

//       localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
//       alert("Checkout data saved successfully!");

//       // Clear form after submission
//       document.getElementById("checkout-form").reset();
//     });

//   const bookingForm = document.getElementById("booking-form");
//   const errorMessage = document.getElementById("error-message");
//   const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Check if user is logged in
//   if (user) {
//     // Show the logout button
//     authLink.textContent = "Logout";
//     authLink.href = "#";
//     authLink.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isConfirmed = confirm("Are you sure you want to logout?");
//       if (isConfirmed) {
//         localStorage.removeItem("user"); // Remove user data from localStorage
//         localStorage.removeItem("checkinData"); // Remove check-in data from localStorage
//         localStorage.removeItem("checkoutData"); // Remove checkout data from localStorage
//         window.location.href = "guest_home.html";
//       }
//     });
//   } else {
//     authLink.textContent = "Sign Up / Login";
//     authLink.href = "signup_login.html";
//   }

//   bookingForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const roomType = document.getElementById("room-type").value;
//     const checkInDate = document.getElementById("check-in").value;
//     const checkOutDate = document.getElementById("check-out").value;

//     if (!name || !email || !roomType || !checkInDate || !checkOutDate) {
//       errorMessage.textContent = "Please fill in all fields.";
//       errorMessage.style.display = "block";
//       return;
//     }

//     const bookingData = {
//       name,
//       email,
//       roomType,
//       checkInDate,
//       checkOutDate,
//     };

//     localStorage.setItem("bookingData", JSON.stringify(bookingData));

//     alert("Form submitted successfully! Your booking data has been saved.");

//     bookingForm.reset();
//     errorMessage.style.display = "none";
//   });
// });
