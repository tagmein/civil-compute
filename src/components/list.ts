import {
 StarryUITheme,
 attachStyle,
} from '@starryui/theme'

export function list(
 theme: StarryUITheme
) {
 const stylesheets: HTMLStyleElement[] =
  [
   attachStyle(
    theme,
    '.list_container',
    {
     overflowX: 'hidden',
     overflowY: 'auto',
     padding: 'var(--dimension3)',
    }
   ),
   attachStyle(
    theme,
    '.list_container > div',
    {
     backgroundColor: 'var(--theme4)',
     border: '1px solid var(--theme4)',
     borderRadius: 'var(--dimension3)',
     cursor: 'pointer',
     lineHeight: '28px',
     margin: 'var(--dimension2) 0',
     minHeight: '30px',
     padding:
      'var(--dimension1) calc(var(--dimension2) + var(--dimension1))',
    }
   ),
  ]
 const element =
  document.createElement('div')
 element.classList.add('list_container')

 function setItems(
  items: string[],
  onClick: (
   item: string
  ) => Promise<void>
 ) {
  if (items.length === 0) {
   element.textContent = 'No items'
   return element
  }

  items.forEach((item) => {
   const div =
    document.createElement('div')
   div.textContent = item

   div.addEventListener('click', () =>
    onClick(item)
   )

   element.appendChild(div)
  })
 }

 function destroy() {
  for (const sheet of stylesheets) {
   document.head.removeChild(sheet)
  }
 }

 return { destroy, element, setItems }
}
