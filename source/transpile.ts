import { transpile } from "#emit";
import { toFileUrl, common, parse } from "#path";
import { ensureDir } from "#fs";

async function write(value: string | ReadableStream<string>, key: string) {
    const cwd = toFileUrl(Deno.cwd()).href;

    if (key.startsWith(cwd)) {
        const commonPath = common([
            cwd,
            key,
        ]);

        const shortFileName = key.replace(`${commonPath}`, ``);

        const outputFileName = `${Deno.cwd()}/www/js/${shortFileName.replace('source/', '')}.js`;

        const { dir } = parse(outputFileName);

        await ensureDir(dir);
        await Deno.writeTextFile(outputFileName, value);
    }
}
async function beers() {
    try {
        const result = await transpile(`${Deno.cwd()}/source/beers-dom.tsx`, { importMap: `${Deno.cwd()}/transpile.importmap`, compilerOptions: { sourceMap: true } });
        result.forEach(write);
        console.log('beers transpilesd');
    } catch (error) {
        console.error(error.message)
    }
}

async function home() {
    try {
        const result = await transpile(`${Deno.cwd()}/source/home-dom.tsx`, { importMap: `${Deno.cwd()}/transpile.importmap`, compilerOptions: { sourceMap: true } });
        result.forEach(write);
        console.log('home transpilesd');
    } catch (error) {
        console.error(error.message)
    }
}

if (import.meta.main) {
    home();
    beers();
}

export { home, beers }