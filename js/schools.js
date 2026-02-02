const tableContainer = document.getElementById("table");
const schoolsCount = document.getElementById("schoolsCount");

// Logout function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Fetch schools from backend
async function fetchSchools() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/v1/schools", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Unauthorized");

    const data = await response.json();

    // Update total schools count
    schoolsCount.innerText = data.length;

    // Build table
    let tableHTML = `
      <table>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Actions</th>
        </tr>
    `;

    tableHTML += data.map(school => `
      <tr>
        <td>${school.name}</td>
        <td>${school._id}</td>
        <td>
          <button onclick="editSchool('${school._id}')">Edit</button>
          <button onclick="deleteSchool('${school._id}')">Delete</button>
        </td>
      </tr>
    `).join("");

    tableHTML += `</table>`;

    tableContainer.innerHTML = tableHTML;

  } catch (error) {
    console.error(error);
    tableContainer.innerHTML = "<p>Error loading schools. Please login.</p>";
  }
}

// Example edit function
function editSchool(id) {
  alert("Edit school: " + id);
}

// Delete school
async function deleteSchool(id) {
  if (!confirm("Are you sure you want to delete this school?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/v1/schools/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Delete failed");

    // Refresh the list
    fetchSchools();
  } catch (error) {
    console.error(error);
    alert("Failed to delete school");
  }
}

// Load schools on page load
fetchSchools();
