import * as React from "react";
import { BeerOverview } from "#beer-detail";
function SearchForm({ onSubmit , onInput , value , showAdvanceSearch , filteredBeerList , handleMinAbvChange , handleMaxAbvChange , minAbv , maxAbv  }) {
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("form", {
        method: "GET",
        action: "/beers",
        onSubmit: onSubmit,
        id: "search-form",
        name: "search-form",
        className: "search-form"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "search",
        autoFocus: true,
        placeholder: "Find your next mug",
        autoComplete: "on",
        name: "name",
        onInput: onInput,
        value: value,
        list: "beer-names"
    }), filteredBeerList.length > 0 && /*#__PURE__*/ React.createElement("datalist", {
        id: "beer-names"
    }, filteredBeerList.map((beer)=>/*#__PURE__*/ React.createElement("option", {
            key: beer.id,
            value: beer.name
        }, "(ABV: ", beer.abv, "%)"))), /*#__PURE__*/ React.createElement("button", {
        type: "submit"
    }, "Search"), /*#__PURE__*/ React.createElement("fieldset", {
        className: `search-functions ${showAdvanceSearch ? "show" : "hide"}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "abv-range-min"
    }, /*#__PURE__*/ React.createElement("label", {
        htmlFor: "min-abv",
        className: "range-label"
    }, "Min ABV:"), /*#__PURE__*/ React.createElement("output", {
        htmlFor: "min-abv",
        className: "range-value"
    }, minAbv), /*#__PURE__*/ React.createElement("input", {
        className: "range-slider",
        type: "range",
        id: "min-abv",
        min: "0",
        max: "20",
        step: "0.1",
        value: minAbv,
        onChange: handleMinAbvChange
    })), /*#__PURE__*/ React.createElement("div", {
        className: "abv-range-max"
    }, /*#__PURE__*/ React.createElement("label", {
        htmlFor: "max-abv",
        className: "range-label"
    }, "Max ABV:"), /*#__PURE__*/ React.createElement("output", {
        htmlFor: "max-abv",
        className: "range-value"
    }, maxAbv), /*#__PURE__*/ React.createElement("input", {
        className: "range-slider",
        type: "range",
        id: "max-abv",
        min: "0",
        max: "20",
        step: "0.1",
        value: maxAbv,
        onChange: handleMaxAbvChange
    })), /*#__PURE__*/ React.createElement("a", {
        href: "/beers/random"
    }, "Random Beer"))));
}
function BeerList({ beers  }) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filteredBeerList, setFilteredBeerList] = React.useState(beers);
    const [showAdvanceSearch, setShowAdvanceSearch] = React.useState(false);
    const [minAbv, setMinAbv] = React.useState(0);
    const [maxAbv, setMaxAbv] = React.useState(20);
    function handleSearchInput(event) {
        event.preventDefault();
        const { value  } = event?.currentTarget;
        setSearchTerm(value);
    }
    function handleMinAbvChange(event) {
        const { value  } = event?.currentTarget;
        setMinAbv(value);
    }
    function handleMaxAbvChange(event) {
        const { value  } = event?.currentTarget;
        setMaxAbv(value);
    }
    function handleSearchFormSubmit(event) {
        event.preventDefault();
    }
    React.useEffect(()=>{
        const filteredResults = beers.filter((beer)=>{
            const nameMatch = beer.name.toLowerCase().includes(searchTerm.toLowerCase());
            const abvMatch = (!minAbv || beer.abv >= minAbv) && (!maxAbv || beer.abv <= maxAbv);
            return nameMatch && abvMatch;
        });
        setFilteredBeerList(filteredResults);
    }, [
        searchTerm,
        minAbv,
        maxAbv
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(SearchForm, {
        value: searchTerm,
        onSubmit: handleSearchFormSubmit,
        onInput: handleSearchInput,
        showAdvanceSearch: showAdvanceSearch,
        filteredBeerList: filteredBeerList,
        handleMinAbvChange: handleMinAbvChange,
        handleMaxAbvChange: handleMaxAbvChange,
        minAbv: minAbv,
        maxAbv: maxAbv
    }), /*#__PURE__*/ React.createElement("div", {
        className: "beer-catalog"
    }, filteredBeerList.map((beer)=>/*#__PURE__*/ React.createElement(BeerOverview, {
            key: beer.id,
            ...beer
        }))));
}
export { BeerList };
