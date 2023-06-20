import type { Beer } from "#types";
import { Fragment } from "react";

function Home({ beers }: { beers: Beer[] }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <title>Next Mug</title>

        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://ga.jspm.io" />

        <link
          rel="preload"
          href="https://ga.jspm.io/npm:@acab/reset.css@0.5.3/index.css"
          as="style"
        />
        <link rel="preload" href="css/custom-properties.css" as="style" />
        <link rel="preload" href="css/style.css" as="style" />

        <link
          rel="stylesheet"
          href="https://ga.jspm.io/npm:@acab/reset.css@0.5.3/index.css"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="css/custom-properties.css" />
        <link rel="stylesheet" href="css/styles.css" />
      </head>
      <body>
        <header>
          <h1>Next Mug</h1>
          <nav>
            <ul>
              <li>
                <a href="/beers/random">Random Beer</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          {beers.map((
            {
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
            }: Beer,
          ) => (
            <article key={id}>
              <h2>{name}</h2>
              <h3>{tagline}</h3>
              <time>{first_brewed}</time>
              <img src={image_url} />
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
                  <Fragment key={`${name}-${amount}-${index}`}>
                    <p>
                      <strong>{name}</strong>
                      <strong>{amount.value}</strong>
                      <span>{amount.unit}</span>
                    </p>
                    <p>Add: {add}</p>
                    <p>Attribute: {attribute}</p>
                  </Fragment>
                ))}
                <h5>Yeast</h5>
                <p>{ingredients.yeast}</p>
              </div>
              <div>
                <h4>Food Pairing</h4>
                <p>
                  {food_pairing.map((food, index) => <span key={`${food}-${index}`}>{food}</span>)}
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
          ))}
        </main>
        <footer id="root"></footer>
      </body>
    </html>
  );
}

export { Home };
