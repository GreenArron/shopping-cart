import { Link } from "react-router-dom";
import "./Index.css";

export default function Index() {
  return (
    <main className="index">
      <p className="index-message">
        <span className="index-text-special">Feel life With</span> Comfys
      </p>

      <section className="index-sample">
        <Link to="products">
          <h1>Popular now</h1>
        </Link>
      </section>
    </main>
  );
}
