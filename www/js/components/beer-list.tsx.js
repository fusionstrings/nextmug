import * as React from 'react';
import { BeerOverview } from "#beer-detail";
function BeerList({ beers  }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("input", {
        type: "text",
        id: "searchBox",
        placeholder: "Search beers..."
    }), /*#__PURE__*/ React.createElement("ul", {
        id: "searchResults"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "beer-catalog"
    }, beers.map((beer)=>/*#__PURE__*/ React.createElement(BeerOverview, {
            key: beer.id,
            ...beer
        }))));
}
export { BeerList };
