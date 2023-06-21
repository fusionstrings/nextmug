import * as React from 'react';

function BeerPage({ beer }) {
  return (
    <React.Fragment>
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
  </React.Fragment>
  );
}

export { BeerPage };
