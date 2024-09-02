globalThis.LOAD['components/grid'].resolve(async function ({ load }) {
 return ({ a, options }) => { 
  const element = document.createElement('div')
  element.classList.add('--components-grid--container')
  element.appendChild(a)
  return { element }
 }
})

