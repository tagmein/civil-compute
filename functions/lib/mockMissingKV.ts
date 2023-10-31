const MOCK_KV_URL =
 'http://localhost:3333'

type MockKV = {
 get: (
  key: string
 ) => Promise<string | undefined>
 put: (
  key: string,
  value: string,
  options: { expirationTtl: number }
 ) => Promise<void>
}

function createMockKV(): MockKV {
 const get = async (key: string) => {
  const response = await fetch(
   MOCK_KV_URL +
    `?key=${encodeURIComponent(key)}`
  )
  return response.text()
 }

 const put = async (
  key: string,
  value: string,
  options: {
   expirationTtl?: number
  } = {}
 ) => {
  const response = await fetch(
   MOCK_KV_URL +
    `?key=${encodeURIComponent(
     key
    )}&expiration_ttl=${
     options.expirationTtl ?? ''
    }`,
   {
    method: 'post',
    body: value,
    headers: {
     'Content-Length':
      value.length.toString(10),
     'Content-Type': 'text/plain',
    },
   }
  )
  if (!response.ok) {
   throw new Error(
    await response.text()
   )
  }
 }

 return { get, put }
}

export function mockMissingKV(
 env: Record<string, any>,
 key: string
) {
 if (!env[key]) {
  env[key] = createMockKV()
 }
}
