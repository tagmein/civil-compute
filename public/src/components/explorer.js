globalThis.LOAD['components/explorer'].resolve(async function ({ load }) {
 return ({ connection: { name: connectionName, value: connectionValue } } = { connection: 'None', value: undefined }) => {
  const element = document.createElement('section')
  element.classList.add('--components-commander')
  element.setAttribute('placeholder', 'Search')
  const count = typeof connectionValue === 'undefined'
   ? NaN
   : Object.keys(connectionValue).length
  element.textContent = typeof connectionValue === 'undefined'
   ? 'No connection'
   : `Connected to ${connectionName} with ${count} item${count === 1 ? '' : 's'}`
  return { element: numberedPane(element) }
 }
})
