globalThis.RSRC.get('withClose').resolve(async function () {
 return function withClose({ attachSpark, detachSpark }) {
  return function (config) {
   const spark = attachSpark({
    ...config,
    menu: [
     {
      label: 'Close',
      action() {
       detachSpark(spark)
      },
     },
     ...(config.menu ?? []),
    ],
   })
   return spark
  }
 }
})
