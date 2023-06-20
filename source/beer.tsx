import { renderToReadableStream } from "react-dom/server";
import { Beer } from "./components/beer.tsx";
async function requestHandlerHTTP(request: Request) {
  const { pathname } = new URL(request.url);

  // Specify the pattern as structured data.
  const pattern = new URLPattern({ pathname: "/beers/:beer" });
  const match = pattern.exec(pathname);
  const beer = match ? match.pathname.groups.beer : "random";
  console.log(beer);

  // const data = await import(`https://api.punkapi.com/v2/beers/${beer}`, {
  //   assert: { type: "json" },
  // });

  const data = await fetch(`https://api.punkapi.com/v2/beers/${beer}`);
  const jsonData = await data.json();
  console.log(jsonData);
  const stream = await renderToReadableStream(<Beer beer={jsonData} />);

  return new Response(stream, {
    headers: { "content-type": "text/html" },
  });
}

export { requestHandlerHTTP };
