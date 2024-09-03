globalThis.LOAD['main'].resolve(async function ({ load }) {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 function component() {}
 function theme() {}
 const components = {
  doc: await load('components/doc'),
  grid: await load('components/grid'),
  menu: await load('components/menu'),
  pane: await load('components/pane'),
  split: await load('components/split'),
  text: await load('components/text'),
 }
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

 function startMenu(getMenus, base, o, menuIndex) {
  const a = components.menu({
   ...base,
   getMenu() {
    return getMenus()[menuIndex]
   },
  })
  return components.pane({
   a: a.element,
   options: { ...(o ? o : {}), number: true },
  })
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
   const content = contentClass.createElement('main', { tabindex: '0' })
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
     console.log(`Civil Compute ${CIVIL_VERSION}`)
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
    startMenu(() => menus, g, undefined, 0),
    startMenu(() => menus, g, undefined, 1),
    startMenu(() => menus, g, undefined, 2),
    startMenu(() => menus, g, undefined, 3),
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
