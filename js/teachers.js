const token = localStorage.getItem("token");

function loadTeachers() {
  fetch("http://localhost:3000/api/v1/teachers", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    teachersTable.innerHTML = data.map(t => `
      <tr>
        <td>${t.name}</td>
        <td><button onclick="deleteTeacher('${t._id}')">Delete</button></td>
      </tr>
    `).join("");
  });
}

function createTeacher(e) {
  e.preventDefault();

  fetch("http://localhost:3000/api/v1/teachers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name: teacherName.value })
  })
  .then(() => {
    teacherName.value = "";
    loadTeachers();
  });
}

function deleteTeacher(id) {
  fetch(`http://localhost:3000/api/v1/teachers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(loadTeachers);
}

loadTeachers();
