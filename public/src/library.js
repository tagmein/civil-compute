globalThis.LOAD['library'].resolve(async function ({ load }) {
 const Lib = {
  add(...values) {
   return values.reduce((sum, x) => sum + x, 0)
  },
  className(name, styles) {
   const fullName = `${name}_${Lib.randomId()}`
   const style = document.createElement('style')
   style.innerText = styles.replace(/\&/g, `.${fullName}`)
   document.head.appendChild(style)
   const Class = {
    apply(elem) {
     elem.classList.add(fullName)
     return elem
    },
    createElement(tagName = 'div', attributes) {
     const elem = document.createElement(tagName)
     if (typeof attributes === 'object') {
      for (const [k, v] of Object.entries(attributes)) {
       elem.setAttribute(k, v)
      }
     }
     return Class.apply(elem)
    },
    destroy() {
     document.head.removeChild(style)
    },
    name: fullName,
   }
   return Class
  },
  randomId() {
   return Math.floor(Math.random() * 1e12)
    .toString(36)
    .slice(0, 8)
  },
  toHtml(text, value) {
   const container = document.createElement('div')
   container.classList.add('result')
   const inputText = document.createElement('div')
   inputText.classList.add('input')
   inputText.textContent = text
   const typeTag = document.createElement('div')
   typeTag.classList.add('tag')
   const valueText = document.createElement('span')
   switch (typeof value) {
    case 'object':
     if (value === null) {
      typeTag.textContent = 'null'
      valueText.textContent = ''
     } else if (Array.isArray(value)) {
      typeTag.textContent = 'array'
      valueText.textContent = `[ ${value.join(', ')} ]`
     } else {
      typeTag.textContent = 'object'
      valueText.textContent = `${
       Object.getPrototypeOf(value).constructor.name
      } { ${Object.keys(value).join(', ')} }`
     }
     break
    default:
     typeTag.textContent = typeof value
     valueText.textContent = value
   }
   container.appendChild(inputText)
   container.appendChild(typeTag)
   container.appendChild(valueText)
   return container
  },
 }
 return Lib
})
