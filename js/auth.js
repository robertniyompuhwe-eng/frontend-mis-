document.getElementById("loginForm").addEventListener("submit", login);

function login(e) {
  e.preventDefault(); // prevents reload

  fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token",data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Login faile");
    }
  })
  .catch(() => alert("Login failed"));
}
