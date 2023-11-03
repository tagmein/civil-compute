import {
 StarryUITheme,
 attachStyle,
} from '@starryui/theme'

interface Tab {
 name: string
 element: HTMLElement
 contents: () => HTMLElement
 cachedContents?: HTMLElement
}

export function tabSwitcher(
 theme: StarryUITheme
) {
 const element =
  document.createElement('div')
 element.classList.add(
  'tabSwitcher_container'
 )

 const tabBar =
  document.createElement('div')
 tabBar.classList.add(
  'tabSwitcher_tabBar'
 )
 const stylesheets = [
  attachStyle(
   theme,
   '.tabSwitcher_container',
   {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
   }
  ),
  attachStyle(
   theme,
   '.tabSwitcher_tabBar',
   [
    {
     '': {
      borderBottom:
       '1px solid var(--theme4)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      flexShrink: '0',
      height: '56px',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding:
       'var(--dimension3) var(--dimension3) 0',
     },
     '& > div': {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      flexShrink: '0',
      whiteSpace: 'nowrap',
      maxWidth: '180px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition:
       'background-color 0.2s ease, border-bottom 0.2s ease',
     },
     '& > div > label': {
      cursor: 'inherit',
      flexShrink: '1',
      flexGrow: '1',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding:
       'var(--dimension2) var(--dimension3) var(--dimension1)',
     },
     '& > div > button': {
      backgroundColor: 'transparent',
      border: 'none',
      borderLeft:
       '1px solid var (--theme4)',
      marginLeft: '-22px',
      borderRadius: '0',
      color: 'var(--theme8)',
      flexShrink: '0',
      flexGrow: '0',
      cursor: 'pointer',
      padding:
       'var(--dimension1) var(--dimension2)',
      transition:
       'background-color 0.2s ease, border-bottom 0.2s ease',
     },
     '& > div > button:hover': {
      backgroundColor: 'var(--theme6)',
     },
     '& > div:hover': {
      backgroundColor: 'var(--theme4)',
     },
     '& > div[data-active="true"]': {
      backgroundColor: 'var(--theme2)',
      borderBottom:
       'var(--dimension1) solid var(--theme8)',
      cursor: 'text',
     },
    },
   ]
  ),
 ]

 let tabs: Tab[] = []
 let activeTab: Tab | undefined =
  undefined

 element.append(tabBar)

 function createTab(
  name: string,
  closeable = true
 ) {
  const tab =
   document.createElement('div')
  tab.setAttribute('title', name)
  tab.setAttribute('tabindex', '0')
  tab.addEventListener(
   'mouseenter',
   function () {
    tab.scrollIntoView({
     behavior: 'smooth',
    })
   }
  )
  const label =
   document.createElement('label')
  label.textContent = name
  tab.appendChild(label)
  if (closeable) {
   const closeBtn =
    document.createElement('button')
   closeBtn.textContent = '✕'

   closeBtn.addEventListener(
    'click',
    function (event) {
     event.stopPropagation()
     closeTab(name)
    }
   )

   tab.appendChild(closeBtn)
  }

  tab.addEventListener('click', () => {
   switchToTab(name)
  })

  return tab
 }

 function switchToTab(name: string) {
  const tab = tabs.find(
   (t) => t.name === name
  )
  if (!tab) {
   return false
  }

  if (activeTab === tab) {
   return true
  }

  if (activeTab) {
   activeTab.cachedContents?.remove?.()
   activeTab.element.dataset.active =
    'false'
  }
  activeTab = tab

  if (!tab.cachedContents) {
   tab.cachedContents = tab.contents()
  }
  element.appendChild(
   tab.cachedContents
  )
  activeTab.element.dataset.active =
   'true'
  activeTab.element.focus()
  activeTab.element.scrollIntoView({
   behavior: 'smooth',
  })
  return true
 }

 function closeTab(name: string) {
  // Find index of tab
  const index = tabs.findIndex(
   (t) => t.name === name
  )

  if (index === -1) {
   return
  }

  // Remove tab element
  tabBar.children[index].remove()

  // Remove tab object
  tabs.splice(index, 1)

  // If closing active tab
  if (activeTab?.name === name) {
   // Set active to previous
   let prevIndex = index - 1
   if (prevIndex < 0) {
    prevIndex = 0
   }

   if (tabs[prevIndex]) {
    switchToTab(tabs[prevIndex].name)
   } else {
    activeTab = undefined
   }
  }
 }

 function openTab(
  name: string,
  contents?: () => HTMLElement,
  closeable = true,
  switchTo = true
 ) {
  if (
   !tabs.find(
    (tab) => tab.name === name
   )
  ) {
   if (!contents) {
    throw new Error(
     `tab ${JSON.stringify(
      name
     )} not found`
    )
   }
   const tab = createTab(
    name,
    closeable
   )
   tabBar.appendChild(tab)
   tabs.push({
    name,
    contents,
    element: tab,
   })
  }

  if (switchTo || !activeTab) {
   switchToTab(name)
  }
 }

 return {
  destroy() {
   element.remove()
   for (const stylesheet of stylesheets) {
    document.head.removeChild(
     stylesheet
    )
   }
  },
  element,
  openTab,
  closeTab,
 }
}
