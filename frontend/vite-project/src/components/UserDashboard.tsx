import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao Painel do Usuário</h1>
      <p>Você está logado como um usuário comum.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}