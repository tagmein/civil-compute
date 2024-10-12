globalThis.LOAD['components/commander'].resolve(async function ({ load }) {
 return ({ connection: { name: connectionName = 'None', value: connectionValue } } = { connection: 'None', value: undefined }) => {
  const element = document.createElement('input')
  element.classList.add('--components-commander')
  const count = typeof connectionValue === 'undefined'
   ? NaN
   : Object.keys(connectionValue).length
  const connection = typeof connectionValue === 'undefined'
   ? 'No connection'
   : `Connected to ${connectionName} with ${count} item${count === 1 ? '' : 's'}`
  element.setAttribute('placeholder', `Search ${connectionName} (${connection})`)
  return { element }
 }
})
