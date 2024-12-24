// let staffMembers = [];

// function fetchStaff() {
//   fetch('/staff')
//     .then(response => response.json())
//     .then(data => {
//       staffMembers = data;
//       renderStaff();
//     });
// }

// function openAddStaffForm() {
//   document.getElementById('add-staff-form').reset();
//   document.getElementById('form-title').textContent = 'Add New Staff';
//   document.getElementById('submit-button').textContent = 'Add Staff';
//   document.getElementById('submit-button').removeAttribute('data-index');
//   document.getElementById('add-staff-modal').style.display = 'flex';
// }

// function openEditStaffForm(index) {
//   const staff = staffMembers[index];
//   document.getElementById('staff-name').value = staff.name;
//   document.getElementById('staff-photo').value = staff.photo;
//   document.getElementById('staff-age').value = staff.age;
//   document.getElementById('staff-salary').value = staff.salary;
//   document.getElementById('staff-gender').value = staff.gender;
//   document.getElementById('staff-work-type').value = staff.workType;

//   document.getElementById('form-title').textContent = 'Edit Staff';
//   document.getElementById('submit-button').textContent = 'Update Staff';
//   document.getElementById('submit-button').setAttribute('data-index', index);
//   document.getElementById('add-staff-modal').style.display = 'flex';
// }

// function closeAddStaffForm() {
//   document.getElementById('add-staff-modal').style.display = 'none';
// }

// document.getElementById('add-staff-form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const name = document.getElementById('staff-name').value;
//   const photo = document.getElementById('staff-photo').value;
//   const age = document.getElementById('staff-age').value;
//   const salary = document.getElementById('staff-salary').value;
//   const gender = document.getElementById('staff-gender').value;
//   const workType = document.getElementById('staff-work-type').value;

//   const newStaff = { name, photo, age, salary, gender, workType };
//   const index = document.getElementById('submit-button').getAttribute('data-index');

//   if (index !== null) {
//     updateStaff(index, newStaff);
//   } else {
//     addStaff(newStaff);
//   }

//   closeAddStaffForm();
//   renderStaff();
// });

// function addStaff(staff) {
//   fetch('/staff', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(staff)
//   })
//     .then(response => response.json())
//     .then(data => {
//       staffMembers.push(data);
//       renderStaff();
//     });
// }

// function updateStaff(index, staff) {
//   const id = staffMembers[index].id;

//   fetch(`/staff/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(staff)
//   })
//     .then(response => response.json())
//     .then(() => {
//       staffMembers[index] = { ...staff, id };
//       renderStaff();
//     });
// }

// function deleteStaff(index) {
//   const id = staffMembers[index].id;

//   if (confirm('Are you sure you want to delete this staff member?')) {
//     fetch(`/staff/${id}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.json())
//       .then(() => {
//         staffMembers.splice(index, 1);
//         renderStaff();
//       });
//   }
// }

// function renderStaff() {
//   const staffList = document.getElementById('staff-list');
//   staffList.innerHTML = '';

//   staffMembers.forEach((staff, index) => {
//     const staffCard = document.createElement('div');
//     staffCard.classList.add('staff-card');
//     staffCard.innerHTML = `
//       <img src="${staff.photo}" alt="Staff Photo">
//       <h3>${staff.name}</h3>
//       <p>Age: ${staff.age}</p>
//       <p>Salary: ₹${staff.salary}</p>
//       <p>Gender: ${staff.gender}</p>
//       <p>Work Type: ${staff.workType}</p>
//       <button class="edit-btn" onclick="openEditStaffForm(${index})">Edit</button>
//       <button class="delete-btn" onclick="deleteStaff(${index})">Delete</button>
//     `;
//     staffList.appendChild(staffCard);
//   });
// }

// document.getElementById('add-staff-modal').style.display = 'none';

// fetchStaff();  // Fetch initial staff list









let staffMembers = JSON.parse(localStorage.getItem('staff')) || [];

function openAddStaffForm() {
  document.getElementById('add-staff-form').reset();
  document.getElementById('form-title').textContent = 'Add New Staff';
  document.getElementById('submit-button').textContent = 'Add Staff';
  document.getElementById('submit-button').removeAttribute('data-index');
  document.getElementById('add-staff-modal').style.display = 'flex';
}

function openEditStaffForm(index) {
  const staff = staffMembers[index];
  document.getElementById('staff-name').value = staff.name;
  document.getElementById('staff-photo').value = staff.photo;
  document.getElementById('staff-age').value = staff.age;
  document.getElementById('staff-salary').value = staff.salary;
  document.getElementById('staff-gender').value = staff.gender;
  document.getElementById('staff-work-type').value = staff.workType;

  document.getElementById('form-title').textContent = 'Edit Staff';
  document.getElementById('submit-button').textContent = 'Update Staff';
  document.getElementById('submit-button').setAttribute('data-index', index);
  document.getElementById('add-staff-modal').style.display = 'flex';
}

function closeAddStaffForm() {
  document.getElementById('add-staff-modal').style.display = 'none';
}

document.getElementById('add-staff-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('staff-name').value;
  const photo = document.getElementById('staff-photo').value;
  const age = document.getElementById('staff-age').value;
  const salary = document.getElementById('staff-salary').value;
  const gender = document.getElementById('staff-gender').value;
  const workType = document.getElementById('staff-work-type').value;

  const newStaff = { name, photo, age, salary, gender, workType };

  const index = document.getElementById('submit-button').getAttribute('data-index');
  if (index !== null) {
    staffMembers[index] = newStaff;
  } else {
    staffMembers.push(newStaff);
  }

  localStorage.setItem('staff', JSON.stringify(staffMembers));

  closeAddStaffForm();
  renderStaff();
});

function renderStaff() {
  const staffList = document.getElementById('staff-list');
  staffList.innerHTML = '';

  staffMembers.forEach((staff, index) => {
    const staffCard = document.createElement('div');
    staffCard.classList.add('staff-card');
    staffCard.innerHTML = `
      <img src="${staff.photo}" alt="Staff Photo">
      <h3>${staff.name}</h3>
      <p>Age: ${staff.age}</p>
      <p>Salary: ₹${staff.salary}</p>
      <p>Gender: ${staff.gender}</p>
      <p>Work Type: ${staff.workType}</p>
      <button class="edit-btn" onclick="openEditStaffForm(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteStaff(${index})">Delete</button>
    `;
    staffList.appendChild(staffCard);
  });
}

function deleteStaff(index) {
  if (confirm('Are you sure you want to delete this staff member?')) {
    staffMembers.splice(index, 1);
    localStorage.setItem('staff', JSON.stringify(staffMembers));
    renderStaff();
  }
}

document.getElementById('add-staff-modal').style.display = 'none';

renderStaff();
