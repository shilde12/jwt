import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <label>Email:</label>
      <input
        type="email"
        className="inputform"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Senha:</label>
      <input
        type="password"
        className="inputform"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p id="whatif" onClick={() => navigate("/register")}>Criar conta</p>
    </div>
  );
};