
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

export { removeSlashes }