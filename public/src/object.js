globalThis.RSRC.get('object').resolve({
 create(_render, click) {
  const obj = {
   x: 0,
   y: 0,
   w: 100,
   h: 100,
   click,
   moveTo(x, y) {
    obj.x = x
    obj.y = y
    return obj
   },
   resize(w, h) {
    obj.w = w
    obj.h = h
   },
   render(_ctx, w, h) {
    _render(
     {
      set fillStyle(to) {
       _ctx.fillStyle = to
      },
      set strokeStyle(to) {
       _ctx.strokeStyle = to
      },
      set font(f) {
       _ctx.font = f
      },
      fillRect(x0, y0, w0, h0) {
       _ctx.fillRect(x0 + obj.x, y0 + obj.y, w0, h0)
      },
      strokeRect(x0, y0, w0, h0) {
       _ctx.strokeRect(x0 + obj.x, y0 + obj.y, w0, h0)
      },
      measureText: _ctx.measureText.bind(_ctx),
      fillText(t, x0, y0, maxWidth) {
       _ctx.fillText(t, x0 + obj.x, y0 + obj.y, maxWidth)
      },
      setLineDash(d) {
       _ctx.setLineDash(d)
      },
     },
     obj.w,
     obj.h
    )
   },
  }
  return obj
 },
})
