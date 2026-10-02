// OpenNext for Cloudflare Workers. See wrangler.jsonc.
// Static-assets incremental cache: prerendered pages/route handlers are served from the Worker's
// assets, so deploys need no KV writes. Nothing here relies on ISR revalidation.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
