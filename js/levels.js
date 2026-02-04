const token = localStorage.getItem("token");

function loadLevels() {
  fetch("http://localhost:3000/api/v1/levels", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    table1.innerHTML = data.map(l => `
      <tr>
        <td>${l.name}</td>
        <td>${l.school || ''}</td>
        <td>${l.description || ''}</td>
        <td><button onclick="deleteLevel('${l._id}')">Delete</button></td>
      </tr>
    `).join("");
  });
}

function createLevel(e) {
  e.preventDefault();

  fetch("http://localhost:3000/api/v1/levels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name: levelName.value })
  })
  .then(() => {
    levelName.value = "";
    loadLevels();
  });
}

function deleteLevel(id) {
  fetch(`http://localhost:3000/api/v1/levels/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(loadLevels);
}

loadLevels();
