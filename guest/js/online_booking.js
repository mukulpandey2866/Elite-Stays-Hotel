document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById('booking-form');
    const errorMessage = document.getElementById('error-message');
    const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if user is logged in
    if (user) {
        authLink.textContent = "Logout";
        authLink.href = "#";
        authLink.addEventListener("click", (e) => {
            e.preventDefault();
            const isConfirmed = confirm("Are you sure you want to logout?");
            if (isConfirmed) {
                localStorage.removeItem("user");  // Remove user data from localStorage
                window.location.href = "guest_home.html";  // Redirect to home screen (index.html or another page)
            }
        });
    } else {
        authLink.textContent = "Sign Up / Login";
        authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
    }

    // Event listener for form submission
    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get values from the form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const roomType = document.getElementById('room-type').value;
        const checkInDate = document.getElementById('check-in').value;
        const checkOutDate = document.getElementById('check-out').value;

        // Check if all fields are filled
        if (!name || !email || !roomType || !checkInDate || !checkOutDate) {
            errorMessage.textContent = "Please fill in all fields.";
            errorMessage.style.display = "block";
            return;
        }

        // Create an object to store the data
        const bookingData = {
            name,
            email,
            roomType,
            checkInDate,
            checkOutDate
        };

        try {
            // Send the booking data to the backend (POST request)
            const response = await fetch("/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Form submitted successfully! Your booking has been saved.');
                bookingForm.reset();
                errorMessage.style.display = "none"; // Hide the error message
            } else {
                throw new Error(result.message || "Failed to submit booking");
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });
});









// document.addEventListener("DOMContentLoaded", () => {
//     const bookingForm = document.getElementById('booking-form');
//     const errorMessage = document.getElementById('error-message');
//     const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//     const user = JSON.parse(localStorage.getItem("user"));

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

//     // Event listener for form submission
//     bookingForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent the default form submission

//         // Get values from the form
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const roomType = document.getElementById('room-type').value;
//         const checkInDate = document.getElementById('check-in').value;
//         const checkOutDate = document.getElementById('check-out').value;

//         // Check if all fields are filled
//         if (!name || !email || !roomType || !checkInDate || !checkOutDate) {
//             errorMessage.textContent = "Please fill in all fields.";
//             errorMessage.style.display = "block";
//             return;
//         }

//         // Create an object to store the data
//         const bookingData = {
//             name,
//             email,
//             roomType,
//             checkInDate,
//             checkOutDate
//         };

//         // Save data to localStorage
//         localStorage.setItem('bookingData', JSON.stringify(bookingData));

//         // Show success message
//         alert('Form submitted successfully! Your booking data has been saved.');

//         // Optionally, reset the form
//         bookingForm.reset();
//         errorMessage.style.display = "none"; // Hide the error message if form is successful
//     });
// });
