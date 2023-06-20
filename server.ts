import { serve } from "#http/server";
import { requestHandler } from "#request-handler";
import { onListen } from "#on-listen";

const serverOptions = {
    onListen,
    port: Deno.env.get('PORT') || 8080
}

if (import.meta.main) {
    serve(requestHandler, serverOptions);
}