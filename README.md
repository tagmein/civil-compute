# Civil Compute

A platform for hosting web applications.

## Local development

You'll need 3 separate terminal windows or tabs to run the development environment.

### Terminal 1: Wrangler

First, in terminal 1, install dependencies and start CloudFlare Wrangler for local development:

```
npm install
npm start
```

Then, visit http://localhost:8788/ in a web browser

### Terminal 2: Mock KV server

In terminal 2, run the mock kv server, which is needed for local development:

```
npm run kv
```

You should see a message like the following:

```
Server listening on http://localhost:3333
Available operations:

 • Read value at key
      GET ?key=urlEncodedKey

 • Delete value at key
   DELETE ?key=urlEncodedKey

 • Write value at key (expires in 60 seconds)
     POST ?key=urlEncodedKey&expiration_ttl=60 <body>

```

### Terminal 3: build or watch source files

In terminal 3, you need to rebuild TypeScript sources as you make changes locally.

To rebuild TypeScript sources once, run:

```
npm run build
```

To watch TypeScript sources and rebuild on change, run:

```
npm run build:watch
```
