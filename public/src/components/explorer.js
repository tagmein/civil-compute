globalThis.LOAD['components/explorer'].resolve(async function ({ load }) {
 return async (
  { connection: { name: connectionName, value: connectionValue } } = {
   connection: { name: 'None', value: undefined },
  }
 ) => {
  // we want to handle multiple types of connectionValue
  // 1. localStorage
  // 2. httpKV
  // 3. other
  const unifiedConnectionValue = {
   async setItem(key, value) {
    try {
     if ('set' in connectionValue) {
      return await connectionValue.set(key, value)
     }
     return await connectionValue.setItem(key, value)
    } catch (error) {
     console.error('Failed to set item:', error)
     return false
    }
   },
   async getItem(key) {
    try {
     if ('get' in connectionValue) {
      return await connectionValue.get(key)
     }
     return await connectionValue.getItem(key)
    } catch (error) {
     console.warn('Failed to get item:', error)
     throw error
    }
   },
   async removeItem(key) {
    try {
     if ('remove' in connectionValue) {
      return await connectionValue.remove(key)
     }
     if ('delete' in connectionValue) {
      return await connectionValue.delete(key)
     }
     return await connectionValue.removeItem(key)
    } catch (error) {
     console.error('Failed to remove item:', error)
     return false
    }
   },
   async keys() {
    try {
     if ('keys' in connectionValue) {
      return await connectionValue.keys()
     }
     return Object.keys(connectionValue)
    } catch (error) {
     console.error('Failed to get keys:', error)
     return []
    }
   },
   async clear() {
    try {
     if ('clear' in connectionValue) {
      return await connectionValue.clear()
     }
     return await Promise.all(
      Object.keys(connectionValue).map((key) => connectionValue.removeItem(key))
     ).length
    } catch (error) {
     console.error('Failed to clear:', error)
     return false
    }
   },
   async length() {
    try {
     if ('length' in connectionValue) {
      return await connectionValue.length()
     }
     return Object.keys(connectionValue).length
    } catch (error) {
     console.error('Failed to get length:', error)
     return 0
    }
   },
  }
  const element = document.createElement('section')
  element.classList.add('--components-commander')
  element.setAttribute('placeholder', 'Search')
  console.log({ connectionName, connectionValue })
  const count = (await unifiedConnectionValue.keys()).length
  const label = document.createElement('label')
  Object.assign(label.style, { padding: '15px' })
  label.textContent = `Connected to ${connectionName} with ${count} item${
   count === 1 ? '' : 's'
  }`
  element.appendChild(label)
  async function onCreateNewItem({ key, value }) {
   await unifiedConnectionValue.setItem(key, value)
   console.log(`Updated ${JSON.stringify(key)} to:`, value)
   await explorerInstance.onChangeKey(key, value)
  }
  const explorerInstance = await explorerInterface(
   onCreateNewItem,
   unifiedConnectionValue
  )
  element.appendChild(explorerInstance.element)
  return {
   element: numberedPane(element).element,
   error: explorerInstance.error,
  }
 }
})

async function explorerInterface(onCreateNewItem, connectionValue) {
 try {
  const initialKey =
   (await connectionValue.getItem('[explorer]recentKey')) ??
   (await connectionValue.getItem((await connectionValue.keys())[0] ?? ''))
  async function onChangeKey(key, value) {
   console.log('onChangeKey', key, '=', value)
   itemForm.submitButton.textContent =
    value !== null ? 'Update entry' : 'Create entry'
   itemForm.deleteButton.disabled = value === null
   await filterDisplayList(key, value)
   itemForm.valueInput.style.height =
    localStorage.getItem(`[explorer]height:${key}`) ?? '100px'
   itemForm.valueInput.value = value ?? ''
   await connectionValue.setItem('[explorer]recentKey', key)
  }
  const itemForm = explorerNewItemForm(
   connectionValue,
   onCreateNewItem,
   initialKey,
   onChangeKey
  )
  const containerElement = document.createElement('div')
  containerElement.appendChild(itemForm.element)
  const listElement = document.createElement('div')

  async function filterDisplayList(key, value) {
   listElement.innerHTML = ''
   if (connectionValue) {
    for (const k of await connectionValue.keys()) {
     if (!k.toLowerCase().includes(key.toLowerCase())) {
      continue
     }
     const v = await connectionValue.getItem(k)
     const listItemElement = document.createElement('div')
     listItemElement.addEventListener('click', async function () {
      itemForm.keyInput.value = k
      itemForm.valueInput.value = v
      await itemForm.onChangeKey(k, v)
      console.log('loaded', k, v)
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
  await onChangeKey(initialKey, await connectionValue.getItem(initialKey))
  return { element: containerElement, onChangeKey, error: undefined }
 } catch (e) {
  const notice = document.createElement('div')
  notice.textContent = 'Failed to get item:'
  const pre = document.createElement('pre')
  pre.textContent = e.message ?? e ?? 'Unknown error'
  notice.appendChild(pre)
  return {
   element: notice,
   onChangeKey: async function () {
    throw e
   },
   error: e.message ?? e ?? 'Unknown error',
  }
 }
}

function explorerNewItemForm(
 connectionValue,
 onSubmit,
 initialKey,
 onChangeKey
) {
 const deleteButton = document.createElement('button')
 deleteButton.textContent = 'Delete'
 deleteButton.disabled = true
 deleteButton.addEventListener('click', async function (event) {
  event.preventDefault()
  await connectionValue.removeItem(keyInput.value)
  onChangeKey(keyInput.value, null)
 })
 const submitButton = document.createElement('button')
 const formElement = document.createElement('form')
 formElement.classList.add('--component-explorer-form')
 formElement.addEventListener('submit', async function (e) {
  e.preventDefault()
  submitButton.setAttribute('disabled', 'disabled')
  deleteButton.disabled = true
  const formData = {
   key: keyInput.value,
   value: valueInput.value,
  }
  try {
   await onSubmit(formData)
  } catch (error) {
   console.error('Failed to update entry:', formData)
   console.error(error)
  } finally {
   submitButton.removeAttribute('disabled')
   delete deleteButton.disabled
  }
 })
 const keyInput = document.createElement('input')
 keyInput.setAttribute('name', 'key')
 keyInput.setAttribute('placeholder', 'Key')
 keyInput.setAttribute('type', 'search')
 keyInput.value = initialKey
 const events = ['blur', 'change', 'focus', 'input', 'key', 'keyup', 'paste']
 for (const event of events) {
  keyInput.addEventListener(event, async function () {
   const value = await connectionValue.getItem(keyInput.value)
   await onChangeKey(keyInput.value, value)
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
 const buttonContainer = document.createElement('div')
 formElement.appendChild(buttonContainer)
 Object.assign(buttonContainer.style, {
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
 })
 buttonContainer.appendChild(submitButton)
 buttonContainer.appendChild(deleteButton)
 return {
  buttonContainer,
  deleteButton,
  element: formElement,
  keyInput,
  onChangeKey,
  submitButton,
  valueInput,
 }
}
