interface KVDBPage {
 name: string
 content?: string
 url?: string
}

interface KVDBDirectory {
 name: string
}

interface ExistsResponse {
 exists: boolean
}

interface DirectoryReadResponse {
 dir: KVDBDirectory
}

interface PageReadResponse {
 page: KVDBPage
}

interface DirectoryListResponse {
 dirs: string[]
}

interface PageListResponse {
 pages: string[]
}

export function kvdb(namespace = '') {
 async function request(
  operation: string,
  name?: string,
  body?: object
 ): Promise<any> {
  const params = new URLSearchParams()
  params.set('namespace', namespace)
  params.set('operation', operation)

  if (name) {
   params.set('name', name)
  }

  let url = '/data?' + params
  let response

  if (body) {
   response = await fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
   })
  } else {
   response = await fetch(
    url + '?' + params
   )
  }

  return response.json()
 }
 return {
  directory: {
   async create(name: string) {
    return request(
     'directory.create',
     name,
     { name }
    ) as Promise<KVDBDirectory>
   },

   async delete(name: string) {
    return request(
     'directory.delete',
     name,
     {}
    ) as Promise<boolean>
   },

   async read(name: string) {
    return request(
     'directory.read',
     name
    ) as Promise<DirectoryReadResponse>
   },

   async list() {
    return request(
     'directory.list'
    ) as Promise<DirectoryListResponse>
   },

   async exists(name: string) {
    return request(
     'directory.exists',
     name
    ) as Promise<ExistsResponse>
   },
  },

  page: {
   async create(page: KVDBPage) {
    return request(
     'page.create',
     page.name,
     page
    ) as Promise<KVDBPage>
   },

   async delete(name: string) {
    return request(
     'page.delete',
     name,
     {}
    ) as Promise<boolean>
   },

   async read(name: string) {
    return request(
     'page.read',
     name
    ) as Promise<PageReadResponse>
   },

   async list() {
    return request(
     'page.list'
    ) as Promise<PageListResponse>
   },

   async exists(name: string) {
    return request(
     'page.exists',
     name
    ) as Promise<ExistsResponse>
   },

   async save(page: KVDBPage) {
    return request(
     'page.save',
     page.name,
     page
    ) as Promise<KVDBPage>
   },
  },
 }
}
