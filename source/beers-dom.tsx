import * as React from 'react';
import beers from "https://api.punkapi.com/v2/beers" assert { type: "json" };

import { hydrateRoot } from "react-dom/client";
import { BeerList } from "#beer-list";

function main() {
  hydrateRoot(
    document.getElementById("beers-page"),
    <BeerList beers={beers} />,
  );
}

//main();
