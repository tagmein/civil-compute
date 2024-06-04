globalThis.RSRC.get('styles').resolve({
 lightOutline(ctx, w, h) {
  ctx.strokeStyle = '#fff'
  ctx.fillStyle = '#a0a0a0'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeRect(0, 0, w, h)
 },
 gridCell(ctx, w, h) {
  ctx.setLineDash([2, 2])
  ctx.strokeStyle = '#a0a0a080'
  ctx.fillStyle = '#484848'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeRect(0, 0, w, h)
 },
 highlightedCell(ctx, w, h) {
  ctx.setLineDash([])
  ctx.strokeStyle = '#a0a0a0'
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeRect(0, 0, w, h)
 },
})
