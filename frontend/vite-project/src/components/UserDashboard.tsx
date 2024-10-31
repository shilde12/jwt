import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="container-user">
      <h1>Você está logado como um usuário comum</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}