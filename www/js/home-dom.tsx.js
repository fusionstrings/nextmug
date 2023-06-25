import * as React from "react";
//import beers from "https://api.punkapi.com/v2/beers" assert { type: "json" };
import { hydrateRoot } from "react-dom/client";
import { BeerList } from "#beer-list";
import { api } from "#functions";
async function main() {
    try {
        const { beers , search  } = await api(import.meta.url);
        hydrateRoot(document.getElementById("home-page"), /*#__PURE__*/ React.createElement(BeerList, {
            beers: beers,
            search: search
        }));
    } catch (error) {
        console.error(error.message || error.toString());
    }
}
main();
