globalThis.LOAD['main'].resolve(async function ({ load }) {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 const components = {
  doc: await load('components/doc'),
  grid: await load('components/grid'),
  menu: await load('components/menu'),
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
 overflow-x: hidden;
 overflow-y: scroll;
}
.--components-split--container.--row {
 flex-direction: row;
 overflow-y: hidden;
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
 flex-grow: 1;
 outline-offset: -15px;
 outline: 3px solid #f0f0f080;
 overflow-x: hidden;
 overflow-y: scroll;
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
 transform-origin: left middle;
 transform: scale(1.05);
 transition: transform 0.75s, filter 0.25s;
}
.--components-menu--container > div:active {
 transform: scale(0.95);
 filter: blur(20px);
}
.--components-pane--container {
 height: 100%;
 display: flex;
 flex-direction: column;
}
.--components-doc-highlight {
 box-shadow: 0 0 40px inset #ffff8080;
}
*::selection {
 background: white;
 color: black;
}
.--components-doc--container {
 margin: 10px 0;
 padding: 0 20px;
}
.--components-doc--container > div {
 background-color: #80402080;
 border: 1px solid #80808080;
 color: #fff;
 padding: 10px 10px;
}
.components-doc--container:last-of-type {
 margin-bottom: 20px;
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

   function startMenu(o, menuIndex) {
    const a = components.menu({
     ...g,
     getMenu() {
      return menus[menuIndex]
     },
    })
    return components.pane({
     a: a.element,
     options: { ...(o ? o : {}), number: true },
    })
   }

   const CIVIL_VERSION = '0.0.1'

   const LICENSE = [
    `== Civil Compute is hereby placed in to the ==`,
    `== PUBLIC DOMAIN ==`,
    `== Copying is permitted ==`,
    `== with or without retaining ==`,
    `== this notice. Use at your own risk, ==`,
    `== as no warranties of fitnenss for ==`,
    `== any particular purpose are expressed ==`,
    `== or implied under this public offering. ==`,
   ]

   const aboutCivil = [
    'About Civil Compute',
    function (menu) {
     console.log(`Civil Compute ${CIVIL_VERSION}`)
     const about = components.doc({
      components,
      items: [
       [
        components.text(`Civil Compute ${CIVIL_VERSION}`).element,
        undefined,
        'About Civil Compute',
       ],
      ],
      name: 'About Civil Compute',
     })
     menu.element.appendChild(about.element)
    },
   ]

   const printLicense = [
    'Print License',
    function () {
     for (const l of LICENSE) {
      console.log(l)
     }
    },
   ]

   const viewLicense = [
    'View License',
    function (menu) {
     const license = components.doc({
      components,
      items: LICENSE.map((l, i) => [
       components.text(l.replace(/(^==\s*|\s*==$)/g, '')).element,
       undefined,
       `Item ${i}`,
      ]),
      name: 'Civil Compute License',
     })
     menu.element.appendChild(license.element)
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
    items: [aboutCivil, printLicense, viewLicense, visitRepository],
    components,
   }
   const menus = [
    startMenu(g, 0),
    startMenu(g, 1),
    startMenu(g, 2),
    startMenu(g, 3),
   ]

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
