export interface KVDBPage {
 content: string
 name: string
 url: string
}

export interface KVDBDirectory {
 name: string
 directory: {
  create(name: string): Promise<boolean>
  delete(name: string): Promise<boolean>
  list(): Promise<string>
  exists(name: string): Promise<boolean>
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
  list(): Promise<string>
  exists(name: string): Promise<boolean>
  read(name: string): Promise<KVDBPage>
  save(
   name: string,
   content: string,
   url: string
  ): Promise<KVDBPage>
 }
}

export interface KVDBNamespace {
 namespace(name: string): KVDBNamespace
 root: KVDBDirectory
}

export function kvdb(
 kvNamespace: KVNamespace
): KVDBNamespace {
 return {}
}
