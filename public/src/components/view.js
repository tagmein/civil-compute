globalThis.LOAD['components/view'].resolve(async function ({ load }) {
 const tray = document.createElement('main')
 tray.classList.add('--components-view--tray')
 window.viewTray = document.body.appendChild(tray)
 return ({
  a,
  element: incomingElement,
  close: incomingClose,
  onClose,
  options = {},
 }) => {
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
  let isClosing = false
  function close() {
   if (isClosing) {
    return
   }
   isClosing = true // prevent recursive calls
   element.remove()
   onClose?.()
  }
  button(
   'Close',
   incomingClose
    ? function () {
       close()
       incomingClose()
      }
    : close
  )
  button('Minimize', function () {
   if (element.classList.contains('--maximized')) {
    element.classList.remove('--maximized')
   } else if (element.classList.contains('--minimized')) {
    element.classList.remove('--minimized')
   } else {
    element.classList.add('--minimized')
   }
  })
  button('Zoom', function () {
   if (element.classList.contains('--minimized')) {
    element.classList.remove('--minimized')
   } else if (element.classList.contains('--maximized')) {
    element.classList.remove('--maximized')
   } else {
    element.classList.add('--maximized')
   }
  })
  element.appendChild(control)
  element.appendChild(incomingElement ?? a)
  if (options.scrollIntoView) {
   element.scrollIntoView({ behavior: 'smooth' })
  }
  return { element, close }
 }
})
