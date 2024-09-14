globalThis.LOAD['components/highlight'].resolve(async function ({ load }) {
 return ({ element, options = {} }) => {
  element.classList.add('--components-highlight')
  setTimeout(function () {
   element.classList.remove('--components-highlight')
  }, 250)
  if (options.scrollIntoView) {
   element.scrollIntoView({ behavior: 'smooth' })
  }
 }
})
