import * as React from 'react';
function Properties({ abv , ibu , target_og , target_fg , ebc , srm , ph , attenuation_level , volume , boil_volume , method , first_brewed , description  }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("time", null, first_brewed), /*#__PURE__*/ React.createElement("p", null, description), /*#__PURE__*/ React.createElement("table", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Alcohol By Volume (ABV)"), /*#__PURE__*/ React.createElement("td", null, abv)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "International Bitterness Units (IBU)"), /*#__PURE__*/ React.createElement("td", null, ibu)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Original Gravity"), /*#__PURE__*/ React.createElement("td", null, target_og)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Final Gravity"), /*#__PURE__*/ React.createElement("td", null, target_fg)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "European Brewery Convention (EBC)"), /*#__PURE__*/ React.createElement("td", null, ebc)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Standard Reference Method (SRM)"), /*#__PURE__*/ React.createElement("td", null, srm)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "pH"), /*#__PURE__*/ React.createElement("td", null, ph)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Attenuation Level"), /*#__PURE__*/ React.createElement("td", null, attenuation_level)), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Volume"), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("strong", null, volume.value), /*#__PURE__*/ React.createElement("span", null, volume.unit))), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Boil Volume"), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("strong", null, boil_volume.value), /*#__PURE__*/ React.createElement("span", null, boil_volume.unit))), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        scope: "row"
    }, "Method"), /*#__PURE__*/ React.createElement("td", null, method.mash_temp.map(({ temp , duration  }, index)=>/*#__PURE__*/ React.createElement("table", {
            key: `${temp}-${duration}-${index}`
        }, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
            scope: "row"
        }, "Temprature"), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("strong", null, temp.value), /*#__PURE__*/ React.createElement("span", null, temp.unit))), /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
            scope: "row"
        }, "duration"), /*#__PURE__*/ React.createElement("td", null, duration))))))));
}
function BeerOverview({ id , name , tagline , image_url , description , first_brewed , abv  }) {
    return /*#__PURE__*/ React.createElement("article", {
        key: id,
        className: "beer-overview"
    }, /*#__PURE__*/ React.createElement("h3", null, name), /*#__PURE__*/ React.createElement("figure", null, /*#__PURE__*/ React.createElement("img", {
        src: image_url
    })), /*#__PURE__*/ React.createElement("p", null, tagline), /*#__PURE__*/ React.createElement("div", {
        className: "highlight"
    }, "Since ", /*#__PURE__*/ React.createElement("time", null, first_brewed), /*#__PURE__*/ React.createElement("a", {
        className: "pill",
        href: `beers?abv=${abv}`
    }, "ABV ", abv)));
}
function BeerDetail({ id , name , tagline , image_url , description , first_brewed , abv , ibu , target_og , target_fg , ebc , srm , ph , attenuation_level , volume , boil_volume , method , ingredients , food_pairing , brewers_tips , contributed_by  }) {
    return /*#__PURE__*/ React.createElement("article", {
        key: id
    }, /*#__PURE__*/ React.createElement("h2", null, name), /*#__PURE__*/ React.createElement("h3", null, tagline), /*#__PURE__*/ React.createElement("time", null, first_brewed), /*#__PURE__*/ React.createElement("img", {
        src: image_url
    }), /*#__PURE__*/ React.createElement("p", null, description), /*#__PURE__*/ React.createElement(Properties, {
        abv: abv,
        ibu: ibu,
        target_og: target_og,
        target_fg: target_fg,
        ebc: ebc,
        srm: srm,
        ph: ph,
        attenuation_level: attenuation_level,
        volume: volume,
        boil_volume: boil_volume,
        method: method,
        first_brewed: first_brewed,
        description: description
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h4", null, "Ingredients"), /*#__PURE__*/ React.createElement("h5", null, "Malts"), ingredients?.malt.map(({ name , amount  }, index)=>/*#__PURE__*/ React.createElement("p", {
            key: `${name}-${amount}-${index}`
        }, /*#__PURE__*/ React.createElement("strong", null, name), /*#__PURE__*/ React.createElement("strong", null, amount.value), /*#__PURE__*/ React.createElement("span", null, amount.unit))), /*#__PURE__*/ React.createElement("h5", null, "Hops"), ingredients?.hops.map(({ name , amount , add , attribute  }, index)=>/*#__PURE__*/ React.createElement(Fragment, {
            key: `${name}-${amount}-${index}`
        }, /*#__PURE__*/ React.createElement("p", null, /*#__PURE__*/ React.createElement("strong", null, name), /*#__PURE__*/ React.createElement("strong", null, amount.value), /*#__PURE__*/ React.createElement("span", null, amount.unit)), /*#__PURE__*/ React.createElement("p", null, "Add: ", add), /*#__PURE__*/ React.createElement("p", null, "Attribute: ", attribute))), /*#__PURE__*/ React.createElement("h5", null, "Yeast"), /*#__PURE__*/ React.createElement("p", null, ingredients.yeast)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h4", null, "Food Pairing"), /*#__PURE__*/ React.createElement("p", null, food_pairing.map((food, index)=>/*#__PURE__*/ React.createElement("span", {
            key: `${food}-${index}`
        }, food)))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h4", null, "Brewers Tips"), /*#__PURE__*/ React.createElement("p", null, brewers_tips)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h4", null, "Contributed by"), /*#__PURE__*/ React.createElement("p", null, contributed_by)));
}
export { BeerDetail, BeerOverview };
