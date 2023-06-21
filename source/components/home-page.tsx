import * as React from 'react';
import type { Beer } from "#types";
import { BeerList } from "#beer-list";
import { ImportMap } from "https://deno.land/x/emit/mod.ts";

function HomePage(
  { beers, importmap }: { beers: Beer[]; importmap: ImportMap },
) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <title>Next Mug</title>

        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://ga.jspm.io" />

        <link
          rel="preload"
          href="https://ga.jspm.io/npm:@acab/reset.css@0.5.3/index.css"
          as="style"
        />
        <link rel="preload" href="css/custom-properties.css" as="style" />
        <link rel="preload" href="css/styles.css" as="style" />

        <link
          rel="stylesheet"
          href="https://ga.jspm.io/npm:@acab/reset.css@0.5.3/index.css"
        />

        <link
          href="https://api.fontshare.com/v2/css?f[]=rx-100@400&f[]=tanker@400&f[]=striper@400&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="css/custom-properties.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: importmap }}
        />
      </head>
      <body>
        <header>
          <h1 className="logo">Next Mug</h1>
          <nav>
            <ul>
              <li>
                <a href="/beers/random">Random Beer</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <div id="home-page">
            <BeerList beers={beers} />
          </div>
        </main>
        <footer id="root"></footer>
      </body>
    </html>
  );
}

export { HomePage };
