globalThis.RSRC.get('sourceSelect').resolve(async function () {
 const s = await load('spark')
 const loupe = await load('loupe')
 const _withClose = await load('withClose')
 return function ({ attachSpark, detachSpark, doc }) {
  const withClose = _withClose({ attachSpark, detachSpark })
  attachSpark({
   menu: [
    {
     label: 'Source',
     action() {
      withClose({
       content(container) {
        const local = s.call(doc, 'createElement', 'button')
        s.set(local, 'Local', 'textContent')
        s.call(local, 'addEventListener', 'click', function () {
         loupe({ attachSpark, detachSpark, doc, base: localStorage })
        })
        s.call(container, 'appendChild', local)
       },
      })
     },
    },
   ],
  })
 }
})
