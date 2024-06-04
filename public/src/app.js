globalThis.RSRC.get('app').resolve(async function () {
 const grid = await load('grid')
 const styles = await load('styles')
 const vision = await load('vision')
 const GridCellSize = { w: 100, h: 100 }
 const MenuCellSize = { w: 250, h: 50 }
 return {
  create(state, render) {
   const control = {
    cellAddress(position) {
     return `${position.x.toString(36).toUpperCase()}:${position.y
      .toString(36)
      .toUpperCase()}`
    },
    closeMenu() {
     state.menu = null
     render()
    },
    render,
    state,
   }
   const appGrid = grid.create({
    size: GridCellSize,
    style: styles.gridCell,
    click(x, y) {
     if (state.menu) {
      control.closeMenu()
     } else {
      state.menu = { x, y }
      render()
     }
    },
   })
   const menuGrid = grid.create({
    size: MenuCellSize,
    style: styles.gridCell,
    click(x, y, item, x0, y0) {
     vision.menu.click(control, item, x, y, x0, y0)
     render()
    },
   })
   return {
    grid: appGrid,
    run(w, h) {
     appGrid.resize(w, h)
     let gridContent = vision.grid.content(control, appGrid.size)
     if (state.menu) {
      const menuAddress = control.cellAddress(state.menu)
      gridContent = { ...gridContent }
      if (!(menuAddress in gridContent)) {
       gridContent[menuAddress] = {}
      } else {
       gridContent[menuAddress] = { ...gridContent[menuAddress] }
      }
      gridContent[menuAddress].style = styles.highlightedCell
     }
     const layers = [appGrid.objects(control, gridContent)]
     if (state.menu) {
      const cellBox = appGrid.box(state.menu)
      menuGrid.move(w, h, cellBox, 1, 5)
      layers.push(
       control.closeMenu,
       menuGrid.objects(control, vision.menu.content(control, menuGrid.size))
      )
     }
     return layers
    },
   }
  },
 }
})
