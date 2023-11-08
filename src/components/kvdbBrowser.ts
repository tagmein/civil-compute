import {
 StarryUITheme,
 attachStyle,
} from '@starryui/theme'
import { User } from '../lib/auth'
import { kvdb } from '../lib/kvdb'
import { editableList } from './editableList'
import { kvdbBrowserSidebar } from './kvdbBrowserSidebar'
import { kvdbDirectory } from './kvdbDirectory'
import { ItemAction } from './list'
import { tabSwitcher } from './tabSwitcher'

export function kvdbBrowser(
 theme: StarryUITheme,
 user: User,
 namespace = ''
) {
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
   attachStyle(theme, '.pageEditor', {
    backgroundColor: 'var(--theme2)',
    flexGrow: '1',
    overflow: 'hidden',
   }),
  ]
 const kvdbInstance = kvdb(namespace)
 const element =
  document.createElement('div')
 element.classList.add(
  'kvdbBrowser_container'
 )

 // Content area
 const contentContainer =
  document.createElement('div')
 Object.assign(contentContainer.style, {
  backgroundColor: 'var(--theme1)',
  flexGrow: '1',
  overflow: 'hidden',
  position: 'relative',
 })

 const contentScroll =
  document.createElement('div')
 Object.assign(contentScroll.style, {
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
 })

 // Content area
 const content =
  document.createElement('div')
 Object.assign(content.style, {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
 })

 const tabs = tabSwitcher(theme)

 const kvdbInstanceLists =
  kvdbInstance.enterNamespace('.lists')
 const lovedList = editableList(
  theme,
  kvdbInstanceLists,
  'Loved',
  (...args) =>
   directoryView.loadDirectory(...args)
 )

 const loveItemAction: ItemAction = [
  '❤',
  lovedList.addItemToList,
  'Add to Loved',
 ]

 const directoryView = kvdbDirectory(
  theme,
  tabs,
  kvdbInstance,
  [loveItemAction],
  [loveItemAction]
 )

 const sidebar = kvdbBrowserSidebar(
  theme,
  kvdbInstance.enterNamespace(
   '.civil-preferences'
  )
 )
 sidebar.element.appendChild(
  lovedList.element
 )

 contentContainer.appendChild(
  contentScroll
 )

 contentScroll.appendChild(content)

 element.append(
  sidebar.element,
  contentContainer
 )

 content.append(tabs.element)
 tabs.openTab(
  'Index',
  directoryView.view,
  false,
  true
 )

 directoryView.loadDirectory()

 function destroy() {
  element.remove()
  directoryView.destroy()
  sidebar.destroy()
  for (const sheet of stylesheets) {
   document.head.removeChild(sheet)
  }
 }
 return { destroy, element }
}
