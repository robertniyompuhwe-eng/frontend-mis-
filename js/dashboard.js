// Get DOM elements
const tableContainer = document.getElementById("table");
const studentsCountEl = document.getElementById("studentsCount");
const schoolsCountEl = document.getElementById("schoolsCount");
const teachersCountEl = document.getElementById("teachersCount");

// ------------------------
// Helper function to fetch with token
// ------------------------
async function fetchWithToken(url) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // redirect to login if no token
    return;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (res.status === 401) { // token invalid/expired
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return;
  }

  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  return await res.json();
}

// ------------------------
// Fetch and render students table
// ------------------------
async function fetchStudents() {
  try {
    const data = await fetchWithToken("http://localhost:3000/api/v1/students");

    // Update Students card count
    studentsCountEl.innerText = data.length;

    // Build table
    let tableHTML = `
      <table>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
        ${data.map(student => `
          <tr>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.gender}</td>
          </tr>
        `).join("")}
      </table>
    `;

    tableContainer.innerHTML = tableHTML;

  } catch (error) {
    console.error("Fetch students error:", error);
    tableContainer.innerHTML = "<p>Error loading students</p>";
  }
}

// ------------------------
// Fetch counts for Schools and Teachers
// ------------------------
async function fetchCount(url, element) {
  try {
    const data = await fetchWithToken(url);
    element.innerText = data.length;
  } catch {
    element.innerText = "–";
  }
}

// ------------------------
// Logout function
// ------------------------
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ------------------------
// Initial load
// ------------------------
function initDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // redirect if not logged in
    return;
  }

  fetchStudents();
  fetchCount("http://localhost:3000/api/v1/schools", schoolsCountEl);
  fetchCount("http://localhost:3000/api/v1/teachers", teachersCountEl);
}

// Call init on page load
initDashboard();
