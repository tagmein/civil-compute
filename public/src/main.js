globalThis.RSRC.get('main').resolve(async function () {
 const app = await load('app')
 const display = await load('display')
 return {
  run() {
   const state = {}
   const mainApp = app.create(state, () => mainDisplay.render())
   const mainDisplay = display.create(document.body, (ctx, w, h) => {
    ctx.fillStyle = '#282828'
    ctx.fillRect(0, 0, w, h)
    return mainApp.run(w, h, state)
   })
  },
 }
})
