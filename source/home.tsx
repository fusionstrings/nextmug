import * as React from 'react';
import { renderToReadableStream } from "react-dom/server";
import { HomePage } from "./components/home-page.tsx";
async function requestHandlerHTTP() {

  const beers = await import("https://api.punkapi.com/v2/beers", {
    assert: { type: "json" },
  });

  const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

  const stream = await renderToReadableStream(<HomePage importmap={importmap} beers={beers?.default} />, {
    bootstrapModules: ["/js/home-dom.tsx.js"],
  });
  
  return new Response(stream, {
    headers: { "content-type": "text/html" },
  });
}

export { requestHandlerHTTP };
