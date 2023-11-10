import {
 StarryUITheme,
 applyThemeMultiple,
} from '@starryui/theme'

import { button } from '@starryui/button'
import { row } from '@starryui/layout'
import {
 withClick,
 withTextContent,
} from '@starryui/traits'
import {
 tray,
 traySpacer,
} from '@starryui/tray'
import {
 User,
 clearAuth,
 createAuth,
 getAuth,
} from '../lib/auth'

interface AuthElement {
 element: HTMLElement
 destroy(): void
}

function createAuthForm(
 theme: StarryUITheme,
 onUpdate: () => void
): AuthElement {
 let action: 'sign-in' | 'create-account' =
  'sign-in'

 const [themedButton, themedRow] =
  applyThemeMultiple(theme, [button, row])

 const form = document.createElement('form')

 async function submitAuthForm() {
  errorMessage.textContent = ''
  form.focus()

  for (const child of [
   form,
   ...form.children,
  ]) {
   child?.setAttribute?.('disabled', 'disabled')
  }

  const username = usernameInput.value
  const password = passwordInput.value
  const createAccount =
   action === 'create-account'

  try {
   const response = await createAuth(
    username,
    password,
    createAccount
   )

   if ('error' in response) {
    errorMessage.textContent = response.error
    return
   }

   onUpdate()
  } catch (error) {
   errorMessage.textContent = error.message
  } finally {
   for (const child of [
    form,
    ...form.children,
   ]) {
    child?.removeAttribute?.('disabled')
   }
  }
 }

 form.setAttribute('tabindex', '0')
 form.addEventListener(
  'keydown',
  async ({ key }) => {
   if (key === 'Enter') {
    await submitAuthForm()
   }
  }
 )
 form.addEventListener(
  'submit',
  async function (event) {
   event.preventDefault()
   await submitAuthForm()
  }
 )

 Object.assign(form.style, {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--dimension3)',
  margin: 'var(--dimension3) auto',
  maxWidth: '480px',
  padding: 'var(--dimension4)',
 })

 const formTitle = document.createElement('h3')
 formTitle.textContent = 'Sign in to continue'

 function inputStyle(elem: HTMLElement) {
  Object.assign(elem.style, {
   backgroundColor: 'var(--theme1)',
   border: '1px solid var(--theme4)',
   padding:
    'var(--dimension1) var(--dimension2)',
  })
 }

 const usernameInput =
  document.createElement('input')
 usernameInput.type = 'text'
 usernameInput.name = 'username'
 usernameInput.setAttribute(
  'placeholder',
  'username'
 )
 inputStyle(usernameInput)
 usernameInput.setAttribute(
  'enterkeyhint',
  'Next'
 )

 const passwordInput =
  document.createElement('input')
 passwordInput.type = 'password'
 passwordInput.name = 'password'
 passwordInput.setAttribute(
  'placeholder',
  'password'
 )
 inputStyle(passwordInput)
 passwordInput.setAttribute(
  'enterkeyhint',
  'Sign in'
 )

 const buttonRow = themedRow({
  style: {
   gap: 'var(--dimension2)',
  },
 })

 const signInButton = themedButton.add(
  withClick(function () {
   action = 'sign-in'
  }),
  withTextContent('Sign in')
 )()

 const createAccountButton = themedButton.add(
  withClick(function () {
   action = 'create-account'
  }),
  withTextContent('Create account')
 )()

 buttonRow.append(
  signInButton,
  createAccountButton
 )

 const errorMessage =
  document.createElement('p')

 Object.assign(errorMessage.style, {
  color: '#f08080',
  margin: '0',
 })

 form.append(
  formTitle,
  usernameInput,
  passwordInput,
  buttonRow,
  errorMessage
 )

 return {
  element: form,
  destroy() {
   form.remove()
  },
 }
}

export function authGuard(
 container: HTMLElement,
 theme: StarryUITheme,
 onAuthenticated: (user: User) => AuthElement
) {
 let currentElement: AuthElement

 function createAccountTray() {
  const [themedButton, themedTray] =
   applyThemeMultiple(theme, [button, tray])

  const accountTray = themedTray({
   style: {
    backgroundColor: 'var(--theme2)',
    color: 'var(--theme8)',
    lineHeight: '20px',
   },
  })

  const message = document.createElement('span')

  Object.assign(message.style, {
   fontSize: '14px',
   padding:
    'var(--dimension2) var(--dimension3)',
  })

  function setMessage(text: string) {
   message.textContent = text
  }

  const logoutButton = themedButton.add(
   withClick(async function () {
    await clearAuth()
    render()
   }),
   withTextContent('Logout')
  )({
   style: {
    backgroundColor: 'transparent',
    borderBottom: 'none',
    color: 'var(--theme8)',
    lineHeight: '22px',
    height: '100%',
    padding:
     'var(--dimension2) var(--dimension3)',
    boxSizing: 'border-box',
    maxHeight: 'initial',
   },
  })
  accountTray.append(
   message,
   traySpacer(theme),
   logoutButton
  )

  return {
   container: accountTray,
   destroy() {
    accountTray.remove()
   },
   setMessage,
  }
 }

 const accountBanner = createAccountTray()

 async function render() {
  if (currentElement) {
   currentElement.destroy()
  }

  const auth = await getAuth()

  if (auth) {
   currentElement = onAuthenticated(auth.user)
   accountBanner.setMessage(
    `Welcome, ${auth.user.username}`
   )
   container.appendChild(
    accountBanner.container
   )
   container.appendChild(currentElement.element)
  } else {
   if (accountBanner.container.parentElement) {
    accountBanner.container.remove()
    accountBanner.setMessage('signed out')
   }
   currentElement = createAuthForm(
    theme,
    render
   )
   container.appendChild(currentElement.element)
  }
 }

 render()
}
