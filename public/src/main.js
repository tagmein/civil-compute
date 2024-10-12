globalThis.LOAD['main'].resolve(async function ({ load }) {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 globalThis.numberedPane = function numberedPane(a, o) {
  return components.pane({ a, options: { ...(o ? o : {}), number: true } })
 }
 const components = {
  commander: await load('components/commander'),
  doc: await load('components/doc'),
  explorer: await load('components/explorer'),
  grid: await load('components/grid'),
  menu: await load('components/menu'),
  pane: await load('components/pane'),
  split: await load('components/split'),
  text: await load('components/text'),
  view: await load('components/view'),
 }
 function autoText(t) {
  const inner = components.text(t, { auto: true })
  const outer = components.grid({ a: inner.element })
  const stopAutoSize = inner.autoSize(outer)
  // @todo handle autoText unmount and stopAutoSize()
  return outer
 }
 
 function v(a) {
  return components.view({ a: a.element })
 }

 function startMenu(base, o) {
  const a = components.menu({
   ...base,
   getMenu() {
    return m
   },
  })
  const m = v(components.pane({
   a: a.element,
   options: { ...(o ? o : {}), number: true },
  }))
  return m
 }
 const themes = {
  standard: await load('themes/standard'),
 }
 const mainStyle = document.createElement('style')
 document.head.appendChild(mainStyle)
 mainStyle.textContent = themes.standard
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
   const content = contentClass.createElement('main', {
    tabindex: '0',
    style: `
     overflow-x: auto;
     overflow-y: hidden;
    `
   })
   parentElement.appendChild(content)
   const root = {
    ...library,
    components,
    civilEngine: civil,
    content,
    document,
    store,
    themes,
    main: {
     autoText,
     mainStyle,
     numberedPane,
     startMenu,
    },
   }
   console.log({ root })
   const engine = civil.start(root)
   root.civil = engine

   const CIVIL_VERSION = '0.0.1'

   const LICENSE = [
    `== Civil Compute is hereby placed in to the ==`,
    `== PUBLIC DOMAIN. ==`,
    `== Copying is permitted ==`,
    `== with or without retaining ==`,
    `== this notice. Use at your own risk, ==`,
    `== as no warranties of fitness for ==`,
    `== any particular purpose are expressed ==`,
    `== or implied under this public offering. ==`,
   ]

   const aboutCivil = [
    'About Civil Compute',
    function (menu) {
     const about = components.doc({
      components,
      items: [
       [
        components.text(`Civil Compute ${CIVIL_VERSION}`).element,
        undefined,
        'Name & Version',
       ],
       [
        components.text(
         `A platform for building software applications collaboratively.`
        ).element,
        undefined,
        'Description',
       ],
      ],
      name: 'About Civil Compute',
     })
     menu.element.appendChild(v(about).element)
     setTimeout(() => content.scrollLeft = content.scrollWidth, 120)
    },
   ]
   
   const connectLocalStorage = [
    'Local Storage',
    function (menu) { 
     const explorerInstance = components.explorer({
       connection: { name: 'Local Storage', value: localStorage },
       components,
       getMenu() {
        return g
       },
     })
     const commanderElement = components.commander({
       connection: { name: 'Local Storage', value: localStorage },
       components,
       getMenu() {
        return g
       },
      }).element
     const a = components.menu({
      components,
      options: {
       commander: false,
      },
      items: [
       [ explorerInstance.element ],
       [ commanderElement ]
     ],
     getMenu() {
      return a
     },
    })
    menu.element.parentElement.appendChild(v(a).element)
    setTimeout(() => content.scrollLeft = content.scrollWidth, 120)
   }
  ]
   
   const connectMenu = {
    items: [connectLocalStorage]
   }
   
   const connectTo = [
    'Connect to...',
    function (menu) {
     const a = components.menu({
      ...connectMenu,
      components,
      getMenu() {
       return a
      },
     })
     menu.element.appendChild(v(a).element)
     setTimeout(() => content.scrollLeft = content.scrollWidth, 120)
    }
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
     menu.element.appendChild(v(license).element)
     setTimeout(() => content.scrollLeft = content.scrollWidth, 120)
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
    items: [aboutCivil, connectTo, printLicense, viewLicense, visitRepository],
    components,
   }

   const _A = numberedPane(autoText('Hello').element),
    _B = numberedPane(autoText('World').element),
    _D = numberedPane(autoText('World').element),
    _C = numberedPane(autoText('Hello').element)

   function openStartMenuNow() {
    const a = startMenu(g, undefined, 0)
    content.appendChild(a.element)
    a.element.scrollIntoView()
   }
   const launchCivilMenu = document.createElement('div')
   launchCivilMenu.textContent = 'Civil'
   launchCivilMenu.addEventListener('click', openStartMenuNow)
   window.viewTray.appendChild(launchCivilMenu)
   openStartMenuNow()

   /**
   content.appendChild(
    components.split({
     key: 'main',
     options: {
      direction: 'row',
     },
     a: components.split({
      key: 'main-a',
      a: A.element,
      b: B.element,
      options: { noScroll: true },
     }).element,
     b: components.split({
      key: 'main-b',
      a: C.element,
      b: D.element,
      options: { noScroll: true },
     }).element,
    }).element
   ) */
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
