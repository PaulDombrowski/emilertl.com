# Decap OAuth proxy (GitHub Pages)

Use an OAuth proxy so Decap can authenticate GitHub users while the site stays on GitHub Pages.

## Recommended: deploy the official Decap OAuth proxy (Cloudflare Worker)

1) Create a GitHub OAuth App
   - Homepage URL: https://emilertl.com
   - Authorization callback URL: https://<YOUR-WORKER-URL>/callback

2) Deploy the Decap OAuth proxy to Cloudflare Workers

Follow the official proxy repo instructions:

```
https://github.com/decaporg/decap-proxy
```

Set the required secrets in Cloudflare:
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

3) Update `public/admin/config.yml`

```
backend:
  name: github
  repo: PaulDombrowski/emilertl.com
  branch: main
  base_url: https://<YOUR-WORKER-URL>
  auth_endpoint: auth
```

4) Deploy the site (GitHub Pages)

```
npm run deploy
```

## Notes
- The worker URL is the Cloudflare Workers public URL (or a custom domain).
- After this, CMS login at https://emilertl.com/admin uses GitHub OAuth.
