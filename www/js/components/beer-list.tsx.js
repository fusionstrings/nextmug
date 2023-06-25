import * as React from "react";
import { BeerCard } from "#beer-detail";
import { api } from "#functions";
function SearchForm({ onSubmit , onInput , value , filteredBeerList , handleMinAbvChange , handleMaxAbvChange , minAbv , maxAbv  }) {
    const beerList = Object.entries(filteredBeerList);
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("form", {
        method: "GET",
        action: "/",
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
    }), beerList.length > 0 && /*#__PURE__*/ React.createElement("datalist", {
        id: "beer-names"
    }, beerList.map(([id, beer])=>/*#__PURE__*/ React.createElement("option", {
            key: id,
            value: beer.name
        }, "(ABV: ", beer.abv, "%)"))), /*#__PURE__*/ React.createElement("button", {
        type: "submit"
    }, "Search"), /*#__PURE__*/ React.createElement("fieldset", {
        className: `search-functions`
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
function BeerList({ beers , search  }) {
    const searchParams = new URLSearchParams(search);
    const [allBeers, setAllBeers] = React.useState(beers);
    const [filteredBeerList, setFilteredBeerList] = React.useState(allBeers);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [minAbv, setMinAbv] = React.useState(0);
    const [maxAbv, setMaxAbv] = React.useState(20);
    const [page, setPage] = React.useState(searchParams.get("page"));
    const [perPage, setPerPage] = React.useState(searchParams.get("per_page"));
    const [pageLoaded, setPageLoaded] = React.useState([
        page
    ]);
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
        const filteredData = {};
        for (const [key, value] of Object.entries(allBeers)){
            const nameMatch = value.name.toLowerCase().includes(searchTerm.toLowerCase());
            const abvMatch = (!minAbv || value.abv >= minAbv) && (!maxAbv || value.abv <= maxAbv);
            if (nameMatch && abvMatch) {
                filteredData[key] = value;
            }
        }
        setFilteredBeerList(filteredData);
    }, [
        allBeers,
        searchTerm,
        minAbv,
        maxAbv
    ]);
    React.useEffect(()=>{
        const nextPage = parseInt(page, 10) + 1;
        api(`page=${nextPage}&per_page=${perPage}`).then((data)=>{
            setAllBeers({
                ...allBeers,
                ...data.beers
            });
        });
    }, [
        page,
        perPage
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(SearchForm, {
        value: searchTerm,
        onSubmit: handleSearchFormSubmit,
        onInput: handleSearchInput,
        filteredBeerList: filteredBeerList,
        handleMinAbvChange: handleMinAbvChange,
        handleMaxAbvChange: handleMaxAbvChange,
        minAbv: minAbv,
        maxAbv: maxAbv
    }), /*#__PURE__*/ React.createElement("div", {
        className: "beer-list"
    }, Object.entries(filteredBeerList).map(([id, beer])=>/*#__PURE__*/ React.createElement(BeerCard, {
            key: id,
            ...beer
        }))));
}
export { BeerList };
