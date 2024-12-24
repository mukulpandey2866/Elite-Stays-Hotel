// let rooms = [];
// let editIndex = null;

// // Fetch rooms from the server when the page loads
// function fetchRooms() {
//   fetch('/rooms')
//     .then(response => response.json())
//     .then(data => {
//       rooms = data;
//       renderRooms();
//     })
//     .catch(error => console.error('Error fetching rooms:', error));
// }

// function toTitleCase(str) {
//   return str.replace(/\b\w/g, (char) => char.toUpperCase());
// }

// function openAddRoomForm() {
//   document.getElementById('add-room-form').reset();
//   document.getElementById('add-room-modal').style.display = 'flex';
//   editIndex = null;
//   document.getElementById('submit-button').innerText = 'Add New Room';
// }

// function closeAddRoomForm() {
//   document.getElementById('add-room-modal').style.display = 'none';
// }

// document.getElementById('add-room-form').addEventListener('submit', function (event) {
//   event.preventDefault();

//   let roomName = document.getElementById('room-name').value.trim();
//   roomName = toTitleCase(roomName);

//   const roomDescription = document.getElementById('room-description').value;
//   const roomNumber = document.getElementById('room-number').value;
//   const price = document.getElementById('price').value;
//   const availability = document.getElementById('availability').value;

//   let roomImage;

//   switch (roomName) {
//     case 'Deluxe Room':
//       roomImage = '../assets/luxery.png';
//       break;
//     case 'Suite':
//       roomImage = '../assets/suite.png';
//       break;
//     case 'Standard':
//       roomImage = '../assets/standard.png';
//       break;
//     default:
//       alert('Invalid room name! Please use "Deluxe Room", "Suite", or "Standard".');
//       return;
//   }

//   const newRoom = {
//     name: roomName,
//     description: roomDescription,
//     roomNumber: roomNumber,
//     price: price,
//     availability: availability,
//     image: roomImage,
//   };

//   if (editIndex !== null) {
//     updateRoom(newRoom, rooms[editIndex].id);
//   } else {
//     addRoom(newRoom);
//   }
// });

// function renderRooms() {
//   const roomManagementSection = document.getElementById('room-management');
//   const dynamicRoomCards = roomManagementSection.querySelectorAll('.room-card:not(.permanent-room)');
//   dynamicRoomCards.forEach(card => card.remove());

//   rooms.forEach((room, index) => {
//     const roomCard = document.createElement('div');
//     roomCard.classList.add('room-card');

//     roomCard.innerHTML = `
//       <img src="${room.image}" alt="Room Image" class="room-image">
//       <h2 class="room-title">${room.name}</h2>
//       <p class="room-description">${room.description}</p>
//       <p>Room Number: ${room.roomNumber}</p>
//       <p>Price: $${room.price}</p>
//       <p>Availability: ${room.availability}</p>
//       <button class="btn edit-btn" onclick="editRoom(${index})">Edit</button>
//       <button class="btn delete-btn" onclick="deleteRoom(${index})">Delete</button>
//     `;

//     roomManagementSection.appendChild(roomCard);
//   });
// }

// function editRoom(index) {
//   const room = rooms[index];

//   document.getElementById('room-name').value = room.name;
//   document.getElementById('room-description').value = room.description;
//   document.getElementById('room-number').value = room.roomNumber;
//   document.getElementById('price').value = room.price;
//   document.getElementById('availability').value = room.availability;

//   editIndex = index;
//   document.getElementById('submit-button').innerText = 'Save Room';
//   document.getElementById('add-room-modal').style.display = 'flex';
// }

// function deleteRoom(index) {
//   if (confirm('Are you sure you want to delete this room?')) {
//     const roomId = rooms[index].id;
//     fetch(`/rooms/${roomId}`, {
//       method: 'DELETE',
//     })
//       .then(response => response.json())
//       .then(data => {
//         rooms.splice(index, 1);
//         renderRooms();
//       })
//       .catch(error => console.error('Error deleting room:', error));
//   }
// }

