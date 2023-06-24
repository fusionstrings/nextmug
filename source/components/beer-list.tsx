import * as React from "react";
import { BeerOverview } from "#beer-detail";

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
  return (
    <div>
      <form
        method="GET"
        action="/beers"
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
        {filteredBeerList.length > 0 && (
          <datalist id="beer-names">
            {filteredBeerList.map((beer) => (
              <option key={beer.id} value={beer.name}>
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

function BeerList({ beers }: { beers: Beer[] }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const [filteredBeerList, setFilteredBeerList] = React.useState(beers);

  const [minAbv, setMinAbv] = React.useState(0);
  const [maxAbv, setMaxAbv] = React.useState(20);

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
  }

  React.useEffect(() => {
    const filteredResults = beers.filter((beer) => {
      const nameMatch = beer.name.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const abvMatch = (!minAbv || beer.abv >= minAbv) &&
        (!maxAbv || beer.abv <= maxAbv);
      return nameMatch && abvMatch;
    });

    setFilteredBeerList(filteredResults);
  }, [searchTerm, minAbv, maxAbv]);

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
      <div className="beer-catalog">
        {filteredBeerList.map((
          beer: Beer,
        ) => <BeerOverview key={beer.id} {...beer} />)}
      </div>
    </React.Fragment>
  );
}

export { BeerList };
