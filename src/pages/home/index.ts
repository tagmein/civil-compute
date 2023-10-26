import { frame } from '@starryui/frame'
import {
 column,
 row,
} from '@starryui/layout'
import {
 StarryUIPage,
 page,
} from '@starryui/page'
import {
 StarryUITheme,
 applyTheme,
 applyThemeMultiple,
 attachThemeVariables,
} from '@starryui/theme'

export function home(
 theme: StarryUITheme
): StarryUIPage {
 const themedPage = applyTheme(
  theme,
  page
 )
 return themedPage({
  title: 'Home',
  content(container, config) {
   const themeVariablesStyle:
    | HTMLStyleElement
    | undefined = attachThemeVariables(
    container,
    theme.variables
   )
   const [themedRow] =
    applyThemeMultiple(theme, [
     row,
     column,
     frame,
    ])
   const topArea = themedRow({
    style: {
     alignItems: 'center',
     borderBottom:
      '1px solid var(--theme2)',
     flexGrow: '0',
     gap: '20px',
     minHeight: '128px',
     justifyContent: 'space-evenly',
     padding:
      '0 var(--dimension4) var(--dimension3) ',
    },
    themeFacets: ['document', 'opaque'],
   })
   topArea.setAttribute(
    'data-responsive',
    '1'
   )
   const header =
    document.createElement('h2')
   header.style.minWidth = '150px'
   header.textContent =
    'Build and host web apps'
   const para0 =
    document.createElement('p')
   para0.textContent =
    'Civil Compute is a hosting platform that combines storage and compute with concepts from Literate Programming for runtime introspection of programs.'
   const para1 =
    document.createElement('p')
   para1.innerHTML =
    'Find the source code on <a href="https://github.com/tagmein/civil-compute" target="_blank">GitHub</a>.'
   topArea.appendChild(header)
   topArea.appendChild(para0)
   topArea.appendChild(para1)
   container.appendChild(topArea)
   const mainArea = themedRow({
    style: {
     gap: '10px',
     padding: '10px',
    },
    themeFacets: ['opaque'],
   })

   container.appendChild(mainArea)

   config?.startUpTasks?.initial?.push?.(
    function () {
     if (themeVariablesStyle) {
      document.head.appendChild(
       themeVariablesStyle
      )
     }
    }
   )

   config?.cleanUpTasks?.final?.push(
    function () {
     if (themeVariablesStyle) {
      document.head.removeChild(
       themeVariablesStyle
      )
     }
    }
   )
  },
 })
}
