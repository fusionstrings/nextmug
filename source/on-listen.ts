async function onListen({ port, hostname }) {
    const { home, beers } = await import('#transpile');
    home();
    beers();
    console.log(`Server started at http://${hostname}:${port}`);
}

export { onListen }