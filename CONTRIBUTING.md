# Contributing

Thanks for taking a look at **Fuji at Dusk · Lawson**.

## Before opening a PR

- Keep the theme dependency-free: no remote fonts, CDN assets, WebGL or npm
  runtime dependencies.
- Keep the existing slot ids and the local-storage key stable unless the change
  intentionally migrates them.
- Run the validation script:

```bash
node --check client.js
node --check index.js
node --check splash.js
node -e "for (const f of ['package.json','locale/zh.json','locale/en.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```

- If you change CSS inside `client.js` or `splash.js`, also verify that the
  template literal still parses in a browser; the project deliberately avoids a
  build step.
- Include a screenshot or a short recording for visual changes.

## Scope

Good contributions include new material finishes, edge treatments, accessibility
fixes, location/weather reliability, quote content, and compatibility updates for
new DeepSeek Harness versions.

Please do not commit unrelated profile data, personal paths, API keys, or
third-party copyrighted images. See [ASSETS.md](ASSETS.md) for the image policy.
