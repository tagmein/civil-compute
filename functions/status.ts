import { PagesFunction } from '@cloudflare/workers-types'

interface Env {
 CIVIL_DATA_KV: KVNamespace
 CIVIL_DATA_BUCKET: R2Bucket
}

export const onRequestGet: PagesFunction<Env> =
 async function (context) {
  return new Response(
   'status:ok Civil Compute Platform is running normally'
  )
 }
