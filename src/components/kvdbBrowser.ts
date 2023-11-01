import { button } from '@starryui/button'
import {
 StarryUITheme,
 applyThemeMultiple,
 attachStyle,
} from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { User } from '../lib/auth'
import { kvdb } from '../lib/kvdb'
import { breadcrumbNavigator } from './breadcrumbNavigator'
import {
 Modal,
 openModal,
} from './openModal'

export function kvdbBrowser(
 theme: StarryUITheme,
 user: User,
 namespace = ''
) {
 const [themedButton] =
  applyThemeMultiple(theme, [button])
 const stylesheets: HTMLStyleElement[] =
  [
   attachStyle(
    theme,
    '.kvdbBrowser_container',
    {
     display: 'flex',
     flexDirection: 'row',
     flexGrow: '1',
    }
   ),
   attachStyle(
    theme,
    '.primary-action',
    [
     {
      '': {
       backgroundColor: '#306060',
      },
      '&:hover': {
       backgroundColor: '#50a0a0',
      },
     },
    ]
   ),
  ]
 const kvdbInstance = kvdb(namespace)
 const container =
  document.createElement('div')
 container.classList.add(
  'kvdbBrowser_container'
 )

 // Sidebar
 const sidebar =
  document.createElement('div')
 sidebar.textContent =
  '[TODO] hello ' + user.username
 Object.assign(sidebar.style, {
  backgroundColor: 'var(--theme2)',
  width: '240px',
 })

 // Content area
 const content =
  document.createElement('div')
 Object.assign(content.style, {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
 })

 // Menu bar
 const menu =
  document.createElement('div')
 Object.assign(menu.style, {
  borderBottom:
   '1px solid var(--theme4)',
  display: 'flex',
  alignItems: 'flex-start',
  height: '38px',
  overflowX: 'auto',
  overflowY: 'hidden',
 })

 // Breadcrumbs
 const breadcrumbs =
  breadcrumbNavigator(
   theme,
   namespace,
   loadDirectory
  )

 // Directories
 const directoriesElement =
  document.createElement('div')
 Object.assign(
  directoriesElement.style,
  {
   padding: 'var(--dimension3)',
  }
 )

 // Pages
 const pagesElement =
  document.createElement('div')
 Object.assign(pagesElement.style, {
  padding: 'var(--dimension3)',
 })
 const directoriesHeader =
  document.createElement('h3')
 directoriesHeader.textContent =
  'Directories'
 Object.assign(
  directoriesHeader.style,
  {
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding: '0 var(--dimension3)',
   marginBottom: '0',
  }
 )

 const pagesHeader =
  document.createElement('h3')
 pagesHeader.textContent = 'Pages'
 Object.assign(pagesHeader.style, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0 var(--dimension3)',
  marginBottom: '0',
 })

 const createDirButton =
  themedButton.add(
   withTextContent('Create Directory')
  )({})
 directoriesHeader.append(
  createDirButton
 )

 const createPageButton =
  themedButton.add(
   withTextContent('Create Page')
  )()
 createPageButton.textContent =
  'Create Page'
 pagesHeader.append(createPageButton)

 createDirButton.addEventListener(
  'click',
  () => {
   openCreateModal(
    theme,
    'Create Directory',
    async function (name) {
     await kvdbInstance.directory.create(
      name
     )
     loadDirectory()
    }
   )
  }
 )

 createPageButton.addEventListener(
  'click',
  () => {
   openCreateModal(
    theme,
    'Create Page',
    async function (name) {
     await kvdbInstance.page.create({
      name,
      content: '',
      url: '',
     })
     loadDirectory()
    }
   )
  }
 )

 content.append(
  menu,
  breadcrumbs.element,
  directoriesHeader,
  directoriesElement,
  pagesHeader,
  pagesElement
 )

 // Load initial data
 let lastKnownPath: string[] = []
 loadDirectory()

 // Helpers

 async function loadDirectory(
  path?: string[]
 ) {
  if (!path) {
   path = lastKnownPath
  }
  lastKnownPath = path
  // Fetch directories and pages
  const dirList =
   await kvdbInstance.directory.list(
    path
   )
  const pageList =
   await kvdbInstance.page.list(path)

  // Render directories
  directoriesElement.textContent = ''
  for (const dir of dirList.dirs) {
   const div = renderDirectory(dir)
   Object.assign(div.style, {
    backgroundColor: 'var(--theme4)',
    border: '1px solid var(--theme4)',
    borderRadius: 'var(--dimension3)',
    cursor: 'pointer',
    lineHeight: '28px',
    margin: 'var(--dimension2) 0',
    minHeight: '30px',
    padding:
     'var(--dimension1) calc(var(--dimension2) + var(--dimension1))',
   })
   div.addEventListener('click', () => {
    loadDirectory([...path!, dir])
   })
   directoriesElement.appendChild(div)
  }

  // Render pages
  pagesElement.textContent = ''
  for (const page of pageList.pages) {
   const div = renderPage(page)
   Object.assign(div.style, {
    backgroundColor: 'var(--theme4)',
    border: '1px solid var(--theme4)',
    borderRadius: 'var(--dimension3)',
    cursor: 'pointer',
    lineHeight: '28px',
    margin: 'var(--dimension2) 0',
    minHeight: '30px',
    padding:
     'var(--dimension1) calc(var(--dimension2) + var(--dimension1))',
   })
   pagesElement.appendChild(div)
  }
  if (dirList.dirs.length === 0) {
   directoriesElement.textContent =
    'No directories'
  }

  if (pageList.pages.length === 0) {
   pagesElement.textContent = 'No pages'
  }
  // Update breadcrumbs
  breadcrumbs.setPath(path)

  function renderDirectory(
   dir: string
  ) {
   const div =
    document.createElement('div')
   div.textContent = dir
   return div
  }

  function renderPage(page: string) {
   const div =
    document.createElement('div')
   div.textContent = page
   return div
  }
 }

 container.append(sidebar, content)
 function destroy() {
  container.remove()
  breadcrumbs.destroy()
  for (const sheet of stylesheets) {
   document.head.removeChild(sheet)
  }
 }
 return { destroy, element: container }
}

