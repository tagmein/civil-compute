globalThis.LOAD['components/menu'].resolve(async function ({ load }) {
 const components = {
  commander: await load('commander')
 }
 console.log({ components })
 let menuCount = 0
 return ({ a, b, classNames, components: rootComponents, items, options, getMenu }) => {
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
  const commander = options?.commander === false
   ? undefined
   : components.commander()
  for (const [name, action, itemOptions = {}] of items ?? []) {
   if (typeof name === 'string') {}
   else if (typeof name !== 'undefined') {
    if (name instanceof HTMLElement) {
     element.appendChild(name)
     continue
    }
   }
   const itemContainer = document.createElement('div')
   itemContainer.classList.add('--menu-item-container')
   element.appendChild(itemContainer)
   if (itemOptions.enabled === false || typeof action !== 'function') {
    itemContainer.classList.add('--disabled')
   }
   itemContainer.setAttribute('tabindex', 0)
   itemContainer.addEventListener('click', async function () {
    if (itemOptions.enabled === false || typeof action !== 'function') {
     return
    }
    console.log(`menu item action ${JSON.stringify(name)}...`)
    await action(getMenu())
    console.log(
     `menu item action success :: ${JSON.stringify(name)} is now complete`
    )
   })
   itemContainer.appendChild(rootComponents.text(name).element)
  }
  if (commander) {
   element.appendChild(commander.element)
   element.addEventListener('click', () => commander.element.focus())
  }
  return { element }
 }
})
