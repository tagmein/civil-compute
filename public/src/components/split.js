globalThis.LOAD['components/split'].resolve(async function ({ load }) {
 return ({ a, b, classNames = {}, options = {} }) => {
  const element = document.createElement('div')
  if (classNames?.container) {
   element.classList.add(...classNames.container.split(/\s+/g))
  } else {
   element.classList.add('--components-split--container')
  }
  if (options?.direction === 'row') {
   element.classList.add('--row')
  }
  element.appendChild(a)
  element.appendChild(b)
  return { element }
 }
})

