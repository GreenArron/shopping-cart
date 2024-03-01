import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/" aria-label="Home Index">
          <span className="logo-large">Comfys</span>
        </Link>

        <form id="searchbar">
          <span>🔍</span>
          <input aria-label="Search Bar" type="text" />
        </form>

        <div className="right-side">
          <Link to="products">Shop</Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
