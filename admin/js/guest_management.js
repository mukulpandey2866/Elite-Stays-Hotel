// Function to save guest data to the backend (Python and MySQL)
async function saveGuest(guestData) {
  const response = await fetch("http://127.0.0.1:5000/guests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guestData),
  });

  const result = await response.json();
  alert(result.message);  // Show the response message from the server
}

// Function to render the guest list
async function renderGuests() {
  const guestList = document.getElementById("guest-list");
  guestList.innerHTML = "";

  const response = await fetch("http://127.0.0.1:5000/guests", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const guests = await response.json();
  guests.forEach((guest, index) => {
    const card = document.createElement("div");
    card.classList.add("guest-card");

    card.innerHTML = `
      <img src="${guest.photo}" alt="Guest Photo">
      <h3>${guest.name}</h3>
      <p><strong>Contact:</strong> ${guest.contact}</p>
      <p><strong>Preferences:</strong> ${guest.preferences}</p>
      <p><strong>Booking History:</strong> ${guest.booking_history.join(", ")}</p>
      <button class="btn modify-btn" onclick="handleModify(${index})">Modify</button>
      <button class="btn cancel-btn" onclick="handleDelete(${index})">Delete</button>
    `;
    guestList.appendChild(card);
  });
}

// Open the Add Guest form
function openAddGuestForm() {
  document.getElementById("add-guest-form").reset();
  document.getElementById("form-title").textContent = "Add New Guest";
  document.getElementById("submit-button").textContent = "Add Guest";
  document.getElementById("submit-button").removeAttribute("data-index");
  document.getElementById("add-guest-modal").style.display = "flex";
}

// Close the Add Guest form
function closeAddGuestForm() {
  document.getElementById("add-guest-modal").style.display = "none";
}

// Modify an existing guest
async function handleModify(index) {
  const guest = await fetch(`http://127.0.0.1:5000/guests/${index}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());

  document.getElementById("guest-name").value = guest.name;
  document.getElementById("guest-photo").value = guest.photo;
  document.getElementById("contact-info").value = guest.contact;
  document.getElementById("preferences").value = guest.preferences;
  document.getElementById("booking-history").value = guest.booking_history.join(", ");

  document.getElementById("form-title").textContent = "Modify Guest";
  document.getElementById("submit-button").textContent = "Save Changes";
  document.getElementById("submit-button").setAttribute("data-index", index);
  document.getElementById("add-guest-modal").style.display = "flex";
}

// Delete a guest
async function handleDelete(index) {
  if (confirm("Are you sure you want to delete this guest?")) {
    await fetch(`http://127.0.0.1:5000/guests/${index}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    renderGuests(); // Re-render the list after deletion
  }
}

// Initial render to load guests from the backend
renderGuests();

// Update form submission handler
document.getElementById("add-guest-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const guestData = {
    name: document.getElementById("guest-name").value,
    photo: document.getElementById("guest-photo").value,
    contact: document.getElementById("contact-info").value,
    preferences: document.getElementById("preferences").value,
    booking_history: document.getElementById("booking-history")
      .value.split(",")
      .map((item) => item.trim()),
  };

  saveGuest(guestData);
});






// let guests = JSON.parse(localStorage.getItem("guests")) || [];

// function openAddGuestForm() {
//   document.getElementById("add-guest-form").reset();
//   document.getElementById("form-title").textContent = "Add New Guest";
//   document.getElementById("submit-button").textContent = "Add Guest";
//   document.getElementById("submit-button").removeAttribute("data-index");
//   document.getElementById("add-guest-modal").style.display = "flex";
//   // Show the form when clicked
// }

// // Close the form
// function closeAddGuestForm() {
//   document.getElementById("add-guest-modal").style.display = "none";
//   // Hide the form when closing
// }

// // Render the guest list
// function renderGuests() {
//   const guestList = document.getElementById("guest-list");
//   guestList.innerHTML = "";

//   guests.forEach((guest, index) => {
//     const card = document.createElement("div");
//     card.classList.add("guest-card");

//     card.innerHTML = `
//       <img src="${guest.photo}" alt="Guest Photo">
//       <h3>${guest.name}</h3>
//       <p><strong>Contact:</strong> ${guest.contact}</p>
//       <p><strong>Preferences:</strong> ${guest.preferences}</p>
//       <p><strong>Booking History:</strong> ${guest.bookingHistory}</p>
//       <button class="btn modify-btn" onclick="handleModify(${index})">Modify</button>
//       <button class="btn cancel-btn" onclick="handleDelete(${index})">Delete</button>
//     `;
//     guestList.appendChild(card);
//   });
// }

// // Handle form submission (Add or Modify)
// document
//   .getElementById("add-guest-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const guestName = document.getElementById("guest-name").value;
//     const guestPhoto = document.getElementById("guest-photo").value;
//     const contactInfo = document.getElementById("contact-info").value;
//     const preferences = document.getElementById("preferences").value;
//     const bookingHistory = document.getElementById("booking-history").value;

//     const guestData = {
//       name: guestName,
//       photo: guestPhoto,
//       contact: contactInfo,
//       preferences: preferences,
//       bookingHistory: bookingHistory.split(",").map((item) => item.trim()),
//     };

//     const index = document
//       .getElementById("submit-button")
//       .getAttribute("data-index");
//     if (index !== null) {
//       guests[parseInt(index)] = guestData; // Update existing guest
//     } else {
//       guests.push(guestData); // Add new guest
//     }

//     // Save guest data to localStorage
//     localStorage.setItem("guests", JSON.stringify(guests));

//     document.getElementById("add-guest-modal").style.display = "none";
//     // Close form after submission
//     renderGuests();
//   });

// // Modify an existing guest
// function handleModify(index) {
//   const guest = guests[index];

//   document.getElementById("guest-name").value = guest.name;
//   document.getElementById("guest-photo").value = guest.photo;
//   document.getElementById("contact-info").value = guest.contact;
//   document.getElementById("preferences").value = guest.preferences;
//   document.getElementById("booking-history").value =
//     guest.bookingHistory.join(", ");

//   document.getElementById("form-title").textContent = "Modify Guest";
//   document.getElementById("submit-button").textContent = "Save Changes";
//   document.getElementById("submit-button").setAttribute("data-index", index);

//   document.getElementById("add-guest-modal").style.display = "flex";
//   // Show the form when modifying
// }

// // Delete a guest
// function handleDelete(index) {
//   if (confirm("Are you sure you want to delete this guest?")) {
//     guests.splice(index, 1);
//     // Save updated guest data to localStorage
//     localStorage.setItem("guests", JSON.stringify(guests));
//     renderGuests();
//   }
// }

// // Initial render - Ensure the modal is hidden initially
// document.getElementById("add-guest-modal").style.display = "none";
// // hidden by default

// renderGuests();
