import { KVDBDirectoryTools } from '../lib/kvdb'
import { ListItem } from './editableList'

export function kvdbPage(
 kvdbInstance: KVDBDirectoryTools,
 page: ListItem
) {
 const editor =
  document.createElement('div')
 editor.classList.add('pageEditor')
 async function load() {
  const fullPage =
   await kvdbInstance.page.read(
    page.path,
    page.name
   )
  editor.textContent =
   fullPage.page.content ?? '(empty)'
 }
 load().catch((e) => console.error(e))
 return editor
}
