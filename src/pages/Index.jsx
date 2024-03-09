import { Link } from "react-router-dom";
import "./Index.css";

export default function Index() {
  return (
    <main className="index">
      <div className="center-container">
        <p className="index-message">
          <span className="index-text-special">Feel life With</span> Comfys
        </p>
        <section className="index-sample">
          <Link to="products">
            <h1>Shop Now</h1>
          </Link>
        </section>
      </div>

      <a
        className="index-credits"
        href="https://unsplash.com/photos/a-bedroom-with-a-bed-and-a-desk-808a4AWu8jE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      >
        Photo by Spacejoy on Unsplash
      </a>
    </main>
  );
}
