globalThis.LOAD['main'].resolve(async function ({ load }) {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 const components = {
  menu: await load('components/menu'),
  grid: await load('components/grid'),
  pane: await load('components/pane'),
  split: await load('components/split'),
  text: await load('components/text'),
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
.--components-menu--container {
 height: 100%;
 padding: 10px 0;
}
.--components-menu--container > div {
 cursor: pointer;
 flex-grow: 1;
 padding: 10px 20px;
 display: flex;
 align-items: center;
}
.--components-menu--container > div:hover {
 background-color: #a8c4e0;
 color: #8e4c0a;
 transform: scale(1.05);
 transition: transform 0.75s, filter 0.25s;
}
.--components-menu--container > div:active {
 transform: scale(0.95);
 filter: blur(20px);
}
.--components-pane--container {
 height: 100%;
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

   function startMenu(o) {
    const a = components.menu(g)
    return components.pane({
     a: a.element,
     options: { ...(o ? o : {}), number: true },
    })
   }

   const aboutCivil = [
    'About Civil',
    function () {
     console.log(`Civil Compute 0.0.1`)
    },
   ]

   const printLicense = [
    'Print License',
    function () {
     console.log(`== PUBLIC DOMAIN ==`)
     console.log(`== Copying is permitted ==`)
     console.log(`== with or without retaining ==`)
     console.log(`== this notice. Use at your own risk, ==`)
     console.log(`== as no warranties of fitnenss for ==`)
     console.log(`== any particular purpose are expressed ==`)
     console.log(`== or implied under this public offering. ==`)
    },
   ]

   const visitRepository = [
    'Visit tagmein/civil-compute on GitHub',
    function () {
     if (
      confirm('Open https://github.com/tagmein/civil-compute in a new tab?')
     ) {
      open('https://github.com/tagmein/civil-compute', '_blank')
     }
    },
   ]

   const g = {
    items: [aboutCivil, printLicense, visitRepository],
    components,
   }
   const menus = [startMenu(g), startMenu(g), startMenu(g), startMenu(g)]

   const _A = numberedPane(autoText('Hello').element),
    _B = numberedPane(autoText('World').element),
    _D = numberedPane(autoText('World').element),
    _C = numberedPane(autoText('Hello').element)

   const A = numberedPane(menus[0].element),
    B = numberedPane(menus[1].element),
    D = numberedPane(menus[2].element),
    C = numberedPane(menus[3].element)

   content.appendChild(
    components.split({
     options: {
      direction: 'row',
     },
     a: components.split({
      a: A.element,
      b: B.element,
     }).element,
     b: components.split({
      a: C.element,
      b: D.element,
     }).element,
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
