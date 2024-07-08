globalThis.RSRC.get('keyValue').resolve(async function () {
 const s = await load('spark')
 const _withClose = await load('withClose')
 return function ({ attachSpark, detachSpark, doc }) {
  const withClose = _withClose({ attachSpark, detachSpark })

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

  withClose({
   menu: [
    {
     label: 'Confirm',
     async action() {
      console.log("Confirmed");
     },
    },
   ],
   content(container) {
    // inputs container
    const inputsContainer = s.call(doc, 'createElement', 'div')
    s.set(inputsContainer, 'inputs-container', 'className')
    s.call(container, 'appendChild', inputsContainer)

    // inputs
    const keyInput = s.call(doc, 'createElement', 'input')
    const valueTxtArea = s.call(doc, 'createElement', 'textarea')
    s.set(keyInput, 'key-input', 'className')
    s.set(valueTxtArea, 'value-txt-area', 'className')
    s.set(keyInput, 'Enter Key...', 'placeholder')
    s.set(valueTxtArea, 'Enter Value...', 'placeholder')
    s.set(keyInput, '1024', 'maxLength')
    s.set(valueTxtArea, '65536', 'maxLength')
    s.call(inputsContainer, 'appendChild', keyInput)
    s.call(inputsContainer, 'appendChild', valueTxtArea)
   },
  })
 }
})
