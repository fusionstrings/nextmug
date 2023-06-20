import { renderToReadableStream } from "react-dom/server";
import { Home } from "./components/home.tsx";
import type { Beer } from "#types";
async function requestHandlerHTTP() {

  const beers = await import("https://api.punkapi.com/v2/beers", {
    assert: { type: "json" },
  });

  const stream = await renderToReadableStream(<Home beers={beers?.default} />, {
    bootstrapModules: ["/js/main.js"],
  });
  
  
  return new Response(stream, {
    headers: { "content-type": "text/html" },
  });
}

export { requestHandlerHTTP };
