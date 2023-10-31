import type { PagesFunction } from '@cloudflare/workers-types'
import {
 createAuth,
 getUserSession,
} from './lib/auth'
import { createResponse } from './lib/createResponse'
import { mockMissingKV } from './lib/mockMissingKV'

interface Env {
 CIVIL_DATA_KV: KVNamespace
 HASH_SALT: string
}

interface Body {
 username: string
 password: string
 'create-account': boolean
}

export const onRequestPost: PagesFunction<Env> =
 async function ({ env, request }) {
  mockMissingKV(env, 'CIVIL_DATA_KV')
  const body: Body =
   await request.json()

  const hash_salt = env.HASH_SALT ?? ''

  const {
   access_token,
   expires_at,
   error,
   user,
  } = await createAuth(
   env.CIVIL_DATA_KV,
   body.username,
   body.password,
   body['create-account'],
   hash_salt
  )

  if (error) {
   return createResponse(
    { error },
    { status: 400 }
   )
  }

  return createResponse({
   access_token,
   expires_at,
   user,
  })
 }

export const onRequestGet: PagesFunction<
 Env
> = async ({ env, request }) => {
 mockMissingKV(env, 'CIVIL_DATA_KV')
 const access_token =
  request.headers.get('Authorization')

 if (!access_token) {
  return createResponse(
   { error: 'unauthorized' },
   { status: 401 }
  )
 }

 const hash_salt = env.HASH_SALT ?? ''

 const {
  user,
  session: { expires_at },
 } = await getUserSession(
  env.CIVIL_DATA_KV,
  access_token,
  hash_salt
 )

 if (!user) {
  return createResponse(
   { error: 'unauthorized' },
   { status: 401 }
  )
 }

 return createResponse({
  user,
  expires_at,
 })
}
