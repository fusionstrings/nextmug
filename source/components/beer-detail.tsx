import * as React from 'react';
import type { Beer, Properties } from "#types";

function Properties({
  abv,
  ibu,
  target_og,
  target_fg,
  ebc,
  srm,
  ph,
  attenuation_level,
  volume,
  boil_volume,
  method,
  first_brewed,
  description,
}: Properties) {
  return (
    <React.Fragment>
      <time>{first_brewed}</time>
      <p>{description}</p>
      <table>
        <tr>
          <th scope="row">Alcohol By Volume (ABV)</th>
          <td>{abv}</td>
        </tr>
        <tr>
          <th scope="row">International Bitterness Units (IBU)</th>
          <td>{ibu}</td>
        </tr>
        <tr>
          <th scope="row">Original Gravity</th>
          <td>{target_og}</td>
        </tr>
        <tr>
          <th scope="row">Final Gravity</th>
          <td>{target_fg}</td>
        </tr>
        <tr>
          <th scope="row">European Brewery Convention (EBC)</th>
          <td>{ebc}</td>
        </tr>
        <tr>
          <th scope="row">Standard Reference Method (SRM)</th>
          <td>{srm}</td>
        </tr>
        <tr>
          <th scope="row">pH</th>
          <td>{ph}</td>
        </tr>
        <tr>
          <th scope="row">Attenuation Level</th>
          <td>{attenuation_level}</td>
        </tr>
        <tr>
          <th scope="row">Volume</th>
          <td>
            <strong>{volume.value}</strong>
            <span>{volume.unit}</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Boil Volume</th>
          <td>
            <strong>{boil_volume.value}</strong>
            <span>{boil_volume.unit}</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Method</th>
          <td>
            {method.mash_temp.map(({ temp, duration }, index) => (
              <table key={`${temp}-${duration}-${index}`}>
                <tr>
                  <th scope="row">Temprature</th>
                  <td>
                    <strong>{temp.value}</strong>
                    <span>{temp.unit}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">duration</th>
                  <td>{duration}</td>
                </tr>
              </table>
            ))}
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
}

function BeerOverview({
  id,
  name,
  tagline,
  image_url,
  description,
  first_brewed,
  abv,
  ibu,
  ebc
}: Beer) {
  return (
    <article key={id} className="beer-overview">
      <h3>{name}</h3>
      <figure>
        <img src={image_url} />
      </figure>
      <p>{tagline}</p>

      <div className="highlight">
        Since <time>{first_brewed}</time>
        <a className="pill" href={`beers?abv=${abv}`}>ABV {abv}</a>
        <a className="pill" href={`beers?ibu=${ibu}`}>IBU {ibu}</a>
        <a className="pill" href={`beers?ebc=${ebc}`}>EBC {ebc}</a>
      </div>
    </article>
  );
}

function BeerDetail({
  id,
  name,
  tagline,
  image_url,
  description,
  first_brewed,
  abv,
  ibu,
  target_og,
  target_fg,
  ebc,
  srm,
  ph,
  attenuation_level,
  volume,
  boil_volume,
  method,
  ingredients,
  food_pairing,
  brewers_tips,
  contributed_by,
}: Beer) {
  return (
    <article key={id}>
      <h2>{name}</h2>
      <h3>{tagline}</h3>
      <time>{first_brewed}</time>
      <img src={image_url} />
      <p>{description}</p>
      <Properties
        abv={abv}
        ibu={ibu}
        target_og={target_og}
        target_fg={target_fg}
        ebc={ebc}
        srm={srm}
        ph={ph}
        attenuation_level={attenuation_level}
        volume={volume}
        boil_volume={boil_volume}
        method={method}
        first_brewed={first_brewed}
        description={description}
      />

      <div>
        <h4>Ingredients</h4>
        <h5>Malts</h5>
        {ingredients?.malt.map(({ name, amount }, index) => (
          <p key={`${name}-${amount}-${index}`}>
            <strong>{name}</strong>
            <strong>{amount.value}</strong>
            <span>{amount.unit}</span>
          </p>
        ))}

        <h5>Hops</h5>
        {ingredients?.hops.map(({ name, amount, add, attribute }, index) => (
          <React.Fragment key={`${name}-${amount}-${index}`}>
            <p>
              <strong>{name}</strong>
              <strong>{amount.value}</strong>
              <span>{amount.unit}</span>
            </p>
            <p>Add: {add}</p>
            <p>Attribute: {attribute}</p>
          </React.Fragment>
        ))}
        <h5>Yeast</h5>
        <p>{ingredients.yeast}</p>
      </div>
      <div>
        <h4>Food Pairing</h4>
        <p>
          {food_pairing.map((food, index) => (
            <span key={`${food}-${index}`}>{food}</span>
          ))}
        </p>
      </div>
      <div>
        <h4>Brewers Tips</h4>
        <p>{brewers_tips}</p>
      </div>

      <div>
        <h4>Contributed by</h4>
        <p>{contributed_by}</p>
      </div>
    </article>
  );
}

export { BeerDetail, BeerOverview };
