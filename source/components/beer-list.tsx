import * as React from "react";
import { BeerCard } from "#beer-detail";

import { api } from "#functions";

import type { Beer } from "#types";

type SearchFormProps = {
  onSubmit: React.DOMAttributes<HTMLFormElement>;
  onInput: React.DOMAttributes<HTMLInputElement>;
  value: string;
  filteredBeerList: Beer[];
  handleMinAbvChange: React.ChangeEvent<HTMLInputElement>;
  handleMaxAbvChange: React.ChangeEvent<HTMLInputElement>;
  minAbv: number;
  maxAbv: number;
};

function SearchForm(
  {
    onSubmit,
    onInput,
    value,
    filteredBeerList,
    handleMinAbvChange,
    handleMaxAbvChange,
    minAbv,
    maxAbv,
  }: SearchFormProps,
) {
  const beerList = Object.entries(filteredBeerList);
  return (
    <div>
      <form
        method="GET"
        action="/"
        onSubmit={onSubmit}
        id="search-form"
        name="search-form"
        className="search-form"
      >
        <input
          type="search"
          autoFocus={true}
          placeholder="Find your next mug"
          autoComplete="on"
          name="name"
          onInput={onInput}
          value={value}
          list="beer-names"
        />
        {beerList.length > 0 && (
          <datalist id="beer-names">
            {beerList.map(([id, beer]) => (
              <option key={id} value={beer.name}>
                (ABV: {beer.abv}%)
              </option>
            ))}
          </datalist>
        )}
        <button type="submit">Search</button>
        <fieldset
          className={`search-functions`}
        >
          <div className="abv-range-min">
            <label htmlFor="min-abv" className="range-label">Min ABV:</label>
            <output htmlFor="min-abv" className="range-value">{minAbv}</output>
            <input
              className="range-slider"
              type="range"
              id="min-abv"
              min="0"
              max="20"
              step="0.1"
              value={minAbv}
              onChange={handleMinAbvChange}
            />
          </div>

          <div className="abv-range-max">
            <label htmlFor="max-abv" className="range-label">Max ABV:</label>
            <output htmlFor="max-abv" className="range-value">{maxAbv}</output>
            <input
              className="range-slider"
              type="range"
              id="max-abv"
              min="0"
              max="20"
              step="0.1"
              value={maxAbv}
              onChange={handleMaxAbvChange}
            />
          </div>
          <a href="/beers/random">Random Beer</a>
        </fieldset>
      </form>
    </div>
  );
}

type Props = { beers: { number: Beer }; search: string };

function BeerList({ beers, search }: Props) {
  const searchParams = new URLSearchParams(search);

  const [allBeers, setAllBeers] = React.useState(beers);

  const [downloadedBeers, setDownloadedBeers] = React.useState(beers);

  const [filteredBeerList, setFilteredBeerList] = React.useState(allBeers);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [minAbv, setMinAbv] = React.useState(0);
  const [maxAbv, setMaxAbv] = React.useState(20);
  const [page, setPage] = React.useState(searchParams.get("page"));
  const [perPage, setPerPage] = React.useState(searchParams.get("per_page"));
  const [pageLoaded, setPageLoaded] = React.useState([page]);

  function handleSearchInput(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();

    const { value } = event?.currentTarget;
    setSearchTerm(value);
  }

  function handleMinAbvChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event?.currentTarget;
    setMinAbv(value);
  }

  function handleMaxAbvChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event?.currentTarget;
    setMaxAbv(value);
  }

  function handleSearchFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    setPage("1");
  }

  function handlePagination(
    event: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number,
  ) {
    event.preventDefault();
    setPage(`${pageNumber}`);
  }

  React.useEffect(() => {
    const filteredData = {};

    for (const [key, value] of Object.entries(downloadedBeers)) {
      const nameMatch = value.name.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );

      const abvMatch = (!minAbv || value.abv >= minAbv) &&
        (!maxAbv || value.abv <= maxAbv);

      if (nameMatch && abvMatch) {
        filteredData[key] = value;
      }
    }

    setFilteredBeerList(filteredData);
    //setPage("1"); // Reset the page to the first page when applying the filter
  }, [downloadedBeers, searchTerm, minAbv, maxAbv]);

  // React.useEffect(() => {
  //   const nextPage = parseInt(page, 10) + 1;
  //   api(`page=${nextPage}&per_page=${perPage}`).then((data) => {
  //     setAllBeers({ ...allBeers, ...data.beers });
  //   });
  // }, [page, perPage]);

  React.useEffect(() => {
    if (pageLoaded.includes(page)) {
      return; // Skip if the page has already been loaded
    }

    api(`page=${page}&per_page=${perPage}`).then((data) => {
      setDownloadedBeers((prevDownloadedBeers) => ({ ...prevDownloadedBeers, ...data.beers }));
      setPageLoaded([...pageLoaded, page]); // Mark the current page as loaded
    });
  }, [page, perPage, pageLoaded, downloadedBeers]);

  const previousPage = page ? parseInt(page, 10) - 1 : 0;
  const nextPage = page ? parseInt(page, 10) + 1 : 2;

  return (
    <React.Fragment>
      <SearchForm
        value={searchTerm}
        onSubmit={handleSearchFormSubmit}
        onInput={handleSearchInput}
        filteredBeerList={filteredBeerList}
        handleMinAbvChange={handleMinAbvChange}
        handleMaxAbvChange={handleMaxAbvChange}
        minAbv={minAbv}
        maxAbv={maxAbv}
      />
      <div className="beer-list">
        {Object.entries(filteredBeerList).map(([id, beer]) => (
          <BeerCard key={id} {...beer} />
        ))}
      </div>
      <div className="pagination">
        {previousPage >= 1 && (
          <a
            href={`/?page=${previousPage}`}
            onClick={(event) => handlePagination(event, previousPage)}
          >
            Previous
          </a>
        )}
        {nextPage >= 1 && (
          <a
            href={`/?page=${nextPage}`}
            onClick={(event) => handlePagination(event, nextPage)}
          >
            Next
          </a>
        )}
      </div>
    </React.Fragment>
  );
}

export { BeerList };
