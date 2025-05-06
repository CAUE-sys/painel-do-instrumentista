const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path = require('path');

// Servir arquivos estáticos do diretório raiz
app.use(express.static(path.join(__dirname, '..')));

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Carrega os usuários de um arquivo
const USERS_FILE = "./users.json";

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]");
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Rota de registro
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }
  users.push({ username, password });
  saveUsers(users);
  res.json({ message: "Usuário registrado com sucesso" });
});

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
