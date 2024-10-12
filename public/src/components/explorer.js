globalThis.LOAD['components/explorer'].resolve(async function ({ load }) {
 return ({ connection: { name: connectionName, value: connectionValue } } = { connection: { name: 'None', value: undefined } }) => {
  const element = document.createElement('section')
  element.classList.add('--components-commander')
  element.setAttribute('placeholder', 'Search')
  const count = typeof connectionValue === 'undefined'
   ? NaN
   : Object.keys(connectionValue).length
  const label = document.createElement('label')
  Object.assign(label.style, { padding: '15px' })
  label.textContent = typeof connectionValue === 'undefined'
   ? 'No connection'
   : `Connected to ${connectionName} with ${count} item${count === 1 ? '' : 's'}`
  element.appendChild(label)
  function onCreateNewItem({ key, value }) {
   connectionValue.setItem(key, value)
   console.log(`Updated ${JSON.stringify(key)} to:`, value)
  }
  element.appendChild(
   explorerInterface(onCreateNewItem, connectionValue).element
  )
  return { element: numberedPane(element).element }
 }
})

function explorerInterface(onCreateNewItem, connectionValue) {
 const itemForm = explorerNewItemForm(onCreateNewItem)
 const containerElement = document.createElement('div')
 containerElement.appendChild(itemForm.element)
 const listElement = document.createElement('div')
  if (connectionValue) {
  for (const [ k, v ] of Object.entries(connectionValue)) {
   const listItemElement = document.createElement('div')
   listItemElement.addEventListener('click', function () {
    itemForm.keyInput.value = k
    itemForm.valueInput.value = v
   })
   Object.assign(listItemElement.style, {
    cursor: 'pointer',
    padding: '15px'
   })
   const keyLabel = document.createElement('label')
   keyLabel.textContent = k
   const valueSlice = String(v).slice(0, 100)
   const valueElement = document.createElement('div')
   Object.assign(valueElement.style, {
    borderLeft: '15px solid #40404040',
    paddingLeft: '5px',
   })
   valueElement.textContent = valueSlice
   listItemElement.appendChild(keyLabel)
   listItemElement.appendChild(valueElement)
   listElement.appendChild(listItemElement)
  }
  containerElement.appendChild(listElement)
 }
 return { element: containerElement }
}

function explorerNewItemForm(onSubmit) {
 const submitButton = document.createElement('button')
 submitButton.textContent = 'Update entry'
 const formElement = document.createElement('form')
 formElement.classList.add('--component-explorer-form')
 formElement.addEventListener('submit', function (e) {
  e.preventDefault()
  submitButton.setAttribute('disabled', 'disabled')
  onSubmit({
   key: keyInput.value,
   value: valueInput.value
  })
  submitButton.removeAttribute('disabled')
 })
 Object.assign(formElement.style, {
  display: 'flex',
  flexDirection: 'column',
  padding: '15px'
 })
 const keyInput = document.createElement('input')
 keyInput.setAttribute('placeholder', 'Key')
 const valueInput = document.createElement('textarea')
 valueInput.setAttribute('placeholder', 'Value')
 formElement.appendChild(keyInput)
 formElement.appendChild(valueInput)
 formElement.appendChild(submitButton)
 return { element: formElement, keyInput, valueInput }
}
