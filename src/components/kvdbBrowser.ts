import {
 StarryUITheme,
 attachStyle,
} from '@starryui/theme'
import { User } from '../lib/auth'
import { kvdb } from '../lib/kvdb'
import { editableList } from './editableList'
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
 const container =
  document.createElement('div')
 container.classList.add(
  'kvdbBrowser_container'
 )

 // Sidebar
 const sidebar =
  document.createElement('div')
 Object.assign(sidebar.style, {
  backgroundColor: 'var(--theme1)',
  borderRight:
   '1px solid var(--theme4)',
  width: '240px',
 })

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

 sidebar.appendChild(lovedList.element)

 contentContainer.appendChild(
  contentScroll
 )
 contentScroll.appendChild(content)
 container.append(
  sidebar,
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
  container.remove()
  directoryView.destroy()
  for (const sheet of stylesheets) {
   document.head.removeChild(sheet)
  }
 }
 return { destroy, element: container }
}
