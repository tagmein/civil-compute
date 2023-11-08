import { button } from '@starryui/button'
import {
 StarryUITheme,
 applyThemeMultiple,
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
  ]
 const kvdbInstance = kvdb(namespace)
 const element =
  document.createElement('div')
 element.classList.add(
  'kvdbBrowser_container'
 )

 const [themedButton] =
  applyThemeMultiple(theme, [button])

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

 contentContainer.append(
  menu,
  tabs.element,
  contentScroll
 )

 contentScroll.appendChild(content)

 element.append(
  sidebar.element,
  contentContainer
 )

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
