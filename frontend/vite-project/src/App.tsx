import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <div className="container">
          <form>
            <label>Email:</label>
            <input type="email" placeholder="insira seu email" required />
            <label>Senha:</label>
            <input type="password" placeholder="insira sua senha" required />
            <button id="enter-btn">Entrar</button>
          </form>
        </div>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;