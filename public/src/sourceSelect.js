globalThis.RSRC.get('sourceSelect').resolve(async function () {
 const s = await load('spark')
 const loupe = await load('loupe')
 const manager = await load('manager')
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
        function button(label, callback) {
         const b = s.call(doc, 'createElement', 'button')
         s.set(b, label, 'textContent')
         function launchSource() {
          callback({
           attachSpark,
           detachSpark,
           doc,
           base: localStorage,
           launchSource,
          })
         }
         s.call(b, 'addEventListener', 'click', launchSource)
         return b
        }

        const local = button('Local', loupe({ sourceName: 'Local' }))
        const manage = button('Manage', manager({ sourceName: 'Manage' }))

        s.call(container, 'appendChild', local)
        s.call(container, 'appendChild', manage)
       },
      })
     },
    },
   ],
  })
 }
})
