import { Fragment } from "react";
function Beer({ beer }) {
  return (
    <Fragment>
    <header>
      <h1>Next Mug</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <pre>
      <code>
          {JSON.stringify(beer, null, 2)}
      </code>
      </pre>
    </main>
    <footer></footer>
  </Fragment>
  );
}

export { Beer };
