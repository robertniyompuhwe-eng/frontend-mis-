const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/v1/students", {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(data => studentsCount.innerText = data.length);
