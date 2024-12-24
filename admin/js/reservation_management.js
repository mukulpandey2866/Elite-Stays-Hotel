// // Fetch all reservations from the backend
// async function fetchReservations() {
//   const response = await fetch("http://127.0.0.1:5000/reservations");
//   const data = await response.json();

//   if (response.ok) {
//     renderReservations(data); // Pass the fetched data to renderReservations
//   } else {
//     alert("Error fetching reservations: " + data.message);
//   }
// }

// async function saveReservation(reservationData) {
//   const response = await fetch("http://127.0.0.1:5000/reservations", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reservationData),
//   });

//   const result = await response.json();
//   alert(result.message); // Show a message from the backend response

//   fetchReservations(); // Refresh the reservation list after saving
// }

// async function updateReservation(reservationData, index) {
//   const response = await fetch(`http://127.0.0.1:5000/reservations/${index}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reservationData),
//   });

//   const result = await response.json();
//   alert(result.message); // Show a message from the backend response

//   fetchReservations(); // Refresh the reservation list after updating
// }

// async function deleteReservation(index) {
//   const response = await fetch(`http://127.0.0.1:5000/reservations/${index}`, {
//     method: "DELETE",
//   });

//   const result = await response.json();
//   alert(result.message); // Show a message from the backend response

//   fetchReservations(); // Refresh the reservation list after deletion
// }

// function renderReservations(reservations) {
//   const reservationList = document.getElementById("reservation-list");
//   reservationList.innerHTML = "";

//   reservations.forEach((reservation, index) => {
//     const card = document.createElement("div");
//     card.classList.add("reservation-card");

//     card.innerHTML = `
//       <img src="${reservation.photo}" alt="Customer Photo" class="reservation-photo">
//       <h2 class="reservation-title">${reservation.name}</h2>
//       <p><strong>Room Number:</strong> ${reservation.roomNumber}</p>
//       <p><strong>Check-in:</strong> ${reservation.checkIn}</p>
//       <p><strong>Check-out:</strong> ${reservation.checkOut}</p>
//       <button class="btn modify-btn" onclick="handleModify(${index})">Modify</button>
//       <button class="btn cancel-btn" onclick="handleDelete(${index})">Cancel</button>
//     `;
//     reservationList.appendChild(card);
//   });
// }

// function openAddReservationForm() {
//   document.getElementById("add-reservation-form").reset();
//   document.getElementById("form-title").textContent = "Add New Reservation";
//   document.getElementById("submit-button").textContent = "Add Reservation";
//   document.getElementById("submit-button").removeAttribute("data-index");
//   document.getElementById("add-reservation-modal").style.display = "block";
// }

// function closeAddReservationForm() {
//   document.getElementById("add-reservation-modal").style.display = "none";
// }

// document
//   .getElementById("add-reservation-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const reservationData = {
//       name: document.getElementById("customer-name").value,
//       photo: document.getElementById("customer-photo").value,
//       roomNumber: document.getElementById("room-number").value,
//       checkIn: document.getElementById("check-in-date").value,
//       checkOut: document.getElementById("check-out-date").value,
//     };

//     const index = document
//       .getElementById("submit-button")
//       .getAttribute("data-index");
//     if (index !== null) {
//       updateReservation(reservationData, index); // Update existing reservation
//     } else {
//       saveReservation(reservationData); // Add new reservation
//     }

//     document.getElementById("add-reservation-modal").style.display = "none";
//   });

// function handleModify(index) {
//   const reservation = reservations[index];

//   document.getElementById("customer-name").value = reservation.name;
//   document.getElementById("customer-photo").value = reservation.photo;
//   document.getElementById("room-number").value = reservation.roomNumber;
//   document.getElementById("check-in-date").value = reservation.checkIn;
//   document.getElementById("check-out-date").value = reservation.checkOut;

//   document.getElementById("form-title").textContent = "Modify Reservation";
//   document.getElementById("submit-button").textContent = "Save Changes";
//   document.getElementById("submit-button").setAttribute("data-index", index);

//   document.getElementById("add-reservation-modal").style.display = "block";
// }

// function handleDelete(index) {
//   if (confirm("Are you sure you want to cancel this reservation?")) {
//     deleteReservation(index); // Call function to delete the reservation from the backend
//   }
// }

// // Initialize by fetching reservations from the backend
// fetchReservations();







let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

function openAddReservationForm() {
  document.getElementById("add-reservation-form").reset();
  document.getElementById("form-title").textContent = "Add New Reservation";
  document.getElementById("submit-button").textContent = "Add Reservation";
  document.getElementById("submit-button").removeAttribute("data-index");
  document.getElementById("add-reservation-modal").style.display = "block";
}

function closeAddReservationForm() {
  document.getElementById("add-reservation-modal").style.display = "none";
}

function renderReservations() {
  const reservationList = document.getElementById("reservation-list");
  reservationList.innerHTML = "";

  reservations.forEach((reservation, index) => {
    const card = document.createElement("div");
    card.classList.add("reservation-card");

    card.innerHTML = `
      <img src="${reservation.photo}" alt="Customer Photo" class="reservation-photo">
      <h2 class="reservation-title">${reservation.name}</h2>
      <p><strong>Room Number:</strong> ${reservation.roomNumber}</p>
      <p><strong>Check-in:</strong> ${reservation.checkIn}</p>
      <p><strong>Check-out:</strong> ${reservation.checkOut}</p>
      <button class="btn modify-btn" onclick="handleModify(${index})">Modify</button>
      <button class="btn cancel-btn" onclick="handleDelete(${index})">Cancel</button>
    `;
    reservationList.appendChild(card);
  });
}

document
  .getElementById("add-reservation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName = document.getElementById("customer-name").value;
    const customerPhoto = document.getElementById("customer-photo").value;
    const roomNumber = document.getElementById("room-number").value;
    const checkInDate = document.getElementById("check-in-date").value;
    const checkOutDate = document.getElementById("check-out-date").value;

    const reservationData = {
      name: customerName,
      photo: customerPhoto,
      roomNumber: roomNumber,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };

    const index = document
      .getElementById("submit-button")
      .getAttribute("data-index");
    if (index !== null) {
      reservations[parseInt(index)] = reservationData;
    } else {
      reservations.push(reservationData);
    }

    localStorage.setItem("reservations", JSON.stringify(reservations));

    document.getElementById("add-reservation-modal").style.display = "none";
    renderReservations();
  });

function handleModify(index) {
  const reservation = reservations[index];

  document.getElementById("customer-name").value = reservation.name;
  document.getElementById("customer-photo").value = reservation.photo;
  document.getElementById("room-number").value = reservation.roomNumber;
  document.getElementById("check-in-date").value = reservation.checkIn;
  document.getElementById("check-out-date").value = reservation.checkOut;

  document.getElementById("form-title").textContent = "Modify Reservation";
  document.getElementById("submit-button").textContent = "Save Changes";
  document.getElementById("submit-button").setAttribute("data-index", index);

  document.getElementById("add-reservation-modal").style.display = "block";
}

function handleDelete(index) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    renderReservations();
  }
}

document.getElementById("add-reservation-modal").style.display = "none";

renderReservations();
