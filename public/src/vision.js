globalThis.RSRC.get('vision').resolve(async function () {
 const store = (await load('store'))(localStorage)
 return {
  menu: {
   content(control, size) {
    const { state } = control
    const position = state.menu
    function eraseCell() {
     const cell = state.home[control.cellAddress(position)]
     if (
      confirm(
       `Erase ${JSON.stringify(cell.label)} at ${JSON.stringify(position)}`
      )
     ) {
      store.delete(`home.x=${position.x}.y=${position.y}.cell`)
      const yArray = store.removeArrayItem(`home.x=${position.x}.y`, position.y)
      if (yArray.length === 0) {
       const xArray = store.removeArrayItem('home.x', position.x)
       if (xArray.length === 0) {
        store.removeArrayItem('home.x', position.x)
       }
      }
      delete state.home[control.cellAddress(position)]
      control.closeMenu()
     }
    }
    function setCell() {
     const label = prompt('Enter label')
     if (typeof label !== 'string') {
      return
     }
     const cell = {
      label,
     }
     store.ensureArrayItem('home.x', position.x)
     store.ensureArrayItem(`home.x=${position.x}.y`, position.y)
     store.setObject(`home.x=${position.x}.y=${position.y}.cell`, cell)
     state.home[control.cellAddress(position)] = cell
     control.closeMenu()
    }
    const menuItems = [
     { label: 'Close', action: control.closeMenu },
     { label: JSON.stringify(control.state.menu) },
     { label: 'Set', action: setCell },
    ]
    if (control.cellAddress(control.state.menu) in state.home) {
     menuItems.push({ label: 'Erase', action: eraseCell })
    }
    return Object.fromEntries(
     menuItems.map((e, i) => [control.cellAddress({ x: 0, y: i }), e])
    )
   },
   click(control, item) {
    if (item?.action) {
     item.action()
    } else {
     console.log('menu item', item)
    }
   },
  },
  grid: {
   content(control, size) {
    const { state } = control
    if (!('home' in state)) {
     state.home = {}
     const xValues = store.getArray('home.x')
     for (const x of xValues) {
      const yValues = store.getArray(`home.x=${x}.y`)
      for (const y of yValues) {
       const cell = store.getObject(`home.x=${x}.y=${y}.cell`)
       state.home[control.cellAddress({ x, y })] = cell
      }
     }
    }
    return state.home
   },
  },
 }
})
