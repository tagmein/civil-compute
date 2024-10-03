const LOAD = (globalThis.LOAD = {}),
 loadFrom = (globalThis.loadFrom =
  (rootUrl = '/', namePrefix = '') =>
  async (urlPath) => {
   const fullUrlPath = `${namePrefix}${urlPath}`
   // console.log('load', fullUrlPath)
   if (fullUrlPath in LOAD) {
    return LOAD[fullUrlPath].promise
   }
   const resource = (LOAD[fullUrlPath] = {})
   resource.promise = new Promise((resolve, reject) =>
    Object.assign(resource, {
     reject,
     async resolve(value) {
      if (typeof value === 'function') {
       const newNamePrefix = urlPath.includes('/')
        ? urlPath.substring(0, urlPath.lastIndexOf('/') + 1)
        : ''
       const load = loadFrom(`${rootUrl}${newNamePrefix}`, newNamePrefix)
       resolve(await value({ load, loadFrom }))
      } else {
       resolve(value)
      }
     },
    })
   )
   const script = document.createElement('script')
   script.setAttribute('src', `${rootUrl}${urlPath}.js`)
   document.body.appendChild(script)
   return resource.promise
  })
