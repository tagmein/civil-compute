globalThis.LOAD['components/split'].resolve(async function ({ load }) {
 return ({ a, b, classNames = {}, options = {}, key }) => {
  const element = document.createElement('div')
  if (classNames?.container) {
   element.classList.add(...classNames.container.split(/\s+/g))
  } else {
   element.classList.add('--components-split--container')
  }
  if (options?.direction === 'row') {
   element.classList.add('--row')
  }
  if (options?.noScroll) {
   element.classList.add('--no-scroll')
  }
  a.classList.add('--a')
  b.classList.add('--b')
  element.appendChild(a)
  element.appendChild(b)
  const control = document.createElement('section')
  control.classList.add('--control')

  const splitStates = ['--split-all', '--split-a', '--split-b']
  let currentStateIndex = 0

  control.addEventListener('click', () => {
   element.classList.remove(...splitStates)
   currentStateIndex = (currentStateIndex + 1) % splitStates.length
   element.classList.add(splitStates[currentStateIndex])
   if (key) {
    localStorage.setItem(`split-${key}`, currentStateIndex.toString(10))
   }
  })

  if (key) {
   const storedState = localStorage.getItem(`split-${key}`)
   if (storedState) {
    element.classList.add(splitStates[parseInt(storedState, 10)])
   }
  }

  element.appendChild(control)
  return { element }
 }
})
