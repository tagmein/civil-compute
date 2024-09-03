globalThis.LOAD['components/doc'].resolve(async function ({ load }) {
 let docCount = 0
 return ({ a, b, classNames, components, items, name, options }) => {
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
  }
  const docMenu = ([itemElement, action, itemName = 'Untitled']) => {
   function closeMenu() {
    element.removeChild(newMenu.element)
   }
   const newMenu = components.menu({
    components,
    getMenu() {
     return newMenu
    },
    items: [
     [itemElement.textContent, undefined, { enabled: false }],
     [
      JSON.stringify(name) + ' ⏵ ' + JSON.stringify(itemName),
      function () {
       itemElement.scrollIntoView({ behavior: 'smooth' })
       itemElement.classList.add('--components-doc-highlight')
       setTimeout(function () {
        itemElement.classList.remove('--components-doc-highlight')
       }, 250)
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
  function openMenu(itemElement, action, name) {
   const newMenu = docMenu([
    itemElement,
    action,
    name ?? 'Untitled Document',
   ]).element
   element.appendChild(newMenu)
   newMenu.scrollIntoView({ behavior: 'smooth' })
  }
  for (const itemIndex in items ?? []) {
   const [itemElement, action, name = 'Untitled'] = items[itemIndex]
   const itemContainer = document.createElement('div')
   const indexContainer = document.createElement('div')
   indexContainer.classList.add('--index')
   indexContainer.textContent = itemIndex.toString(10)
   element.appendChild(itemContainer)
   itemContainer.appendChild(indexContainer)
   itemContainer.appendChild(itemElement)
   itemContainer.setAttribute('tabindex', 0)
   itemContainer.addEventListener('click', async function () {
    console.log(`doc action ${JSON.stringify(name)}...`)
    try {
     await (action ?? openMenu(itemElement, action, name))(thisDoc)
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
   })
  }
  const thisDoc = { element }
  return thisDoc
 }
})
