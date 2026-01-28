const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/v1/students", {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(data => {
  studentsTable.innerHTML = data.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.regNo}</td>
      <td>
        <button>Edit</button>
        <button onclick="deleteStudent('${s._id}')">Delete</button>
      </td>
    </tr>
  `).join("");
});

function deleteStudent(id) {
  fetch(`http://localhost:3000/api/v1/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => location.reload());
}
