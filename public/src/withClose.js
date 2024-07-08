globalThis.RSRC.get('withClose').resolve(async function () {
 return function withClose({ attachSpark, detachSpark }) {
  return function (config) {
   function close() {
    detachSpark(spark)
   }
   const spark = attachSpark({
    ...config,
    menu: [
     {
      label: 'Close',
      action: close,
     },
     ...(config.menu ?? []),
    ],
   })
   return { close, spark }
  }
 }
})
