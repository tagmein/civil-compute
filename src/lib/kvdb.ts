import { getAccessToken } from './auth'

interface KVDBPage {
 name: string
 content?: string
 url?: string
}

interface KVDBDirectory {
 name: string
}

interface DeletedResponse {
 deleted: boolean
}

interface ExistsResponse {
 exists: boolean
}

interface SavedResponse {
 saved: boolean
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

export type KVDBResponse =
 | DeletedResponse
 | ExistsResponse
 | DirectoryReadResponse
 | PageReadResponse
 | DirectoryListResponse
 | PageListResponse
 | SavedResponse

export function kvdb(namespace = '') {
 async function request(
  operation: string,
  name?: string,
  body?: object
 ): Promise<KVDBResponse> {
  const params = new URLSearchParams()
  params.set('namespace', namespace)
  params.set('operation', operation)

  if (name) {
   params.set('name', name)
  }

  const Authorization = getAccessToken()
  const url = '/data?' + params
  const response = body
   ? await fetch(url, {
      method: 'POST',
      headers: {
       ...(Authorization
        ? { Authorization }
        : {}),
       'Content-Type':
        'application/json',
      },
      body: JSON.stringify(body),
     })
   : await fetch(url)

  if (!response.ok) {
   throw new Error(
    `HTTP ${response.status} ${
     response.statusText
    } ${body ? 'POST' : 'GET'} ${url}`
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
    ) as Promise<DirectoryReadResponse>
   },

   async delete(name: string) {
    return request(
     'directory.delete',
     name,
     {}
    ) as Promise<DeletedResponse>
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
    ) as Promise<PageReadResponse>
   },

   async delete(name: string) {
    return request(
     'page.delete',
     name,
     {}
    ) as Promise<DeletedResponse>
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
    ) as Promise<SavedResponse>
   },
  },
 }
}
