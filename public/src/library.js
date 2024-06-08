globalThis.RSRC.get('library').resolve(async function () {
 return {
  add(...values) {
   return values.reduce((sum, x) => sum + x, 0)
  },
 }
})
