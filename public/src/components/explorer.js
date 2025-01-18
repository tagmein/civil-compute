globalThis.LOAD['components/explorer'].resolve(async function ({ load }) {
 return (
  { connection: { name: connectionName, value: connectionValue } } = {
   connection: { name: 'None', value: undefined },
  }
 ) => {
  const element = document.createElement('section')
  element.classList.add('--components-commander')
  element.setAttribute('placeholder', 'Search')
  console.log({ connectionName, connectionValue })
  const count =
   typeof connectionValue === 'undefined'
    ? NaN
    : Object.keys(connectionValue).length
  const label = document.createElement('label')
  Object.assign(label.style, { padding: '15px' })
  label.textContent =
   typeof connectionValue === 'undefined'
    ? 'No connection'
    : `Connected to ${connectionName} with ${count} item${
       count === 1 ? '' : 's'
      }`
  element.appendChild(label)
  function onCreateNewItem({ key, value }) {
   connectionValue.setItem(key, value)
   console.log(`Updated ${JSON.stringify(key)} to:`, value)
   explorerInstance.onChangeKey(key, value)
  }
  const explorerInstance = explorerInterface(onCreateNewItem, connectionValue)
  element.appendChild(explorerInstance.element)
  return { element: numberedPane(element).element }
 }
})

function explorerInterface(onCreateNewItem, connectionValue) {
 function onChangeKey(key, value) {
  console.log('onChangeKey', key, '=', value)
  itemForm.submitButton.textContent =
   value !== null ? 'Update entry' : 'Create entry'
  filterDisplayList(key, value)
  itemForm.valueInput.style.height =
   localStorage.getItem(`[explorer]height:${key}`) ?? '100px'
  itemForm.valueInput.value = value ?? ''
 }
 const initialKey = Object.keys(connectionValue)[0] ?? ''
 const itemForm = explorerNewItemForm(
  connectionValue,
  onCreateNewItem,
  initialKey,
  onChangeKey
 )
 const containerElement = document.createElement('div')
 containerElement.appendChild(itemForm.element)
 const listElement = document.createElement('div')

 function filterDisplayList(key, value) {
  listElement.innerHTML = ''
  if (connectionValue) {
   for (const [k, v] of Object.entries(connectionValue)) {
    if (!k.toLowerCase().includes(key.toLowerCase())) {
     continue
    }
    const listItemElement = document.createElement('div')
    listItemElement.addEventListener('click', function () {
     itemForm.keyInput.value = k
     itemForm.valueInput.value = v
     itemForm.onChangeKey(k, v)
    })
    Object.assign(listItemElement.style, {
     cursor: 'pointer',
     padding: '15px',
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
 }
 // Set the initial key
 onChangeKey(initialKey, connectionValue.getItem(initialKey))
 return { element: containerElement, onChangeKey }
}

function explorerNewItemForm(
 connectionValue,
 onSubmit,
 initialKey,
 onChangeKey
) {
 const submitButton = document.createElement('button')
 const formElement = document.createElement('form')
 formElement.classList.add('--component-explorer-form')
 formElement.addEventListener('submit', async function (e) {
  e.preventDefault()
  submitButton.setAttribute('disabled', 'disabled')
  try {
   const formData = {
    key: keyInput.value,
    value: valueInput.value,
   }
   await onSubmit(formData)
  } catch (error) {
   console.error('Failed to update entry:', formData)
   console.error(error)
  }
  submitButton.removeAttribute('disabled')
 })
 const keyInput = document.createElement('input')
 keyInput.setAttribute('name', 'key')
 keyInput.setAttribute('placeholder', 'Key')
 keyInput.setAttribute('type', 'search')
 keyInput.value = initialKey
 const events = ['blur', 'change', 'focus', 'input', 'key', 'keyup', 'paste']
 for (const event of events) {
  keyInput.addEventListener(event, function () {
   const value = connectionValue.getItem(keyInput.value)
   onChangeKey(keyInput.value, value)
  })
 }
 const valueInput = document.createElement('textarea')
 valueInput.setAttribute('placeholder', 'Value')
 valueInput.style.resize = 'vertical'
 valueInput.addEventListener('mouseup', function () {
  console.log('stored new height', valueInput.style.height)
  localStorage.setItem(
   `[explorer]height:${keyInput.value}`,
   valueInput.style.height
  )
 })
 formElement.appendChild(keyInput)
 formElement.appendChild(valueInput)
 formElement.appendChild(submitButton)
 return {
  element: formElement,
  keyInput,
  onChangeKey,
  submitButton,
  valueInput,
 }
}
