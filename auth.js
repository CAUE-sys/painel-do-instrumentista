// auth.js

// Cadastro
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && email === savedUser.email && password === savedUser.password) {
      alert("Login realizado!");
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha inválidos!");
    }
  });
}
