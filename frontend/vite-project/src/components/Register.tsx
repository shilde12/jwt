import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          email,
          password,
        }
      );
      alert("Usuário registrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar. Verifique suas informações.");
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      <label>Email:</label>
      <input
        className="inputform"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label>Senha:</label>
      <input
        className="inputform"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={handleRegister}>Registrar</button>
      <p id="whatif" onClick={() => navigate("/login")}>
        Logar
      </p>
    </div>
  );
}