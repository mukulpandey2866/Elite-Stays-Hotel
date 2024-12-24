// // Function to calculate total cost by calling the backend API
// async function calculateTotal() {
//   const roomType = document.getElementById("room-type").value;
//   const duration = parseInt(document.getElementById("duration").value);
//   const season = document.getElementById("season").value;

//   // Send the payment data to the backend for calculation
//   const response = await fetch("http://127.0.0.1:5000/payments", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ room_type: roomType, duration, season }),
//   });

//   const result = await response.json();
//   if (result.success) {
//     // Update the total cost displayed on the page
//     document.getElementById("total-cost").textContent = `$${result.total_cost}`;
//   } else {
//     alert("Error calculating total cost: " + result.message);
//   }
// }

// // Payment form submission handler
// document.getElementById("payment-form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   // Send a payment confirmation to the backend
//   fetch("http://127.0.0.1:5000/payments/confirm", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ success: true }), // Send confirmation for payment processing
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.success) {
//         alert("Payment successfully processed!");
//         document.getElementById("payment-form").reset();
//       } else {
//         alert("Payment processing failed: " + result.message);
//       }
//     })
//     .catch((error) => {
//       alert("Error processing payment: " + error.message);
//     });
// });






function calculateTotal() {
  const roomType = document.getElementById("room-type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const season = document.getElementById("season").value;

  let roomPrice;

  // Set room price
  switch (roomType) {
    case "standard":
      roomPrice = 100;
      break;
    case "deluxe":
      roomPrice = 150;
      break;
    case "suite":
      roomPrice = 200;
      break;
  }

  if (season === "high") {
    roomPrice *= 1.5; // High season adds 50% more
  }

  const totalCost = roomPrice * duration;
  document.getElementById("total-cost").textContent = `$${totalCost.toFixed(
    2
  )}`;
}

document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Payment successfully processed!");

    document.getElementById("payment-form").reset();
  });
