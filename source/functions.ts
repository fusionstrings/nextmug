
function removeLeadingSlash(pathname: URL['pathname']) {
    if (pathname.startsWith("/")) {
        return pathname.slice(1);
    }
    return pathname;
}

function removeTrailingSlash(pathname: URL['pathname']) {
    if (pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }
    return pathname;
}

function removeSlashes(pathname: URL['pathname']) {
    return removeTrailingSlash(removeLeadingSlash(pathname));
}

async function api(queryString: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "";

        if (!page) {
            searchParams.append("page", "1");
        }

        const perPage = searchParams.get("per_page") || "";

        if (!perPage) {
            searchParams.append("per_page", "25");
        }

        const searchTermABV = searchParams.get("abv") || "";
        const searchTermIBU = searchParams.get("ibu") || "";
        const searchTermEBC = searchParams.get("ebc") || "";

        if (searchTermABV) {
            searchParams.append("abv_gt", Number.parseFloat(searchTermABV) - 0.1);
            searchParams.append("abv_lt", Number.parseFloat(searchTermABV) + 0.1);
        }

        if (searchTermIBU) {
            searchParams.append("ibu_gt", Number.parseFloat(searchTermIBU) - 1);
            searchParams.append("ibu_lt", Number.parseFloat(searchTermIBU) + 1);
        }

        if (searchTermEBC) {
            searchParams.append("ebc_gt", Number.parseFloat(searchTermEBC) - 1);
            searchParams.append("ebc_lt", Number.parseFloat(searchTermEBC) + 1);
        }

        const search = searchParams.toString();
        
        const beerData = await import(
            `https://api.punkapi.com/v2/beers?${search}`,
            {
                assert: { type: "json" },
            }
        );

        const beers = {};

        beerData.default.forEach((beer) => {
            beers[beer.id] = beer;
        });

        return { beers, search };
    } catch (error) {
        console.error(error.message || error.toString());
    }
}

export { removeSlashes, api }