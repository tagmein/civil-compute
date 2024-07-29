globalThis.RSRC.get('manager').resolve(async function () {
 const s = await load('spark')
 const crystal = await load('crystal')
 const _withClose = await load('withClose')

 return function (config) {
  console.log('Starting manage with config', config)
  return function ({ attachSpark, detachSpark, doc, base, launchSource }) {
   console.log({ attachSpark, detachSpark, doc, base, launchSource })
   const look = crystal({ base })
   const withClose = _withClose({ attachSpark, detachSpark })

   // State management
   const initialState = {
    botInfo: null,
    installed: false,
    token: null,
   }

   const state = { ...initialState }

   function clearState() {
    Object.assign(state, initialState)
    s.call(
     localStorage,
     'setItem',
     'botManagementState',
     JSON.stringify(initialState)
    )
   }

   function saveState() {
    s.call(localStorage, 'setItem', 'botManagementState', JSON.stringify(state))
   }

   function loadState() {
    const savedState = s.call(localStorage, 'getItem', 'botManagementState')
    if (savedState) {
     Object.assign(state, JSON.parse(savedState))
    }
   }

   // API calls
   async function fetchBotInfo() {
    const response = await s.call(globalThis, 'fetch', '/')
    state.botInfo = await s.call(response, 'json')
    saveState()
    renderBotInfo()
   }
   const buttonContainer = s.call(doc, 'createElement', 'div')
   s.set(buttonContainer, '4px 24px', 'style', 'padding')
   const resetButton = s.call(doc, 'createElement', 'button')
   s.set(resetButton, 'Reset', 'textContent')
   const installButton = s.call(doc, 'createElement', 'button')
   const uninstallButton = s.call(doc, 'createElement', 'button')
   const reinstallButton = s.call(doc, 'createElement', 'button')
   const messageInput = s.call(doc, 'createElement', 'input')

   const chatTitle = s.call(doc, 'createElement', 'h3')
   s.set(chatTitle, 'Chat', 'textContent')
   s.set(chatTitle, '0 24px', 'style', 'padding')

   async function installBot() {
    const response = await s.call(globalThis, 'fetch', '/install', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
      groupId: 'virtual-group',
      groupName: 'Virtual Test Group',
      webhook: '/webhook',
      config: state.botInfo.config.map((c) => ({ key: c.key, value: '' })),
     }),
    })
    const data = await s.call(response, 'json')
    state.token = data.token
    state.installed = true
    saveState()
    updateButtonStates()
   }

   async function uninstallBot() {
    await s.call(globalThis, 'fetch', '/uninstall', {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${state.token}`,
      'Content-Type': 'application/json',
     },
    })
    state.installed = false
    state.token = null
    saveState()
    updateButtonStates()
   }

   async function reinstallBot() {
    const config = state.botInfo.config.map((c) => ({
     key: c.key,
     value: s.get(s.call(doc, 'getElementById', `config-${c.key}`), 'value'),
    }))
    await s.call(globalThis, 'fetch', '/reinstall', {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${state.token}`,
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({ config }),
    })
    updateButtonStates()
   }

   let lastContainer
   function resetApp() {
    clearState()
    renderUI(lastContainer)
    updateButtonStates()
   }

   async function sendMessage() {
    const message = s.get(messageInput, 'value').trim()
    if (!message) return

    const response = await s.call(globalThis, 'fetch', '/message', {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${state.token}`,
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({ message }),
    })
    const data = await s.call(response, 'json')
    displayBotResponse(data)
    s.set(messageInput, '', 'value')
   }
   const botInfoSection = s.call(doc, 'createElement', 'section')
   const chatSection = s.call(doc, 'createElement', 'section')
   s.set(chatSection, '24px', 'style', 'margin')
   s.set(chatSection, '24px', 'style', 'padding')
   s.set(chatSection, '2px solid #80c4c4', 'style', 'border')
   s.set(chatSection, '24px', 'style', 'border-radius')
   const chatBox = s.call(doc, 'createElement', 'div')
   s.set(chatBox, '50px', 'style', 'min-height')
   s.set(chatBox, '#424242', 'style', 'background-color')

   s.call(resetButton, 'addEventListener', 'click', resetApp)
   s.call(installButton, 'addEventListener', 'click', installBot)
   s.call(uninstallButton, 'addEventListener', 'click', uninstallBot)
   s.call(reinstallButton, 'addEventListener', 'click', reinstallBot)

   // UI Rendering
   function renderUI(app) {
    const main = s.call(doc, 'createElement', 'main')
    s.set(app, '', 'innerHTML')

    const header = s.call(doc, 'createElement', 'header')
    const title = s.call(doc, 'createElement', 'h4')
    s.set(header, '0 24px', 'style', 'padding')
    s.set(title, '24px 0 0', 'style', 'margin')
    s.set(title, 'Manage', 'textContent')
    s.call(header, 'appendChild', title)
    s.call(app, 'appendChild', header)
    s.call(app, 'appendChild', buttonContainer)

    s.set(botInfoSection, 'bot-info', 'className')
    s.set(chatSection, 'chat-section', 'className')
    s.call(app, 'appendChild', main)

    s.call(main, 'appendChild', botInfoSection)
    s.call(main, 'appendChild', chatTitle)
    s.call(main, 'appendChild', chatSection)

    s.set(buttonContainer, 'button-container', 'className')

    s.set(installButton, 'action-button', 'className')
    s.set(installButton, 'Install', 'textContent')
    s.set(installButton, 'install-button', 'id')
    s.set(uninstallButton, 'action-button', 'className')
    s.set(uninstallButton, 'Uninstall', 'textContent')
    s.set(uninstallButton, 'uninstall-button', 'id')
    s.set(reinstallButton, 'action-button', 'className')
    s.set(reinstallButton, 'Reinstall', 'textContent')
    s.set(reinstallButton, 'reinstall-button', 'id')

    s.call(buttonContainer, 'appendChild', resetButton)
    s.call(buttonContainer, 'appendChild', installButton)
    s.call(buttonContainer, 'appendChild', uninstallButton)
    s.call(buttonContainer, 'appendChild', reinstallButton)

    updateButtonStates()
    fetchBotInfo()
   }

   function renderBotInfo() {
    s.set(botInfoSection, '', 'innerHTML')
    s.set(botInfoSection, '4px 24px', 'style', 'padding')

    if (!state.botInfo) return

    const nameEl = s.call(doc, 'createElement', 'h2')
    s.set(nameEl, state.botInfo.name, 'textContent')
    const descEl = s.call(doc, 'createElement', 'p')
    s.set(descEl, `Description: ${state.botInfo.description}`, 'textContent')
    const keywordsEl = s.call(doc, 'createElement', 'p')
    s.set(
     keywordsEl,
     `Keywords: ${state.botInfo.keywords.join(', ')}`,
     'textContent'
    )

    s.call(botInfoSection, 'appendChild', nameEl)
    s.call(botInfoSection, 'appendChild', descEl)
    s.call(botInfoSection, 'appendChild', keywordsEl)

    const configEl = s.call(doc, 'createElement', 'div')
    s.set(configEl, 'config-section', 'className')
    const configTitle = s.call(doc, 'createElement', 'h3')
    s.set(configTitle, 'Configuration', 'textContent')
    s.call(configEl, 'appendChild', configTitle)

    state.botInfo.config.forEach((c) => {
     const configItem = s.call(doc, 'createElement', 'div')
     s.set(configItem, 'config-item', 'className')
     const label = s.call(doc, 'createElement', 'label')
     s.set(label, c.label, 'textContent')
     s.call(label, 'setAttribute', 'for', `config-${c.key}`)
     const input = s.call(doc, 'createElement', 'input')
     s.set(input, `config-${c.key}`, 'id')
     s.set(input, c.placeholder, 'placeholder')
     s.set(input, c.type, 'type')
     s.set(input, c.required, 'required')

     s.call(configItem, 'appendChild', label)
     s.call(configItem, 'appendChild', input)
     s.call(configEl, 'appendChild', configItem)
    })

    s.call(botInfoSection, 'appendChild', configEl)
   }

   function updateButtonStates() {
    s.set(installButton, state.installed, 'disabled')
    s.set(uninstallButton, !state.installed, 'disabled')
    s.set(reinstallButton, !state.installed, 'disabled')

    s.set(chatSection, '', 'innerHTML')
    s.set(chatBox, 'chat-box', 'className')
    s.set(messageInput, 'text', 'type')
    s.set(messageInput, 'message-input', 'id')
    s.set(messageInput, 'Type a message...', 'placeholder')

    const sendButton = s.call(doc, 'createElement', 'button')
    s.set(sendButton, 'Send', 'textContent')
    s.call(sendButton, 'addEventListener', 'click', sendMessage)

    s.call(chatSection, 'appendChild', chatBox)
    s.call(chatSection, 'appendChild', messageInput)
    s.call(chatSection, 'appendChild', sendButton)
   }

   function displayBotResponse(data) {
    data.actions.forEach((action) => {
     const messageEl = s.call(doc, 'createElement', 'p')
     s.set(messageEl, 'bot-message', 'className')
     s.set(messageEl, action.message, 'textContent')
     s.call(chatBox, 'appendChild', messageEl)
    })
    s.set(chatBox, s.get(chatBox, 'scrollHeight'), 'scrollTop')
   }

   // Initialize the app
   function init(appContainer) {
    loadState()
    renderUI(appContainer)
    lastContainer = appContainer
   }

   // Run the app
   withClose({
    content(container) {
     const appContainer = s.call(doc, 'createElement', 'div')
     s.call(container, 'appendChild', appContainer)
     init(appContainer)
    },
   })
  }
 }
})
