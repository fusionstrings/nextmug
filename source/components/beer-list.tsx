import * as React from 'react';
import { BeerOverview } from "#beer-detail";

import type { Beer } from "#types";

function BeerList({ beers }: { beers: Beer[] }) {
  return (
    <React.Fragment>
      <input type="text" id="searchBox" placeholder="Search beers..." />
      <ul id="searchResults"></ul>
      <div className="beer-catalog">
        {beers.map((
          beer: Beer,
        ) => <BeerOverview key={beer.id} {...beer} />)}
      </div>
    </React.Fragment>
  );
}

export { BeerList };
