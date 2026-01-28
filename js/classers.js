const token = localStorage.getItem("token");

function loadLevels() {
  fetch("http://localhost:3000/api/v1/levels", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    levelSelect.innerHTML = data.map(l =>
      `<option value="${l._id}">${l.name}</option>`
    ).join("");
  });
}

function loadClasses() {
  fetch("http://localhost:3000/api/v1/classes", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    classesTable.innerHTML = data.map(c => `
      <tr>
        <td>${c.name}</td>
        <td>${c.level?.name || "-"}</td>
        <td><button onclick="deleteClass('${c._id}')">Delete</button></td>
      </tr>
    `).join("");
  });
}

function createClass(e) {
  e.preventDefault();

  fetch("http://localhost:3000/api/v1/classes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: className.value,
      level: levelSelect.value
    })
  })
  .then(() => {
    className.value = "";
    loadClasses();
  });
}

function deleteClass(id) {
  fetch(`http://localhost:3000/api/v1/classes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(loadClasses);
}

loadLevels();
loadClasses();
