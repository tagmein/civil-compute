globalThis.LOAD['main'].resolve(async function ({ load }) {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 const components = {
  grid: await load('components/grid'),
  pane: await load('components/pane'),
  split: await load('components/split'),
  text: await load('components/text')
 }
 console.log({ civil, library, store })
 const mainStyle = document.createElement('style')
 document.head.appendChild(mainStyle)
 mainStyle.textContent = `
.--components-split--container {
 display: flex;
 flex-direction: column;
 height: 100%;
 width: 100%;
}
.--components-split--container.--row {
 flex-direction: row;
}
.--components-split--container > div {
 flex-basis: 100px;
 flex-grow: 1;
 flex-shrink: 1;
}
.--components-pane--container {
 box-shadow: inset 0 0 4px 8px #80808080;
}
.--components-pane--2 {
 background-color: #800000;
}
.--components-pane--3 {
 background-color: #808000;
}
.--components-pane--4 {
 background-color: #008000;
}
.--components-grid--container {
 align-items: center;
 box-sizing: border-box;
 display: grid;
 height: 100%;
 justify-content: center;
 padding: 24px;
}
*::selection {
 background: white;
 color: black;
}
`
 return {
  run(parentElement) {
   const contentClass = library.className(
    'content',
    `& {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }`
   )
   const content = contentClass.createElement('main', { tabindex: '0' })
   parentElement.appendChild(content)
   const root = {
    ...library,
    content,
    document,
    store,
   }
   const engine = civil.start(root)
   root.civil = engine

   function autoText(t) {
    const inner = components.text(t, { auto: true })
    const outer = components.grid({ a: inner.element })
    const stopAutoSize = inner.autoSize(outer)
    // @todo handle autoText unmount and stopAutoSize()
    return outer
   }
   
   function numberedPane(a, o) {
    return components.pane({ a, options: { ...(o ? o : {}), number: true } })
   }

   const A = numberedPane( autoText('Hello').element ),
         B = numberedPane( autoText('World').element ),
         D = numberedPane( autoText('World').element ),
         C = numberedPane( autoText('Hello').element )
   
   content.appendChild(
    components.split({
     options: {
      direction: 'row'
     },
     a: components.split({
      a: A.element,
      b: B.element
     }).element,
     b: components.split({
      a: C.element,
      b: D.element
     }).element
    }).element
   )
   /**
 * / try {
      const text = contentInput.value
      const result = root.civil.submit(text)
      root._ = result
      contentInput.value = ''
      printValue(text, result)
     } catch (e) {
      const message = document.createElement('div')
      message.classList.add('error-message')
      message.textContent = e.message
      console.error(e)
      contentInput.insertAdjacentElement('afterend', message)
      setTimeout(function () {
       message.classList.add('hide')
       setTimeout(function () {
        message.remove()
       }, 1000)
      }, 2500)
     }
 /**/
  },
 }
})
