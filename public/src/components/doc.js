globalThis.LOAD['components/doc'].resolve(async function ({ load }) {
 let docCount = 0
 const highlight = await load('highlight')
 return ({ a, b, classNames, components, items, name, options, onClose }) => {
  const element = document.createElement('section')
  element.dataset.name = 'doc'
  if (classNames?.container) {
   element.classList.add(...classNames.container.split(/\s+/g))
  } else {
   element.classList.add('--components-doc--container')
  }
  if (options?.number) {
   console.log(docCount, 'number')
   element.classList.add('--components-doc--' + ++docCount)
  }
  const label = document.createElement('label')
  label.textContent = name
  element.appendChild(label)
  if (a) {
   element.appendChild(a)
  }
  if (b) {
   element.appendChild(b)
  }
  function closeDoc() {
   element.remove()
   onClose?.()
  }
  const docMenu = ([itemElement, action, itemName = 'Untitled'], onClose) => {
   function closeMenu() {
    element.removeChild(newMenu.element)
    onClose?.()
   }
   const newMenu = components.menu({
    components,
    getMenu() {
     return newMenu
    },
    items: [
     [itemElement.textContent, undefined, { enabled: false }],
     [
      JSON.stringify(name) + ' → ' + JSON.stringify(itemName),
      function () {
       highlight({ element: itemElement, options: { scrollIntoView: true } })
      },
     ],
     ['Close Menu', closeMenu],
     ['Close Document', closeDoc],
     [
      'Do Action',
      function () {
       action(newMenu)
      },
      {
       enabled: typeof action === 'function',
      },
     ],
    ],
   })
   return newMenu
  }
  function openMenu(itemElement, action, name, onClose) {
   const newMenu = docMenu(
    [itemElement, action, name ?? 'Untitled Document'],
    onClose
   )
   element.appendChild(newMenu.element)
   highlight({ element: newMenu.element, options: { scrollIntoView: true } })
   return newMenu
  }
  const menus = {}
  for (const itemIndex in items ?? []) {
   const [itemElement, action, name = undefined] = items[itemIndex]
   const itemWrapper = document.createElement('div')
   itemWrapper.appendChild(itemElement)
   itemWrapper.classList.add('--components-doc--item-value')
   const itemContainer = document.createElement('div')
   const indexContainer = document.createElement('div')
   indexContainer.classList.add('--index')
   indexContainer.textContent = itemIndex.toString(10)
   element.appendChild(itemContainer)
   itemContainer.appendChild(indexContainer)
   const itemOuterWrapper = document.createElement('div')
   itemOuterWrapper.appendChild(itemWrapper)
   if (name !== undefined) {
    itemOuterWrapper.appendChild(document.createElement('label'))
    itemOuterWrapper.lastElementChild.classList.add(
     '--components-doc--item-name'
    )
    itemOuterWrapper.lastElementChild.textContent = name
   }
   itemContainer.appendChild(itemOuterWrapper)
   itemContainer.setAttribute('tabindex', 0)
   indexContainer.addEventListener('click', async function () {
    if (action) {
     console.log(`doc action ${JSON.stringify(name)}...`)
     try {
      await action(thisDoc)
      console.log(
       `doc action success :: ${JSON.stringify(name)} is now complete`
      )
     } catch (e) {
      console.error(
       `doc action failure :: ${JSON.stringify(name)} failed because ${
        e.message ?? String(e)
       }`
      )
     }
    } else {
     const menu = menus[itemIndex]
     if (menu) {
      highlight({ element: menu.element, options: { scrollIntoView: true } })
     } else {
      menus[itemIndex] = openMenu(itemElement, action, name, () => {
       delete menus[itemIndex]
      })
     }
    }
   })
  }
  const thisDoc = { element, onClose }
  return thisDoc
 }
})
