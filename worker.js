import manifest from './.output/public/_nuxt/manifest.json';
import * as entry from './.output/public/_nuxt/entry.js';

const assetHandler = async ({ request, env, ctx }) => { // Function to serve static assets
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
        // Handle API requests here (see example below)
        return handleApiRequest(request);
    }

    // Serve static assets using the Nuxt build output
    try {
        const response = await entry.default.handle(request, { manifest });
        if (response) {
            return response;
        }
    } catch (e) {
        // Fallback for static assets if Nuxt handler fails
        const filePath = url.pathname === '/' ? '/index.html' : url.pathname;
        const assetResponse = await serveStaticAsset(filePath);
        if (assetResponse) {
            return assetResponse;
        }
        console.error("Static asset serving error:", e);
    }

    return new Response("Not found", { status: 404 }); // Default 404
};

async function handleApiRequest(request) { // Example API handler - adapt to your needs
    const url = new URL(request.url);
    if (url.pathname === '/api/hello') {
        return new Response(JSON.stringify({
            message: 'Hello from Cloudflare Worker API!',
            timestamp: new Date().toISOString()
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response("API Endpoint Not Found", { status: 404 });
}

async function serveStaticAsset(filePath) { // Basic static asset serving
    const assetPath = `./.output/public${filePath}`;
    try {
        // In a real worker, you'd use `import.meta.resolve` and `fetch` from the worker context
        // For simplicity in this example, assuming direct file access (not ideal in production)
        // In a real worker for production, you'd pre-upload assets to KV or use Pages Functions.
        // This example is simplified for demonstration.
        // **Important: In a production worker, you'd handle static asset serving differently (e.g., pre-uploaded to KV or using Pages Functions).**
        // For now, this simplified example is to illustrate the concept.
        // **For real static asset serving on Workers, research and implement proper methods like pre-uploading to KV or using Pages Functions.**
        return null; // Placeholder - Replace with actual static asset serving logic
    } catch (e) {
        return null;
    }
}


export default {
    async fetch(request, env, ctx) {
        return assetHandler({ request, env, ctx });
    },
};