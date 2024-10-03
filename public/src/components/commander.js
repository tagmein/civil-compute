globalThis.LOAD['components/commander'].resolve(async function ({ load }) {
 return ({  } = {}) => {
  const element = document.createElement('input')
  element.classList.add('--components-commander')
  element.setAttribute('placeholder', 'Search')
  return { element }
 }
})
