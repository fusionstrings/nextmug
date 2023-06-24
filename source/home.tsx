import * as React from "react";
import { renderToReadableStream } from "react-dom/server";
import { HomePage } from "./components/home-page.tsx";
import { api } from "#functions";

async function requestHandlerHTTP(request: Request) {
  try {
    const beers = await api(request.url);

    const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

    const stream = await renderToReadableStream(
      <HomePage importmap={importmap} beers={beers} />,
      {
        bootstrapModules: ["/js/home-dom.tsx.js"],
      },
    );

    return new Response(stream, {
      headers: { "content-type": "text/html" },
    });
  } catch (error) {
    console.error(error.message || error.toString());
  }
}

export { requestHandlerHTTP };
