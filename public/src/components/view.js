globalThis.LOAD['components/view'].resolve(async function ({ load }) {
 const tray = document.createElement('main')
 tray.classList.add('--components-view--tray')
 window.viewTray = document.body.appendChild(tray)
 return ({ a, close, options = {} }) => {
  const element = document.createElement('section')
  const control = document.createElement('div')
  element.classList.add('--components-view')
  control.classList.add('--components-view--control')
  function button(label, action) {
   const buttonElement = document.createElement('button')
   buttonElement.classList.add(`--components-view--control--${label}`)
   buttonElement.addEventListener('click', action)
   control.appendChild(buttonElement)
  }
  button('Close', function () {
   element.remove()
   close?.()
  })
  button('Minimize', function () {
  
  })
  button('Zoom', function () {
  
  })
  element.appendChild(control)
  element.appendChild(a)
  if (options.scrollIntoView) {
   element.scrollIntoView({ behavior: 'smooth' })
  }
  return { element }
 }
})
