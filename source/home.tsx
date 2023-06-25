import * as React from "react";
import { renderToReadableStream } from "react-dom/server";
import { HomePage } from "./components/home-page.tsx";
import { api } from "#functions";

async function requestHandlerHTTP(request: Request) {
  try {
    const beers = await api(request.url);

    const importmap = await Deno.readTextFile(`${Deno.cwd()}/importmap.json`);

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "";

    if (!page) {
      searchParams.append("page", "1");
    }

    const perPage = searchParams.get("per_page") || "";

    if (!perPage) {
      searchParams.append("per_page", "80");
    }

    const stream = await renderToReadableStream(
      <HomePage importmap={importmap} beers={beers} />,
      {
        bootstrapModules: [`/js/home-dom.tsx.js?${searchParams.toString()}`],
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
