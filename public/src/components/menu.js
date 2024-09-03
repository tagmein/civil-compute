globalThis.LOAD['components/menu'].resolve(async function ({ load }) {
 let menuCount = 0
 return ({ a, b, classNames, components, items, options, getMenu }) => {
  const element = document.createElement('section')
  element.dataset.name = 'menu'
  if (classNames?.container) {
   element.classList.add(...classNames.container.split(/\s+/g))
  } else {
   element.classList.add('--components-menu--container')
  }
  if (options?.number) {
   console.log(menuCount, 'number')
   element.classList.add('--components-menu--' + ++menuCount)
  }
  if (a) {
   element.appendChild(a)
  }
  if (b) {
   element.appendChild(b)
  }
  for (const [name, action] of items ?? []) {
   const itemContainer = document.createElement('div')
   element.appendChild(itemContainer)
   itemContainer.setAttribute('tabindex', 0)
   itemContainer.addEventListener('click', async function () {
    console.log(`menu item action ${JSON.stringify(name)}...`)
    try {
     await action(getMenu())
     console.log(
      `menu item action success :: ${JSON.stringify(name)} is now complete`
     )
    } catch (e) {
     console.error(
      `menu item action failure :: ${JSON.stringify(name)} failed because ${
       e.message ?? String(e)
      }`
     )
    }
   })
   itemContainer.appendChild(components.text(name).element)
  }
  return { element }
 }
})
