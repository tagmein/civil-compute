import { KVNamespace } from '@cloudflare/workers-types'

interface KVDBPage {
 content: string
 name: string
 url: string
}

interface KVDBDirectory {
 name: string
 lock(): Promise<
  (() => Promise<void>) | false
 >
 directory: {
  create(
   name: string
  ): Promise<KVDBDirectory>
  delete(name: string): Promise<boolean>
  exists(name: string): Promise<boolean>
  list(): Promise<string[]>
  read(
   name: string
  ): Promise<KVDBDirectory>
 }
 page: {
  create(
   name: string,
   content?: string,
   url?: string
  ): Promise<KVDBPage>
  delete(name: string): Promise<boolean>
  exists(name: string): Promise<boolean>
  list(): Promise<string[]>
  read(name: string): Promise<KVDBPage>
  save(
   name: string,
   content: string,
   url: string
  ): Promise<KVDBPage>
 }
}

interface KVDBNamespace {
 namespace(name: string): KVDBNamespace
 root: KVDBDirectory
}

export function validateName(
 name: string
) {
 if (
  name.includes('#') ||
  name.includes('/')
 ) {
  throw new Error(
   'Name cannot contain # or /'
  )
 }
}

function buildDirectory(
 kvNamespace: KVNamespace,
 namespace: string,
 basePath: string,
 name: string
): KVDBDirectory {
 const thisDirectory: KVDBDirectory = {
  name,
  directory: {
   async create(name) {
    validateName(name)
    const release =
     await thisDirectory.lock()
    if (!release) {
     throw new Error(
      'Could not obtain directory lock'
     )
    }
    try {
     const dirPath = `${basePath}/${name}`
     const dirKey = `${namespace}#${dirPath}#dir`
     const exists =
      await kvNamespace.get(dirKey)

     if (exists) {
      return buildDirectory(
       kvNamespace,
       namespace,
       basePath,
       name
      )
     }
     await kvNamespace.put(
      dirKey,
      JSON.stringify({
       created_at: Date.now(),
       name,
      })
     )

     const listKey = `${namespace}#${basePath}#list-dir`
     const dirs =
      (await kvNamespace.get<string[]>(
       listKey
      )) || []
     dirs.push(name)
     await kvNamespace.put(
      listKey,
      JSON.stringify(dirs)
     )

     return buildDirectory(
      kvNamespace,
      namespace,
      basePath,
      name
     )
    } finally {
     await release()
    }
   },

   async delete(name) {
    validateName(name)
    const release =
     await thisDirectory.lock()
    if (!release) {
     throw new Error(
      'Could not obtain directory lock'
     )
    }
    try {
     // Build sub directory object
     const subDir = buildDirectory(
      kvNamespace,
      namespace,
      basePath,
      name
     )

     // Delete sub pages
     const pages =
      await subDir.page.list()
     for (const page of pages) {
      await subDir.page.delete(page)
     }

     // Delete sub directories
     const subdirs =
      await subDir.directory.list()
     for (const dir of subdirs) {
      await subDir.directory.delete(dir)
     }

     // Delete sub directory
     await kvNamespace.delete(
      `${namespace}#${basePath}/${name}#dir`
     )

     // Update parent list
     let siblings =
      await thisDirectory.directory.list()
     siblings = siblings.filter(
      (d) => d !== name
     )
     await kvNamespace.put(
      `${namespace}#${basePath}#list-dir`,
      JSON.stringify(siblings)
     )
     return true
    } finally {
     await release()
    }
   },

   async exists(name) {
    validateName(name)

    const dirKey = `${namespace}#${basePath}/${name}#dir`
    const exists =
     (await kvNamespace.get(dirKey)) !=
     null

    return exists
   },

   async read(name) {
    validateName(name)

    const dirKey = `${namespace}#${basePath}/${name}#dir`
    const data = await kvNamespace.get(
     dirKey
    )

    if (!data) {
     throw new Error(
      `Directory ${name} does not exist`
     )
    }

    return buildDirectory(
     kvNamespace,
     namespace,
     basePath,
     name
    )
   },

   async list() {
    const listKey = `${namespace}#${basePath}#list-dir`

    const dirs =
     (await kvNamespace.get<string[]>(
      listKey
     )) || []

    return dirs
   },
  },
  async lock(retries = 3, delay = 100) {
   const key = `${namespace}#${basePath}#lock`

   for (let i = 0; i < retries; i++) {
    const existing =
     await kvNamespace.get(key)

    if (!existing) {
     const newLock = crypto.randomUUID()

     await kvNamespace.put(
      key,
      newLock,
      { expirationTtl: 15000 }
     )

     const check =
      await kvNamespace.get(key)

     if (check === newLock) {
      const release = async () => {
       await kvNamespace.delete(key)
      }

      return release
     }
    }

    await new Promise((r) =>
     setTimeout(r, delay)
    )
   }

   return false
  },

  page: {
   async create(name, content, url) {
    validateName(name)
    const release =
     await thisDirectory.lock()
    if (!release) {
     throw new Error(
      'Could not obtain directory lock'
     )
    }
    try {
     const pageKey = `${namespace}#${basePath}/${name}#page`
     await kvNamespace.put(
      pageKey,
      JSON.stringify({
       name,
       content,
       url,
      })
     )

     const listKey = `${namespace}#${basePath}#list-page`
     const pages =
      (await kvNamespace.get<string[]>(
       listKey
      )) || []
     pages.push(name)
     await kvNamespace.put(
      listKey,
      JSON.stringify(pages)
     )

     return { name, content, url }
    } finally {
     await release()
    }
   },

   async delete(name) {
    validateName(name)
    const release =
     await thisDirectory.lock()
    if (!release) {
     throw new Error(
      'Could not obtain directory lock'
     )
    }
    try {
     await kvNamespace.delete(
      `${namespace}#${basePath}/${name}#page`
     )

     const listKey = `${namespace}#${basePath}#list-page`
     let pages =
      (await kvNamespace.get<string[]>(
       listKey
      )) || []
     pages = pages.filter(
      (p) => p !== name
     )
     await kvNamespace.put(
      listKey,
      JSON.stringify(pages)
     )

     return true
    } finally {
     await release()
    }
   },

   async list() {
    const listKey = `${namespace}#${basePath}#list-page`
    return (
     (await kvNamespace.get<string[]>(
      listKey
     )) || []
    )
   },

   async exists(name) {
    validateName(name)

    const pageKey = `${namespace}#${basePath}/${name}#page`
    return (
     (await kvNamespace.get(pageKey)) !=
     null
    )
   },

   async read(name) {
    validateName(name)

    const pageKey = `${namespace}#${basePath}/${name}#page`
    const data = await kvNamespace.get(
     pageKey
    )
    return data
     ? JSON.parse(data)
     : null
   },

   async save(name, content, url) {
    validateName(name)

    if (
     !(await thisDirectory.page.exists(
      name
     ))
    ) {
     throw new Error(
      `Page ${name} not found`
     )
    }

    const pageKey = `${namespace}#${basePath}/${name}#page`
    await kvNamespace.put(
     pageKey,
     JSON.stringify({
      name,
      content,
      url,
     })
    )

    return { name, content, url }
   },
  },
 }
 return thisDirectory
}

export function validateNamespace(
 namespace: string
) {
 if (namespace.includes('#')) {
  throw new Error(
   'Namespace cannot contain #'
  )
 }
}

export function kvdb(
 kvNamespace: KVNamespace,
 namespace = ''
): KVDBNamespace {
 validateNamespace(namespace)
 const root = buildDirectory(
  kvNamespace,
  namespace,
  '',
  ''
 )

 return {
  namespace(name) {
   validateNamespace(name)
   return kvdb(
    kvNamespace,
    `${namespace}/${name}`
   )
  },
  root,
 }
}
