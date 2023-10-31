import { button } from '@starryui/button'
import {
 StarryUITheme,
 applyThemeMultiple,
 attachStyle,
} from '@starryui/theme'
import { withTextContent } from '@starryui/traits'
import { User } from '../lib/auth'
import { kvdb } from '../lib/kvdb'

interface Breadcrumb {
 label: string
 path: string[]
 element: HTMLElement
}

export function kvdbBrowser(
 theme: StarryUITheme,
 user: User,
 namespace = ''
) {
 const [themedButton] =
  applyThemeMultiple(theme, [button])
 const stylesheets: HTMLStyleElement[] =
  []
 stylesheets.push(
  attachStyle(
   theme,
   '.kvdbBrowser_container',
   {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
   }
  )
 )
 stylesheets.push(
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
  )
 )
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
  document.createElement('div')
 Object.assign(breadcrumbs.style, {
  borderBottom:
   '1px solid var(--theme4)',
  display: 'flex',
  alignItems: 'flex-start',
  height: '38px',
  overflowX: 'auto',
  overflowY: 'hidden',
 })

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
  breadcrumbs,
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
  breadcrumbs.textContent = ''
  const crumbs = renderBreadcrumbs(path)
  crumbs.forEach((crumb) => {
   breadcrumbs.appendChild(
    crumb.element
   )
  })
 }

 function renderBreadcrumbs(
  path: string[]
 ): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [
   {
    label: 'Root',
    path: [],
    element:
     path.length === 0
      ? createBreadcrumb(namespace)
      : createBreadcrumb(
         namespace,
         function () {
          loadDirectory([])
         }
        ),
   },
  ]

  crumbs[0].element.textContent =
   namespace

  path.forEach((dir) => {
   const crumb = {
    label: dir,
    path: [
     ...(crumbs[crumbs.length - 1]
      .path ?? []),
     dir,
    ],
    element: createBreadcrumb(
     dir,
     () => {
      loadDirectory(crumb.path)
     }
    ),
   }
   crumbs.push(crumb)
  })

  return crumbs
 }

 function createBreadcrumb(
  label: string,
  onClick?: () => void
 ) {
  const bc =
   document.createElement('span')
  bc.textContent = label
  bc.style.cursor = 'pointer'
  bc.style.padding = 'var(--dimension2)'
  bc.style.display = 'block'
  if (onClick) {
   bc.addEventListener('click', onClick)
  }

  return bc
 }

 function renderDirectory(dir: string) {
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

 container.append(sidebar, content)

 function destroy() {
  container.remove()
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
 const modal =
  document.createElement('form')
 modal.tabIndex = 0

 const overlay =
  document.createElement('div')
 overlay.style.backgroundColor =
  '#80808080'
 overlay.style.position = 'fixed'
 overlay.style.top = '0'
 overlay.style.left = '0'
 overlay.style.right = '0'
 overlay.style.bottom = '0'

 // Close on click
 overlay.addEventListener(
  'click',
  close
 )

 modal.addEventListener('click', (e) =>
  e.stopPropagation()
 )

 Object.assign(modal.style, {
  backgroundColor: 'var(--theme3)',
  border: '1px solid var(--theme4)',
  padding: 'var(--dimension3)',
  margin: '50vh auto',
  maxWidth: '240px',
  transform: 'translateY(-50%)',
 })

 // Name input
 const nameInput =
  document.createElement('input')
 Object.assign(nameInput.style, {
  backgroundColor: 'var(--theme5)',
  border: '1px solid var(--theme8)',
  marginBottom: 'var(--dimension3)',
  padding:
   'var(--dimension1) var(--dimension2)',
 })
 nameInput.setAttribute(
  'placeholder',
  'Enter name'
 )
 setTimeout(
  nameInput.focus.bind(nameInput)
 )

 // Buttons
 const buttons =
  document.createElement('div')
 buttons.style.display = 'flex'
 buttons.style.gap = 'var(--dimension2)'

 const cancel = themedButton.add(
  withTextContent('Cancel')
 )()

 const create = themedButton.add(
  withTextContent('Create')
 )()
 create.classList.add('primary-action')

 let action = 'create'

 cancel.setAttribute('type', 'reset')

 cancel.addEventListener(
  'click',
  function () {
   action = 'cancel'
   modal.requestSubmit()
  }
 )

 create.addEventListener(
  'click',
  function () {
   action = 'create'
  }
 )

 buttons.append(cancel, create)

 const header =
  document.createElement('h3')
 header.textContent = title
 header.style.marginTop = '0'
 header.style.marginBottom =
  'var(--dimension3)'

 modal.append(
  header,
  nameInput,
  buttons
 )

 overlay.appendChild(modal)
 document.body.append(overlay)

 modal.addEventListener(
  'submit',
  async (e) => {
   e.preventDefault()
   if (action === 'create') {
    await onSubmit(nameInput.value)
   }
   close()
  }
 )

 function close() {
  overlay.remove()
 }
}
