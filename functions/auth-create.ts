import type { PagesFunction } from '@cloudflare/workers-types'
import {
 createHash,
 randomBytes,
} from 'node:crypto'

interface Env {
 CIVIL_DATA_KV: KVNamespace
 HASH_SALT: string
}

interface Body {
 username: string
 password: string
 'create-account': boolean
}

function hash(
 data: string,
 salt: string
) {
 return createHash('sha256')
  .update(data + salt)
  .digest('hex')
}

function compare(
 data: string,
 salt: string,
 hashed: string
) {
 return (
  createHash('sha256')
   .update(data + salt)
   .digest('hex') === hashed
 )
}
export const onRequestPost: PagesFunction<Env> =
 async function (context) {
  const body: Body =
   await context.request.json()

  const hash_salt =
   context.env.HASH_SALT ?? ''

  const {
   access_token,
   expires_at,
   error,
  } = await createAuth(
   context.env.CIVIL_DATA_KV,
   body.username,
   body.password,
   body['create-account'],
   hash_salt
  )

  if (error) {
   const responseBody = JSON.stringify({
    error,
   })
   return new Response(responseBody, {
    headers: {
     'Content-Length':
      responseBody.length.toString(),
     'Content-Type': 'application/json',
    },
    status: 400,
   }) as Response
  }

  const responseBody = JSON.stringify({
   access_token,
   expires_at,
  })

  return new Response(responseBody, {
   headers: {
    'Content-Length':
     responseBody.length.toString(),
    'Content-Type': 'application/json',
   },
  })
 }

async function createAuth(
 kv: KVNamespace,
 username: string,
 password: string,
 createAccount: boolean,
 hashSalt: string
) {
 const userKey = `#example/user-accounts/${username.toLowerCase()}`
 const userData = await kv.get(userKey)

 if (userData && !createAccount) {
  const { password_hash } =
   JSON.parse(userData)
  if (
   !compare(
    password,
    hashSalt,
    password_hash
   )
  ) {
   return { error: 'Invalid password' }
  }
 } else if (createAccount) {
  const passwordHash = hash(
   password,
   hashSalt
  )
  await kv.put(
   userKey,
   JSON.stringify({
    password_hash: passwordHash,
   })
  )
 } else {
  return {
   error: 'User does not exist',
  }
 }

 const accessToken =
  randomBytes(48).toString('hex')
 const accessTokenHash = hash(
  accessToken,
  hashSalt
 )

 const expiresAt =
  Date.now() + 1000 * 60 * 60 // 1 hour

 const session = {
  access_token_hash: accessTokenHash,
  expires_at: expiresAt,
 }

 await kv.put(
  `#example/sessions/${accessTokenHash}`,
  JSON.stringify(session)
 )

 return {
  access_token: accessToken,
  expires_at: new Date(
   expiresAt
  ).toISOString(),
 }
}
