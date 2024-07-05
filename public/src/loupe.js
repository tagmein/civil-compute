globalThis.RSRC.get('loupe').resolve(async function () {
 const s = await load('spark')
 const crystal = await load('crystal')
 const _withClose = await load('withClose')
 return function ({ attachSpark, detachSpark, doc, base }) {
  const withClose = _withClose({ attachSpark, detachSpark })
  withClose({
   content(container) {
    const look = crystal(base)
    s.set(
     container,
     `${doc} ${base} ${Object.keys(look).join(', ')}`,
     'textContent'
    )
   },
  })
 }
})
