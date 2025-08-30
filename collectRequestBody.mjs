const ENCODING_JSON = 'application/json'
const ENCODING_PLAIN = 'text/plain'

const MAX_REQUEST_BODY_SIZE = 65536

export async function collectRequestBody(request) {
 return new Promise(function (resolve, reject) {
  let error = false
  const contentTypeHeader = request.headers['content-type'] ?? ''
  const [contentType] = contentTypeHeader.split(';')

  if (contentType === ENCODING_JSON) {
   const bodyChunks = []
   let bodySize = 0
   request.on('data', function (chunk) {
    if (!error) {
     bodyChunks.push(chunk)
     bodySize += chunk.length
     if (bodySize > MAX_REQUEST_BODY_SIZE) {
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
     resolve(JSON.parse(Buffer.concat(bodyChunks)))
    }
   })
  } else if (contentType === ENCODING_PLAIN) {
   const bodyChunks = []
   let bodySize = 0
   request.on('data', function (chunk) {
    if (!error) {
     bodyChunks.push(chunk)
     bodySize += chunk.length
     if (bodySize > MAX_REQUEST_BODY_SIZE) {
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
     resolve(Buffer.concat(bodyChunks).toString())
    }
   })
  } else {
   resolve({})
  }
 })
}
