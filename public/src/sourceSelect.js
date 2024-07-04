globalThis.RSRC.get('sourceSelect').resolve(async function () {
 const s = await load('spark')
 const _withClose = await load('withClose')
 return function ({ attachSpark, detachSpark }) {
  const withClose = _withClose({ attachSpark, detachSpark })
  attachSpark({
   menu: [
    {
     label: 'Source',
     action() {
      withClose({
       content(container) {
        s.set(container, 'select source', 'textContent')
       },
      })
     },
    },
   ],
  })
 }
})
