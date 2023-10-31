const DEFAULT_PORT = 3333

const ENCODING_JSON = 'application/json'
const ENCODING_PLAIN = 'text/plain'

const MAX_REQUEST_BODY_SIZE = 65536

const MEMORY = new Map()
const MEMORY_EXPIRE_KEY = new Map()

function load([librariesString]) {
 const libraries = librariesString
  .trim()
  .split('\n')
  .map((x) => x.trim())
 const result = {}
 for (const library of libraries) {
  result[library] = require(library)
 }
 return result
}

const modules = load`
 http
 path
 querystring
`

async function main() {
 const portEnv = parseInt(
  process.env.PORT,
  10
 )
 const port =
  Number.isFinite(portEnv) &&
  portEnv >= 1 &&
  portEnv < 65536
   ? portEnv
   : DEFAULT_PORT

 const httpServer =
  modules.http.createServer(
   async function (request, response) {
    try {
     const [
      requestPath,
      requestParamString,
     ] = request.url.split('?')
     const requestParams =
      modules.querystring.parse(
       requestParamString ?? ''
      )
     console.log(
      request.method,
      requestPath,
      JSON.stringify(requestParams)
     )
     switch (request.method) {
      case 'GET':
       response.statusCode = 200
       response.end(
        MEMORY.get(requestParams.key) ??
         ''
       )
       return
      case 'POST':
       const requestBody =
        await collectBody(request)
       MEMORY.set(
        requestParams.key,
        requestBody
       )
       response.statusCode = 200
       const ttl = parseInt(
        requestParams.expiration_ttl,
        10
       )
       clearTimeout(
        MEMORY_EXPIRE_KEY.get(
         requestParams.key
        )
       )
       function eraseMemoryKey() {
        MEMORY.delete(requestParams.key)
       }
       if (!isNaN(ttl)) {
        MEMORY_EXPIRE_KEY.set(
         requestParams.key,
         setTimeout(eraseMemoryKey, ttl)
        )
       }
       response.end()
       return
      default:
       response.statusCode = 405
       response.end('invalid method')
       return
     }
    } catch (e) {
     console.error(e)
     response.statusCode =
      e.statusCode ?? 500
     response.setHeader(
      'Content-Type',
      'text/plain; charset=utf-8'
     )
     response.end(e.message)
    }
   }
  )

 httpServer.listen(
  port,
  'localhost',
  function () {
   console.log(
    `Server listening on http://localhost:${port}`
   )
   console.log('Available operations:')
   console.log('')
   console.log(' • Read value at key')
   console.log(
    '   GET ?key=urlEncodedKey'
   )
   console.log('')
   console.log(
    ' • Write value at key (expires in 60 seconds)'
   )
   console.log(
    '   POST ?key=urlEncodedKey&expiration_ttl=60 <body>'
   )
   console.log('')
  }
 )
}

main().catch(function (e) {
 console.error(e)
})

async function collectBody(request) {
 return new Promise(function (
  resolve,
  reject
 ) {
  let error = false
  const contentTypeHeader =
   request.headers['content-type'] ?? ''
  const [contentType] =
   contentTypeHeader.split(';')

  if (contentType === ENCODING_JSON) {
   const bodyChunks = []
   let bodySize = 0
   request.on('data', function (chunk) {
    if (!error) {
     bodyChunks.push(chunk)
     bodySize += chunk.length
     if (
      bodySize > MAX_REQUEST_BODY_SIZE
     ) {
      error = true
      reject(
       new Error(
        `request body size cannot exceed ${MAX_REQUEST_BODY_SIZE} bytes`
       )
      )
     }
    }
   })
   request.on('end', function () {
    if (!error) {
     resolve(
      JSON.parse(
       Buffer.concat(bodyChunks)
      )
     )
    }
   })
  } else if (
   contentType === ENCODING_PLAIN
  ) {
   const bodyChunks = []
   let bodySize = 0
   request.on('data', function (chunk) {
    if (!error) {
     bodyChunks.push(chunk)
     bodySize += chunk.length
     if (
      bodySize > MAX_REQUEST_BODY_SIZE
     ) {
      error = true
      reject(
       new Error(
        `request body size cannot exceed ${MAX_REQUEST_BODY_SIZE} bytes`
       )
      )
     }
    }
   })
   request.on('end', function () {
    if (!error) {
     resolve(Buffer.concat(bodyChunks))
    }
   })
  } else {
   resolve({})
  }
 })
}
