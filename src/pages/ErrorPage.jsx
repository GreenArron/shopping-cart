import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Someting went Wrong</h1>
      <p>Try again, contact us if problem persists</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
