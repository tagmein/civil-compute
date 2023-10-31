import type { PagesFunction } from '@cloudflare/workers-types'
import { kvdb } from './lib/kvdb'

interface Env {
 CIVIL_DATA_KV: KVNamespace
}

function createResponse(
 data: boolean | object,
 options: { status?: number } = {}
) {
 return new Response(
  JSON.stringify(data),
  {
   status: options.status || 200,
   headers: {
    'Content-Type': 'application/json',
   },
   ...options,
  }
 )
}

export const onRequestGet: PagesFunction<
 Env
> = async ({ env, request }) => {
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
    if (!name) {
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
    if (!name) {
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
    if (name) {
     throw Error(
      'Name should not be provided for directory.list'
     )
    }
    const dirs =
     await db.root.directory.list()
    return createResponse({ dirs })

   case 'page.exists':
    if (!name) {
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
    if (!name) {
     throw Error(
      'Name required for page.read'
     )
    }
    const page =
     await db.root.page.read(name)
    return createResponse({ page })

   case 'page.list':
    if (name) {
     throw Error(
      'Name should not be provided for page.list'
     )
    }
    const pages =
     await db.root.page.list()
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
 try {
  const userNamespace = 'users/example'
  const params = new URL(request.url)
   .searchParams
  const name = params.get('name')
  const namespace = params.get(
   'namespace'
  )
  const operation = params.get(
   'operation'
  ) as Operation

  if (
   namespace &&
   !namespace.startsWith(userNamespace)
  ) {
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
     db.root.page.delete(name)
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
