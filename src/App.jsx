import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <>
      <nav>
        <Link to="/" aria-label="Home Index">
          <span className="logo-large">Comfys</span>
        </Link>

        <Searchbar />

        <div className="right-side">
          <Link to="products">Shop</Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
