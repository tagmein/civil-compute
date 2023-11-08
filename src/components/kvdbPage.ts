import {
 StarryUITheme,
 attachStyle,
} from '@starryui/theme'
import { KVDBDirectoryTools } from '../lib/kvdb'
import { ListItem } from './editableList'
import { TabContents } from './tabSwitcher'

export interface KVDBPageView
 extends TabContents {}

export function kvdbPage(
 theme: StarryUITheme,
 kvdbInstance: KVDBDirectoryTools,
 page: ListItem
): KVDBPageView {
 const stylesheets = [
  attachStyle(
   theme,
   '.kvdbPage_container',
   {
    backgroundColor: 'var(--theme2)',
    flexGrow: '1',
    overflow: 'hidden',
   }
  ),
 ]
 const element =
  document.createElement('div')
 element.classList.add(
  'kvdbPage_container'
 )
 async function load() {
  const fullPage =
   await kvdbInstance.page.read(
    page.path,
    page.name
   )
  element.textContent =
   fullPage.page.content ?? '(empty)'
 }
 load().catch((e) => console.error(e))
 function destroy() {
  for (const sheet of stylesheets) {
   document.head.removeChild(sheet)
  }
 }
 return { destroy, element }
}
