globalThis.RSRC.get('keyValue').resolve(async function () {
 const s = await load('spark')
 const _withClose = await load('withClose')

 return function ({ attachSpark, detachSpark, doc }) {
  // Add stylesheet
  const style = s.call(doc, 'createElement', 'style')
  s.set(
   style,
   `
   .inputs-container {
     padding: 1em 1.2em;
     display: grid;
     row-gap: 10px;
   }
   .key-input, .value-txt-area {
     background-color: transparent;
     color: #fffff0;
     padding: 10px;
     border: 1px solid #80808040;
     outline: none;
     border-radius: 4px;
   }
   .key-input::placeholder,
   .value-txt-area::placeholder {
     color: #80808040;
   }
   .value-txt-area {
     height: 150px;
     resize: none;
   }
  `,
   'textContent'
  )
  const head = s.get(doc, 'head')
  s.call(head, 'appendChild', style)

  const withClose = _withClose({ attachSpark, detachSpark })

  return function ({ onConfirm }) {
   // inputs
   const keyInput = s.call(doc, 'createElement', 'input')
   const valueTextArea = s.call(doc, 'createElement', 'textarea')

   return withClose({
    menu: [
     {
      label: 'Confirm',
      async action() {
       onConfirm(keyInput.value, valueTextArea.value)
      },
     },
    ],
    content(container) {
     // inputs container
     const inputsContainer = s.call(doc, 'createElement', 'div')
     s.set(inputsContainer, 'inputs-container', 'className')
     s.call(container, 'appendChild', inputsContainer)
     s.set(keyInput, 'key-input', 'className')
     s.set(valueTextArea, 'value-txt-area', 'className')
     s.set(keyInput, 'Enter Key...', 'placeholder')
     s.set(valueTextArea, 'Enter Value...', 'placeholder')
     s.set(keyInput, '1024', 'maxLength')
     s.set(valueTextArea, '65536', 'maxLength')
     s.call(inputsContainer, 'appendChild', keyInput)
     s.call(inputsContainer, 'appendChild', valueTextArea)
    },
   })
  }
 }
})
