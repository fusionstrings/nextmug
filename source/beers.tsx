import * as React from "react";
import { renderToReadableStream } from "react-dom/server";
import { BeerPage } from "./components/beer-page.tsx";

async function requestHandlerHTTP(request: Request) {
  try {
    const { pathname } = new URL(request.url);

    const pattern = new URLPattern({ pathname: "/beers/:beer" });
    const match = pattern.exec({ pathname });

    let beers;

    if (match) {
      const { beer } = match.pathname.groups;

      if (beer === "random") {
        const randomBeer = await fetch(
          "https://api.punkapi.com/v2/beers/random",
        );
        beers = await randomBeer.json();
      } else {
        const beerData = await import(
          `https://api.punkapi.com/v2/beers/${beer}`,
          {
            assert: { type: "json" },
          }
        );

        beers = beerData.default;
      }
    } else {
      const randomBeer = await fetch("https://api.punkapi.com/v2/beers/random");
      beers = await randomBeer.json();
    }
    const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

    const stream = await renderToReadableStream(
      <BeerPage importmap={importmap} beers={beers} />
    );

    return new Response(stream, {
      headers: { "content-type": "text/html" },
    });
  } catch (error) {
    console.error(error.message || error.toString());

    const randomBeer = await fetch("https://api.punkapi.com/v2/beers/random");
    const beers = await randomBeer.json();

    const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

    const stream = await renderToReadableStream(
      <BeerPage importmap={importmap} beers={beers} />,
      {
        bootstrapModules: ["/js/beers-dom.tsx.js"],
      },
    );

    return new Response(stream, {
      headers: { "content-type": "text/html" },
    });
  }
}

export { requestHandlerHTTP };
