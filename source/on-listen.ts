function onListen({ port, hostname }) {
    console.log(`Server started at http://${hostname}:${port}`);
}

export { onListen }