document.addEventListener("DOMContentLoaded", () => {
    const authLink = document.getElementById("auth-link"); // Sign Up/Login or Logout link

    // Fetch user data from the backend (using fetch to check login status)
    fetch('/check_login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        const user = data.user;
        if (user) {
            // Show the logout button
            authLink.textContent = "Logout";
            authLink.href = "#";
            authLink.addEventListener("click", (e) => {
                e.preventDefault();
                const isConfirmed = confirm("Are you sure you want to logout?");
                if (isConfirmed) {
                    // Send logout request to the backend
                    fetch('/logout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(response => response.json())
                    .then(data => {
                        window.location.href = "guest_home.html";  // Redirect to home screen
                    });
                }
            });
        } else {
            // If the user is not logged in, show "Sign Up / Login"
            authLink.textContent = "Sign Up / Login";
            authLink.href = "signup_login.html";  // Redirect to the signup/login page if not logged in
        }
    });

    // Handle the payment form submission
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form input values
        const roomType = document.getElementById('room-type').value;
        const numRooms = document.getElementById('num-rooms').value;
        const serviceType = document.getElementById('service-type').value;
        const cardHolder = document.getElementById('card-holder').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Room price calculation
        let roomPrice = 0;
        let servicePrice = serviceType === "included" ? "Included" : "Not Included";
        let totalAmount = 0;

        if (roomType === "standard") {
            roomPrice = 100;
        } else if (roomType === "deluxe") {
            roomPrice = 150;
        } else if (roomType === "suite") {
            roomPrice = 200;
        }

        // Calculate base total price
        totalAmount = roomPrice * numRooms;

        // If service is included, apply 50% extra charge
        if (serviceType === "included") {
            totalAmount = totalAmount * 1.5; // 50% increase
        }

        // Validation
        if (!roomType || !numRooms || !serviceType || !cardHolder || !cardNumber || !expiryDate || !cvv) {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        // Simple validation for card number and CVV
        if (cardNumber.length !== 16) {
            showMessage('Card number should be 16 digits long.', 'error');
            return;
        }

        if (cvv.length !== 3) {
            showMessage('CVV should be 3 digits long.', 'error');
            return;
        }

        // Send payment data to the backend
        const paymentData = {
            roomType,
            numRooms,
            serviceType,
            cardHolder,
            cardNumber,
            expiryDate,
            cvv,
            totalAmount
        };

        fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Payment successful! Thank you for your booking.', 'success');
            } else {
                showMessage('Payment failed! Please try again.', 'error');
            }
        });

        // Clear the form fields after 5 seconds
        setTimeout(function () {
            document.getElementById('payment-form').reset(); // Reset the form
            document.getElementById('message').style.display = 'none'; // Hide the message
        }, 5000);
    });

    // Recalculate price when room type or service is changed
    document.getElementById('room-type').addEventListener('change', updatePrice);
    document.getElementById('service-type').addEventListener('change', updatePrice);
    document.getElementById('num-rooms').addEventListener('input', updatePrice);

    function updatePrice() {
        const roomType = document.getElementById('room-type').value;
        const numRooms = document.getElementById('num-rooms').value;
        const serviceType = document.getElementById('service-type').value;

        let roomPrice = 0;

        if (roomType === "standard") {
            roomPrice = 100;
        } else if (roomType === "deluxe") {
            roomPrice = 150;
        } else if (roomType === "suite") {
            roomPrice = 200;
        }

        let totalAmount = roomPrice * numRooms;

        if (serviceType === "included") {
            totalAmount = totalAmount * 1.5; // 50% increase for service
        }

        document.getElementById('total-price').textContent = `$${roomPrice * numRooms}`;
        document.getElementById('service-price').textContent = serviceType === "included" ? "Included" : "Not Included";
        document.getElementById('final-amount').textContent = totalAmount.toFixed(2);
    }

    function showMessage(message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
    }
});








// document.addEventListener("DOMContentLoaded", () => {
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

//     // Handle the payment form submission
//     document.getElementById('payment-form').addEventListener('submit', function (e) {
//         e.preventDefault();

//         // Get form input values
//         const roomType = document.getElementById('room-type').value;
//         const numRooms = document.getElementById('num-rooms').value;
//         const serviceType = document.getElementById('service-type').value;
//         const cardHolder = document.getElementById('card-holder').value;
//         const cardNumber = document.getElementById('card-number').value;
//         const expiryDate = document.getElementById('expiry-date').value;
//         const cvv = document.getElementById('cvv').value;

//         // Room price calculation
//         let roomPrice = 0;
//         let servicePrice = serviceType === "included" ? "Included" : "Not Included";
//         let totalAmount = 0;

//         if (roomType === "standard") {
//             roomPrice = 100;
//         } else if (roomType === "deluxe") {
//             roomPrice = 150;
//         } else if (roomType === "suite") {
//             roomPrice = 200;
//         }

//         // Calculate base total price
//         totalAmount = roomPrice * numRooms;

//         // If service is included, apply 50% extra charge
//         if (serviceType === "included") {
//             totalAmount = totalAmount * 1.5; // 50% increase
//         }

//         // Display room service and total amount
//         document.getElementById('total-price').textContent = `$${roomPrice * numRooms}`;
//         document.getElementById('service-price').textContent = servicePrice;
//         document.getElementById('final-amount').textContent = totalAmount.toFixed(2);

//         // Validation
//         if (!roomType || !numRooms || !serviceType || !cardHolder || !cardNumber || !expiryDate || !cvv) {
//             showMessage('Please fill out all fields.', 'error');
//             return;
//         }

//         // Simple validation for card number and CVV
//         if (cardNumber.length !== 16) {
//             showMessage('Card number should be 16 digits long.', 'error');
//             return;
//         }

//         if (cvv.length !== 3) {
//             showMessage('CVV should be 3 digits long.', 'error');
//             return;
//         }

//         // Simulating successful payment
//         showMessage('Payment successful! Thank you for your booking.', 'success');

//         // Clear the form fields after 5 seconds
//         setTimeout(function () {
//             document.getElementById('payment-form').reset(); // Reset the form
//             document.getElementById('message').style.display = 'none'; // Hide the message
//         }, 5000);
//     });

//     // Recalculate price when room type or service is changed
//     document.getElementById('room-type').addEventListener('change', updatePrice);
//     document.getElementById('service-type').addEventListener('change', updatePrice);
//     document.getElementById('num-rooms').addEventListener('input', updatePrice);

//     function updatePrice() {
//         const roomType = document.getElementById('room-type').value;
//         const numRooms = document.getElementById('num-rooms').value;
//         const serviceType = document.getElementById('service-type').value;

//         let roomPrice = 0;

//         if (roomType === "standard") {
//             roomPrice = 100;
//         } else if (roomType === "deluxe") {
//             roomPrice = 150;
//         } else if (roomType === "suite") {
//             roomPrice = 200;
//         }

//         let totalAmount = roomPrice * numRooms;

//         if (serviceType === "included") {
//             totalAmount = totalAmount * 1.5; // 50% increase for service
//         }

//         document.getElementById('total-price').textContent = `$${roomPrice * numRooms}`;
//         document.getElementById('service-price').textContent = serviceType === "included" ? "Included" : "Not Included";
//         document.getElementById('final-amount').textContent = totalAmount.toFixed(2);
//     }

//     function showMessage(message, type) {
//         const messageElement = document.getElementById('message');
//         messageElement.textContent = message;
//         messageElement.className = `message ${type}`;
//         messageElement.style.display = 'block';
//     }
// });
