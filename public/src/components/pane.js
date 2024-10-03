globalThis.LOAD['components/pane'].resolve(async function ({ load }) {
 let paneCount = 0
 return ({ a, b, classNames, options }) => {
  const element = document.createElement('div')
  if (classNames?.container) {
   element.classList.add(...classNames.container.split(/\s+/g))
  } else {
   element.classList.add('--components-pane--container')
  }
  if (options?.number) {
   element.classList.add('--components-pane--' + ++paneCount)
  }
  element.appendChild(a)
  if (b) {
   element.appendChild(b)
  }
  return { element }
 }
})
