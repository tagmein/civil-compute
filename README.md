# Civil Compute

A platform for hosting web applications.

## Local development

First, install dependencies and start CloudFlare Wrangler for local development:

```
npm install
npm start
```

Then, visit http://localhost:8788/

In a separate terminal window / tab, you need to rebuild TypeScript sources as you make changes locally.

To rebuild TypeScript sources once, run:

```
npm run build
```

To watch TypeScript sources and rebuild on change, run:

```
npm run build:watch
```
