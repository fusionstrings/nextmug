import * as React from "react";
import { renderToReadableStream } from "react-dom/server";
import { BeerPage } from "./components/beer-page.tsx";

async function requestHandlerHTTP(request: Request) {
  try {
    const { pathname, searchParams, search } = new URL(request.url);

    const pattern = new URLPattern({ pathname: "/beers/:beer" });
    const match = pattern.exec({ pathname });

    let beers;
    let detail = false;

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
      detail = true;
    } else if (search) {
      const searchTermABV = searchParams.get("abv") || "";
      const searchTermIBU = searchParams.get("ibu") || "";
      const searchTermEBC = searchParams.get("ebc") || "";

      if (searchTermABV) {
        searchParams.append("abv_gt", Number.parseFloat(searchTermABV) - 0.1);
        searchParams.append("abv_lt", Number.parseFloat(searchTermABV) + 0.1);
      }

      if (searchTermIBU) {
        searchParams.append("ibu_gt", Number.parseFloat(searchTermIBU) - 1);
        searchParams.append("ibu_lt", Number.parseFloat(searchTermIBU) + 1);
      }

      if (searchTermEBC) {
        searchParams.append("ebc_gt", Number.parseFloat(searchTermEBC) - 1);
        searchParams.append("ebc_lt", Number.parseFloat(searchTermEBC) + 1);
      }

      const beerData = await import(
        `https://api.punkapi.com/v2/beers?${searchParams.toString()}`,
        {
          assert: { type: "json" },
        }
      );

      beers = beerData.default;
    } else {
      const randomBeer = await fetch("https://api.punkapi.com/v2/beers/random");
      beers = await randomBeer.json();
    }
    const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

    console.log("detail", detail);

    const stream = await renderToReadableStream(
      <BeerPage importmap={importmap} beers={beers} detail={detail} />,
      {
        bootstrapModules: ["/js/beers-dom.tsx.js"],
      },
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
      <BeerPage importmap={importmap} beers={beers} detail />,
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
