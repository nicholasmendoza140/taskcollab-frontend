import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid gray"
        }}
      >
        <h3>TaskCollab</h3>

        <button onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
}