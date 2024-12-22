async function fetchAnalyticsData() {
  // Make a GET request to fetch the latest analytics data
  const response = await fetch("http://127.0.0.1:5000/analytics");
  const data = await response.json();

  if (response.ok) {
    generateReports(data); // Pass the fetched data to the generateReports function
  } else {
    alert("Error fetching analytics data: " + data.message);
  }
}

function generateReports(data) {
  document.querySelector(".analytics-container").style.display = "flex";

  document.getElementById("occupancy-rate").innerHTML = `
    <p>Current occupancy rate is <strong>${data.occupancyRate}%</strong>.</p>
    <p>Optimize bookings to increase occupancy.</p>
  `;

  document.getElementById("revenue").innerHTML = `
    <p>Current revenue is <strong>$${data.revenue}</strong>.</p>
    <p>Consider upselling or adding more premium services to increase revenue.</p>
  `;

  document.getElementById("guest-satisfaction").innerHTML = `
    <p>Guest satisfaction rate is <strong>${data.guestSatisfaction}%</strong>.</p>
    <p>Focus on enhancing customer experience to improve satisfaction.</p>
  `;

  createGraph("occupancyChart", "Occupancy Rate", data.occupancyRate, "#ff6347");
  createGraph("revenueChart", "Revenue", data.revenue, "#32cd32");
  createGraph("satisfactionChart", "Guest Satisfaction", data.guestSatisfaction, "#1e90ff");

  document.querySelector(".generate-report-btn").style.display = "none";
}

// Function to create graphs using Chart.js
function createGraph(canvasId, label, value, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [label],
      datasets: [
        {
          label: label,
          data: [value],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// Call the fetchAnalyticsData function to get the data when the page loads
fetchAnalyticsData();








// const data = {
//   occupancyRate: 75,
//   revenue: 25000,
//   guestSatisfaction: 85,
// };

// function generateReports() {
//   document.querySelector(".analytics-container").style.display = "flex"; //

//   document.getElementById("occupancy-rate").innerHTML = `
//         <p>Current occupancy rate is <strong>${data.occupancyRate}%</strong>.</p>
//         <p>Optimize bookings to increase occupancy.</p>
//     `;

//   document.getElementById("revenue").innerHTML = `
//         <p>Current revenue is <strong>$${data.revenue}</strong>.</p>
//         <p>Consider upselling or adding more premium services to increase revenue.</p>
//     `;

//   document.getElementById("guest-satisfaction").innerHTML = `
//         <p>Guest satisfaction rate is <strong>${data.guestSatisfaction}%</strong>.</p>
//         <p>Focus on enhancing customer experience to improve satisfaction.</p>
//     `;

//   createGraph(
//     "occupancyChart",
//     "Occupancy Rate",
//     data.occupancyRate,
//     "#ff6347"
//   );

//   createGraph("revenueChart", "Revenue", data.revenue, "#32cd32");

//   createGraph(
//     "satisfactionChart",
//     "Guest Satisfaction",
//     data.guestSatisfaction,
//     "#1e90ff"
//   );

//   document.querySelector(".generate-report-btn").style.display = "none";
// }

// // Function to create graphs using Chart.js
// function createGraph(canvasId, label, value, color) {
//   const ctx = document.getElementById(canvasId).getContext("2d");
//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: [label],
//       datasets: [
//         {
//           label: label,
//           data: [value],
//           backgroundColor: color,
//           borderColor: color,
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//   });
// }