// function addRoom(newRoom) {
//   fetch('/rooms', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newRoom),
//   })
//     .then(response => response.json())
//     .then(data => {
//       rooms.push(data);
//       renderRooms();
//       closeAddRoomForm();
//     })
//     .catch(error => console.error('Error adding room:', error));
// }

// function updateRoom(updatedRoom, id) {
//   fetch(`/rooms/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updatedRoom),
//   })
//     .then(response => response.json())
//     .then(data => {
//       rooms[editIndex] = data;
//       renderRooms();
//       closeAddRoomForm();
//     })
//     .catch(error => console.error('Error updating room:', error));
// }

// // Fetch rooms on page load
// fetchRooms();









let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
let editIndex = null;

function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function openAddRoomForm() {
  document.getElementById('add-room-form').reset();
  document.getElementById('add-room-modal').style.display = 'flex';
  editIndex = null;
  document.getElementById('submit-button').innerText = 'Add New Room';
}

function closeAddRoomForm() {
  document.getElementById('add-room-modal').style.display = 'none';
}

document.getElementById('add-room-form').addEventListener('submit', function (event) {
  event.preventDefault();

  let roomName = document.getElementById('room-name').value.trim();
  roomName = toTitleCase(roomName);

  const roomDescription = document.getElementById('room-description').value;
  const roomNumber = document.getElementById('room-number').value;
  const price = document.getElementById('price').value;
  const availability = document.getElementById('availability').value;

  let roomImage;

  switch (roomName) {
    case 'Deluxe Room':
      roomImage = '../assets/luxery.png';
      break;
    case 'Suite':
      roomImage = '../assets/suite.png';
      break;
    case 'Standard':
      roomImage = '../assets/standard.png';
      break;
    default:
      alert('Invalid room name! Please use "Deluxe Room", "Suite", or "Standard".');
      return;
  }

  const newRoom = {
    name: roomName,
    description: roomDescription,
    roomNumber: roomNumber,
    price: price,
    availability: availability,
    image: roomImage,
  };

  if (editIndex !== null) {
    rooms[editIndex] = newRoom;
  } else {
    rooms.push(newRoom);
  }

  saveRoomsToLocalStorage();
  renderRooms();
  closeAddRoomForm();
});

function renderRooms() {
  const roomManagementSection = document.getElementById('room-management');
  const dynamicRoomCards = roomManagementSection.querySelectorAll('.room-card:not(.permanent-room)');
  dynamicRoomCards.forEach(card => card.remove());

  rooms.forEach((room, index) => {
    const roomCard = document.createElement('div');
    roomCard.classList.add('room-card');

    roomCard.innerHTML = `
      <img src="${room.image}" alt="Room Image" class="room-image">
      <h2 class="room-title">${room.name}</h2>
      <p class="room-description">${room.description}</p>
      <p>Room Number: ${room.roomNumber}</p>
      <p>Price: $${room.price}</p>
      <p>Availability: ${room.availability}</p>
      <button class="btn edit-btn" onclick="editRoom(${index})">Edit</button>
      <button class="btn delete-btn" onclick="deleteRoom(${index})">Delete</button>
    `;

    roomManagementSection.appendChild(roomCard);
  });
}

function editRoom(index) {
  const room = rooms[index];

  document.getElementById('room-name').value = room.name;
  document.getElementById('room-description').value = room.description;
  document.getElementById('room-number').value = room.roomNumber;
  document.getElementById('price').value = room.price;
  document.getElementById('availability').value = room.availability;

  editIndex = index;
  document.getElementById('submit-button').innerText = 'Save Room';
  document.getElementById('add-room-modal').style.display = 'flex';
}

function deleteRoom(index) {
  if (confirm('Are you sure you want to delete this room?')) {
    rooms.splice(index, 1);
    saveRoomsToLocalStorage();
    renderRooms();
  }
}

function saveRoomsToLocalStorage() {
  localStorage.setItem('rooms', JSON.stringify(rooms));
}

renderRooms();
