globalThis.LOAD['main'].resolve(async function ({ load }) {
 const httpKV = await load('modules/civil-memory/kv/httpKV.mjs')
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
  return components.view(a)
 }

 function startMenu(base, o) {
  const a = components.menu({
   ...base,
   getMenu() {
    return m
   },
  })
  const m = v(
   components.pane({
    a: a.element,
    options: { ...(o ? o : {}), number: true },
   })
  )
  return m
 }
 const themes = {
  standard: await load('themes/standard'),
 }
 const mainStyle = document.createElement('style')
 document.head.appendChild(mainStyle)
 mainStyle.textContent = themes.standard

 function autoScroll(content) {
  setTimeout(
   () => (content.scrollLeft = content.scrollWidth - window.innerWidth - 64),
   120
  )
 }

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
      onClose() {
       aboutView.close()
      },
     })
     const aboutView = v(about)
     menu.element.appendChild(aboutView.element)
     autoScroll(content)
    },
   ]

   const connectLocalStorage = [
    'Local Storage',
    async function (menu) {
     const explorerInstance = await components.explorer({
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
      items: [[explorerInstance.element], [commanderElement]],
      getMenu() {
       return a
      },
     })
     menu.element.parentElement.appendChild(v(a).element)
     autoScroll(content)
    },
   ]

   const connectKeyValueStorage = [
    'Key Value Store',
    async function (menu) {
     let modeInput = null
     let keyValueBaseUrlInput = null
     async function tryConnectToKeyValueStore() {
      const baseUrl =
       keyValueBaseUrlInput.value +
       (modeInput?.value ? `?mode=${modeInput.value}` : '')
      const kv = httpKV({ baseUrl })

      const explorerInstance = await components.explorer({
       connection: { name: `Key Value Store: ${baseUrl}`, value: kv },
       components,
       getMenu() {
        return g
       },
      })

      if (explorerInstance.error) {
       const paramModeErrorMessage =
        'HTTP 400: Bad Request: parameter mode must be one of: '
       if (explorerInstance.error.includes(paramModeErrorMessage)) {
        const modes = explorerInstance.error
         .split(paramModeErrorMessage)[1]
         .split(', ')
        const modeSelectContainer = document.createElement('div')
        const modeSelectLabel = document.createElement('label')
        modeSelectLabel.textContent = 'Mode'
        const modeSelect = document.createElement('select')
        modeInput = modeSelect
        modeSelect.style.width = '100%'
        modeSelect.style.padding = '4px'
        modeSelect.style.marginBottom = '8px'
        modeSelect.style.border = '1px solid #ccc'
        modeSelect.style.borderRadius = '5px'
        for (const mode of modes) {
         const option = document.createElement('option')
         option.value = mode
         option.textContent = mode
         modeSelect.appendChild(option)
        }

        const modeSelectConnectButton = document.createElement('button')
        modeSelectConnectButton.textContent = 'Set Mode'
        modeSelectConnectButton.style.padding = '4px 8px'
        modeSelectConnectButton.style.marginLeft = '8px'
        modeSelectConnectButton.addEventListener(
         'click',
         tryConnectToKeyValueStore
        )

        modeSelectLabel.appendChild(modeSelect)
        modeSelectContainer.appendChild(modeSelectLabel)
        modeSelectContainer.appendChild(modeSelectConnectButton)
        modeSelectContainer.style.alignItems = 'center'
        modeSelectContainer.style.backgroundColor = '#f0f0f040'
        modeSelectContainer.style.border = '1px solid #cccccc80'
        modeSelectContainer.style.borderRadius = '5px'
        modeSelectContainer.style.display = 'flex'
        modeSelectContainer.style.fontFamily = 'monospace'
        modeSelectContainer.style.justifyContent = 'center'
        modeSelectContainer.style.margin = '10px'
        modeSelectContainer.style.padding = '10px'

        const modeSelectView = v({ element: modeSelectContainer }).element
        menu.element.appendChild(modeSelectView)
       } else {
        const errorView = v(components.text(explorerInstance.error)).element
        errorView.style.backgroundColor = '#f0f0f040'
        errorView.style.border = '1px solid #cccccc80'
        errorView.style.borderRadius = '5px'
        errorView.style.color = '#333'
        errorView.style.fontFamily = 'monospace'
        errorView.style.margin = '10px'
        errorView.style.padding = '10px'
        menu.element.appendChild(errorView)
       }
       return
      }

      const commanderElement = components.commander({
       connection: { name: 'Key Value Store', value: kv },
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
       items: [[explorerInstance.element], [commanderElement]],
       getMenu() {
        return a
       },
      })

      menu.element.parentElement.appendChild(v(a).element)
      autoScroll(explorerInstance.element)
     }

     async function keyValueConfiguration() {
      try {
       const container = document.createElement('div')
       const input = document.createElement('input')
       keyValueBaseUrlInput = input
       input.type = 'text'
       input.value = 'http://localhost:3333'
       input.style.width = '100%'
       input.style.padding = '4px'
       input.style.marginBottom = '8px'

       const button = document.createElement('button')
       button.textContent = 'Connect'
       button.style.padding = '4px 8px'

       button.onclick = tryConnectToKeyValueStore

       container.appendChild(input)
       container.appendChild(button)
       return container
      } catch (e) {
       console.error(e)
       return components.text(`Error: ${e.message ?? e ?? 'Unknown error'}`)
        .element
      }
     }

     const configPane = components.doc({
      components,
      items: [[await keyValueConfiguration(), undefined, 'URL']],
      name: 'Configure Key Value Store',
      onClose() {
       configView.close()
      },
     })

     const configView = v(configPane)
     menu.element.appendChild(configView.element)
     autoScroll(content)
    },
   ]

   const connectMenu = {
    items: [connectLocalStorage, connectKeyValueStorage],
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
     autoScroll(content)
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
      onClose() {
       licenseView.close()
      },
     })
     const licenseView = v(license)
     menu.element.appendChild(licenseView.element)
     autoScroll(content)
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
