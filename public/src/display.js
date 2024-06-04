globalThis.RSRC.get('display').resolve({
 create(attachTo, _render) {
  let objects
  let clickOut
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  attachTo.appendChild(canvas)
  let w,
   h,
   alive = true
  function destroy() {
   alive = false
   globalThis.removeEventListener('resize', resize)
   attachTo.removeChild(canvas)
  }
  function render() {
   if (!alive) {
    throw new Error('display is not alive')
   }
   const layers = _render(ctx, w, h)
   let isFirstLayer = true
   clickOut = undefined
   for (objects of layers) {
    if (typeof objects === 'function') {
     clickOut = objects
     continue
    }
    if (objects) {
     if (isFirstLayer) {
      isFirstLayer = false
     } else {
      ctx.fillStyle = '#00000080'
      ctx.fillRect(0, 0, w, h)
     }
     for (const o of objects) {
      o.render(ctx, w, h)
     }
    }
   }
  }
  function resize() {
   w = globalThis.innerWidth
   h = globalThis.innerHeight
   canvas.width = w
   canvas.height = h
   render()
  }
  globalThis.addEventListener('resize', resize)
  resize()
  canvas.addEventListener('click', function (e) {
   const { layerX: x, layerY: y } = e
   if (objects) {
    for (const o of objects) {
     if (!o.click) {
      continue
     }
     if (x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h) {
      o.click(x - o.x, y - o.y)
      return
     }
    }
   }
   if (clickOut) {
    clickOut()
   }
  })
  return {
   render,
  }
 },
})
