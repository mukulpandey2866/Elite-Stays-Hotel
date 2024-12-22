document.addEventListener("DOMContentLoaded", () => {
    // Service form submission
    document.getElementById('service-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the values from the form
        const roomNumber = document.getElementById('room-number').value;
        const serviceType = document.getElementById('service-type').value;
        const serviceDetails = document.getElementById('service-details').value;

        // Validation: Check if all fields are filled
        if (!roomNumber || !serviceType || !serviceDetails) {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        // Create an object to store the service request data
        const serviceRequest = {
            roomNumber,
            serviceType,
            serviceDetails,
            timestamp: new Date().toISOString() // Save the timestamp
        };

        // Send the service request data to the backend using fetch
        fetch('/submit_service_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceRequest),
        })
        .then(response => response.json())
        .then(data => {
            // Show success message
            if (data.status === 'success') {
                showMessage('Service request has been submitted successfully!', 'success');
            } else {
                showMessage('Error submitting service request.', 'error');
            }

            // Reset the form
            document.getElementById('service-form').reset();
        })
        .catch(error => {
            showMessage('An error occurred. Please try again later.', 'error');
        });
    });

    // Function to show message (success/error)
    function showMessage(message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
    }

    // Logout functionality
    const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Show the logout button
        authLink.textContent = "Logout";
        authLink.href = "#";
        authLink.addEventListener("click", (e) => {
            e.preventDefault();
            const isConfirmed = confirm("Are you sure you want to logout?");
            if (isConfirmed) {
                localStorage.removeItem("user");  // Remove user data from localStorage
                window.location.href = "guest_home.html";  // Redirect to home screen
            }
        });
    } else {
        // If the user is not logged in, show "Sign Up / Login"
        authLink.textContent = "Sign Up / Login";
        authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
    }
});











// document.addEventListener("DOMContentLoaded", () => {
//     // Service form submission
//     document.getElementById('service-form').addEventListener('submit', function (e) {
//         e.preventDefault();

//         // Get the values from the form
//         const roomNumber = document.getElementById('room-number').value;
//         const serviceType = document.getElementById('service-type').value;
//         const serviceDetails = document.getElementById('service-details').value;

//         // Validation: Check if all fields are filled
//         if (!roomNumber || !serviceType || !serviceDetails) {
//             showMessage('Please fill out all fields.', 'error');
//             return;
//         }

//         // Create an object to store the service request data
//         const serviceRequest = {
//             roomNumber,
//             serviceType,
//             serviceDetails,
//             timestamp: new Date().toISOString() // Save the timestamp
//         };

//         // Save the service request data in localStorage (or send to a server)
//         localStorage.setItem('serviceRequest', JSON.stringify(serviceRequest));

//         // Show success message
//         showMessage('Service request has been submitted successfully!', 'success');

//         // Reset the form
//         document.getElementById('service-form').reset();
//     });

//     // Function to show message (success/error)
//     function showMessage(message, type) {
//         const messageElement = document.getElementById('message');
//         messageElement.textContent = message;
//         messageElement.className = `message ${type}`;
//     }

//     // Logout functionality
//     const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//         // Show the logout button
//         authLink.textContent = "Logout";
//         authLink.href = "#";
//         authLink.addEventListener("click", (e) => {
//             e.preventDefault();
//             const isConfirmed = confirm("Are you sure you want to logout?");
//             if (isConfirmed) {
//                 localStorage.removeItem("user");  // Remove user data from localStorage
//                 localStorage.removeItem("serviceRequest"); // Remove service request data from localStorage
//                 window.location.href = "guest_home.html";  // Redirect to home screen
//             }
//         });
//     } else {
//         // If the user is not logged in, show "Sign Up / Login"
//         authLink.textContent = "Sign Up / Login";
//         authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
//     }
// });
