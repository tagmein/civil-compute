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
 attachStyle,
 attachThemeFacet,
 attachThemeVariables,
} from '@starryui/theme'

export function home(
 theme: StarryUITheme
): StarryUIPage {
 const themedPage = applyTheme(
  theme,
  page
 )

 const arrowStyle = attachStyle(
  theme,
  '.arrow-next',
  {
   alignSelf: 'flex-end',
   fontSize: '48px',
   maxWidth: '24px',
   overflow: 'hidden',
   textAlign: 'right',
   textIndent: '-24px',
  }
 )

 function arrowNext() {
  const arrow =
   document.createElement('div')
  arrow.classList.add('arrow-next')
  arrow.innerHTML = '&rarr;'
  return arrow
 }

 return themedPage({
  title: 'Home',
  content(container, config) {
   const themeVariablesStyle:
    | HTMLStyleElement
    | undefined = attachThemeVariables(
    container,
    theme.variables
   )
   const [
    themedRow,
    themedColumn,
    themedFrame,
   ] = applyThemeMultiple(theme, [
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

   function headerText(text: string) {
    const h4 =
     document.createElement('h4')
    h4.textContent = text
    return h4
   }

   const entries = themedColumn({
    style: {
     alignItems: 'center',
     borderBottom:
      '1px solid var(--theme2)',
     flexGrow: '0',
     gap: '20px',
     justifyContent: 'space-evenly',
     padding:
      '0 var(--dimension4) var(--dimension3) ',
    },
    themeFacets: ['document', 'opaque'],
   })

   for (const {
    description,
    href,
    name,
   } of [
    {
     name: 'About',
     description:
      'Learn about Civil Compute',
     href: '/#/about',
    },
    {
     name: 'Directory',
     description:
      'Browse the public application repository',
     href: '/#/directory',
    },
    {
     name: 'Projects',
     description:
      'Get to work solo or with a team',
     href: '/#/projects',
    },
    {
     name: 'Teams',
     description:
      'Teams are groups of people that collaborate on projects',
     href: '/#/teams',
    },
   ]) {
    const frame = themedFrame({
     href,
     style: {
      padding:
       'var(--dimension3) var(--dimension4)',
     },
     tagName: 'a',
    })
    attachThemeFacet(
     frame,
     theme,
     'link-frame'
    )
    frame.appendChild(headerText(name))
    const descPara =
     document.createElement('p')
    descPara.textContent = description
    frame.appendChild(descPara)
    entries.appendChild(frame)
   }
   mainArea.appendChild(entries)

   const quickLinks = themedRow({
    style: {
     alignItems: 'center',
     borderBottom:
      '1px solid var(--theme2)',
     flexGrow: '0',
     gap: '20px',
     justifyContent: 'space-evenly',
     padding:
      '0 var(--dimension4) var(--dimension3) ',
    },
    themeFacets: ['document', 'opaque'],
   })

   for (const {
    description,
    href,
    name,
   } of [
    {
     name: 'Start a new project',
     description:
      'Build a web application from scratch',
     href: '/#/projects/new',
    },
    {
     name: 'Community',
     description:
      'Discuss Civil Compute with your peers from around the world',
     href: '/#/community',
    },
    {
     name: 'Create a team',
     description:
      'Assemble your people',
     href: '/#/teams/new',
    },
    {
     name: 'Publish',
     description:
      'Ready for users? Publish your application to the directory',
     href: '/#/directory/publish',
    },
   ]) {
    const frame = themedFrame({
     href,
     style: {
      display: 'flex',
      flexDirection: 'column',
      padding:
       'var(--dimension3) var(--dimension4)',
     },
     tagName: 'a',
    })
    attachThemeFacet(
     frame,
     theme,
     'link-frame'
    )
    frame.appendChild(headerText(name))
    const descPara =
     document.createElement('p')
    descPara.textContent = description
    frame.appendChild(descPara)
    const spacer =
     document.createElement('div')
    attachThemeFacet(
     spacer,
     theme,
     'tray-spacer'
    )
    frame.appendChild(spacer)
    frame.appendChild(arrowNext())
    quickLinks.appendChild(frame)
   }

   const quickLinksHeader =
    document.createElement('h3')
   quickLinksHeader.textContent =
    'What can I do?'
   entries.appendChild(quickLinksHeader)

   entries.appendChild(quickLinks)

   container.appendChild(mainArea)

   config?.startUpTasks?.initial?.push?.(
    function () {
     if (arrowStyle) {
      document.head.appendChild(
       arrowStyle
      )
     }
     if (themeVariablesStyle) {
      document.head.appendChild(
       themeVariablesStyle
      )
     }
    }
   )

   config?.cleanUpTasks?.final?.push(
    function () {
     if (arrowStyle) {
      document.head.removeChild(
       arrowStyle
      )
     }
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