// Create Modal
function openCreateModal(
 theme: StarryUITheme,
 title: string,
 onSubmit: (
  name: string
 ) => Promise<void>
) {
 const [themedButton] =
  applyThemeMultiple(theme, [button])

 const nameInput = createNameInput()

 function createContent(modal: Modal) {
  const buttons = createButtons()
  const header = createHeader(title)
  modal.element.append(
   header,
   nameInput,
   buttons
  )
 }

 function createNameInput() {
  const nameInput =
   document.createElement('input')

  nameInput.setAttribute(
   'placeholder',
   'Enter name'
  )
  nameInput.setAttribute(
   'required',
   'required'
  )

  nameInput.style.backgroundColor =
   'var(--theme5)'
  nameInput.style.border =
   '1px solid var(--theme8)'
  nameInput.style.marginBottom =
   'var(--dimension3)'
  nameInput.style.padding =
   'var(--dimension1) var(--dimension2)'

  return nameInput
 }

 function createButtons() {
  // Existing button logic
  const buttons =
   document.createElement('div')
  buttons.style.display = 'flex'
  buttons.style.gap =
   'var(--dimension2)'

  const cancel = themedButton.add(
   withTextContent('Cancel')
  )()
  cancel.setAttribute('type', 'reset')
  cancel.addEventListener(
   'click',
   function () {
    createModal.close()
   }
  )

  const create = themedButton.add(
   withTextContent('Create')
  )()
  create.classList.add('primary-action')
  create.setAttribute('type', 'submit')

  buttons.append(cancel, create)
  return buttons
 }

 function createHeader(title: string) {
  const header =
   document.createElement('h3')
  header.textContent = title
  header.style.marginTop = '0'
  header.style.marginBottom =
   'var(--dimension3)'

  return header
 }
 const createModal = openModal({
  content: createContent,
  async onSubmit() {
   onSubmit(nameInput.value)
   createModal.close()
  },
 })
}
