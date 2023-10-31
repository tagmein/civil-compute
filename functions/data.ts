import type { PagesFunction } from '@cloudflare/workers-types'
import { getUserSession } from './lib/auth'
import { createResponse } from './lib/createResponse'
import { kvdb } from './lib/kvdb'
import { mockMissingKV } from './lib/mockMissingKV'

interface Env {
 CIVIL_DATA_KV: KVNamespace
 HASH_SALT: string
}

export const onRequestGet: PagesFunction<
 Env
> = async ({ env, request }) => {
 mockMissingKV(env, 'CIVIL_DATA_KV')
 try {
  const params = new URL(request.url)
   .searchParams
  const name = params.get('name')
  const namespace = params.get(
   'namespace'
  )
  const operation = params.get(
   'operation'
  )

  const db = kvdb(
   env.CIVIL_DATA_KV,
   namespace
  )

  switch (operation) {
   case 'directory.exists':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for directory.exists'
     )
    }
    {
     const exists =
      await db.root.directory.exists(
       name
      )
     return createResponse({ exists })
    }

   case 'directory.read':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for directory.read'
     )
    }
    const dir =
     await db.root.directory.read(name)
    return createResponse({
     dir: { name: dir.name },
    })

   case 'directory.list':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for directory.list'
     )
    }
    const dirs =
     await db.root.directory.list(name)
    return createResponse({ dirs })

   case 'page.exists':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for page.exists'
     )
    }
    {
     const exists =
      await db.root.page.exists(name)
     return createResponse({ exists })
    }

   case 'page.read':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for page.read'
     )
    }
    const page =
     await db.root.page.read(name)
    return createResponse({ page })

   case 'page.list':
    if (typeof name !== 'string') {
     throw Error(
      'Name required for page.list'
     )
    }
    const pages =
     await db.root.page.list(name)
    return createResponse({ pages })

   default:
    return createResponse(
     {
      error: 'Unknown operation',
     },
     { status: 400 }
    )
  }
 } catch (err) {
  console.error(
   request.method,
   request.url,
   err
  )
  return createResponse(
   {
    error: err.message,
   },
   {
    status: 500,
   }
  )
 }
}

type Operation =
 | 'directory.create'
 | 'directory.delete'
 | 'page.create'
 | 'page.delete'
 | 'page.save'

type Body = {
 content?: string
 url?: string
}

export const onRequestPost: PagesFunction<
 Env
> = async ({ env, request }) => {
 mockMissingKV(env, 'CIVIL_DATA_KV')
 try {
  const params = new URL(request.url)
   .searchParams
  const name = params.get('name')
  const namespace = params.get(
   'namespace'
  )
  const operation = params.get(
   'operation'
  ) as Operation

  if (typeof name !== 'string') {
   return createResponse(
    {
     error: 'name is required',
    },
    { status: 400 }
   )
  }

  if (namespace.includes('#')) {
   return createResponse(
    {
     error:
      'namespace is invalid, cannot contain #',
    },
    { status: 400 }
   )
  }

  const access_token =
   request.headers.get('Authorization')
  if (!access_token) {
   return createResponse(
    { error: 'unauthorized' },
    {
     status: 401,
    }
   )
  }
  const hash_salt = env.HASH_SALT ?? ''
  const { user } = await getUserSession(
   env.CIVIL_DATA_KV,
   access_token,
   hash_salt
  )

  if (!user) {
   return createResponse(
    { error: 'unauthorized' },
    {
     status: 401,
    }
   )
  }

  const userNamespace = `users/${user.username}`

  const userCanMutateNamespace =
   namespace === userNamespace ||
   namespace.startsWith(
    `${userNamespace}/`
   )

  if (!userCanMutateNamespace) {
   return createResponse(
    { error: 'forbidden' },
    { status: 403 }
   )
  }

  const db = kvdb(
   env.CIVIL_DATA_KV,
   namespace
  )

  const body: Body =
   await request.json()

  switch (operation) {
   // Directories

   case 'directory.create':
    const dir =
     await db.root.directory.create(
      name
     )
    return createResponse({
     dir: { name: dir.name },
    })

   case 'directory.delete':
    const deleted =
     await db.root.directory.delete(
      name
     )
    return createResponse({ deleted })

   // Pages

   case 'page.create':
    const page =
     await db.root.page.create(
      name,
      body.content,
      body.url
     )
    return createResponse({ page })

   case 'page.save':
    await db.root.page.save(
     name,
     body.content,
     body.url
    )
    return createResponse({
     saved: true,
    })

   case 'page.delete': {
    const deleted =
     await db.root.page.delete(name)
    return createResponse({ deleted })
   }
   // Default

   default:
    return createResponse(
     {
      error: 'Unknown operation',
     },
     { status: 400 }
    )
  }
 } catch (err) {
  console.error(
   request.method,
   request.url,
   err
  )
  return createResponse(
   {
    error: err.message,
   },
   {
    status: 500,
   }
  )
 }
}
