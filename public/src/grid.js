globalThis.RSRC.get('grid').resolve(async () => {
 const object = await load('object')
 return {
  create({ click, size, style }) {
   let cellsX,
    cellsY,
    cellsW,
    cellsH,
    cellSpacingX,
    cellSpacingY,
    centerX,
    centerY,
    totalCells,
    windowH,
    windowW,
    isCentered = true,
    usableX,
    usableY,
    originX = 0,
    originY = 0
   const g = {
    box({ x, y }) {
     return {
      x: centerX + (x + 1) * cellSpacingX + size.w * x,
      y: centerY + (y + 1) * cellSpacingY + size.h * y,
      ...size,
     }
    },
    move(w, h, box, maxItemsX = 1, minItemsY = 1) {
     originX = Math.max(0, Math.min(box.x, w - size.w))
     originY = Math.max(0, Math.min(box.y + box.h, h - size.h * minItemsY))
     windowW = Math.min(w, originX + maxItemsX * size.w)
     windowH = h
     g.resize(windowW, windowH)
     return g
    },
    resize(w, h) {
     windowW = w
     windowH = h
     usableX = windowW - originX
     usableY = windowH - originY
     isCentered = originX === 0 && originY === 0
     cellsX = Math.floor(usableX / size.w)
     cellsY = Math.floor(usableY / size.h)
     cellsW = cellsX * size.w
     cellsH = cellsY * size.h
     cellSpacingX = isCentered
      ? Math.floor((usableX - cellsW) / (cellsX + 1))
      : 0
     cellSpacingY = isCentered
      ? Math.floor((usableY - cellsH) / (cellsY + 1))
      : 0
     centerX = isCentered
      ? Math.round((usableX - cellsW - cellSpacingX * (cellsX + 1)) / 2)
      : 0
     centerY = isCentered
      ? Math.round((usableY - cellsH - cellSpacingY * (cellsY + 1)) / 2)
      : 0
     totalCells = cellsX * cellsY
     return g
    },
    get size() {
     return { w: cellsX, h: cellsY }
    },
    objects(control, cellContent) {
     const cells = []
     for (let i = 0; i < totalCells; i++) {
      const cellX = i % cellsX
      const cellY = (i - cellX) / cellsX
      const address = control.cellAddress({ x: cellX, y: cellY })
      const match = cellContent[address]
      const cell = object.create(
       function (ctx, w, h) {
        const cellStyle = match?.style ?? style
        cellStyle(ctx, w, h)
        ctx.fillStyle = match ? '#ffffff' : '#808080'
        ctx.font = '14px monospace'
        ctx.fillText(address, 10, 14)
        if (typeof match?.label === 'string' && match.label.length > 0) {
         ctx.font = '20px monospace'
         ctx.fillStyle = '#ffffff'
         const textCenter = Math.floor(ctx.measureText(match.label).width / 2)
         ctx.fillText(match.label, 10, size.h / 2 + 12, size.w - 20)
        }
       },
       (x, y) => click(cellX, cellY, match, x, y)
      )
      cell
       .moveTo(
        originX + centerX + (cellX + 1) * cellSpacingX + size.w * cellX,
        originY + centerY + (cellY + 1) * cellSpacingY + size.h * cellY
       )
       .resize(size.w, size.h)
      cells.push(cell)
     }
     return cells
    },
   }
   return g
  },
 }
})
