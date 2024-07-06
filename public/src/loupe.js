globalThis.RSRC.get('loupe').resolve(async function () {
 const s = await load('spark')
 const crystal = await load('crystal')
 const _withClose = await load('withClose')
 return function ({ attachSpark, detachSpark, doc, base }) {
  const look = crystal({ base })
  const withClose = _withClose({ attachSpark, detachSpark })
  let _refresh

  // Add stylesheet
  const style = s.call(doc, 'createElement', 'style')
  s.set(
   style,
   `
    .loupe-container {
      height: calc(50dvh - 55px);
      overflow: auto;
    }
    .loupe-content {
      width: 100%;
      position: relative;
    }
    .loupe-content > div {
      border-bottom: 1px solid #80808040;
      box-sizing: border-box;
      display: flex;
      font-size: 13px;
      left: 0;
      line-height: 25px;
      padding: 0 8px;
      position: absolute;
      right: 0;
      white-space: nowrap;
    }
    .loupe-key {
      margin-right: 10px;
    }
    .loupe-value {
      flex: 1;
    }
    .loupe-load-more {
      background: #00000040;
      border-radius: 4px;
      border: none;
      box-shadow: 0 0 2px #000;
      color: inherit;
      cursor: pointer;
      font-size: 13px;
      line-height: 8px;
      margin: 0 10px;
      padding: 0px 4px 7px;
      transition: background-color 0.1s linear;
      vertical-align: 4px;
      white-space: nowrap;
    }
    .loupe-load-more:hover {
     background: #80808020;
    }
    .loupe-load-more:active {
     background: #00000080;
    }
   `,
   'textContent'
  )
  const head = s.get(doc, 'head')
  s.call(head, 'appendChild', style)

  withClose({
   menu: [
    {
     label: 'Add',
     async action() {
      const k = prompt('Key:')
      if (typeof k !== 'string') {
       return
      }
      const v = prompt('Value:')
      if (typeof v !== 'string') {
       return
      }
      await s.call(look, 'set', k, v)
      if (_refresh) {
       await _refresh()
      }
     },
    },
   ],
   content(container) {
    const keyDirectory = look.keys

    const scrollContainer = s.call(doc, 'createElement', 'div')
    s.set(scrollContainer, 'loupe-container', 'className')
    s.call(container, 'appendChild', scrollContainer)

    const contentContainer = s.call(doc, 'createElement', 'div')
    s.set(contentContainer, 'loupe-content', 'className')
    s.call(scrollContainer, 'appendChild', contentContainer)

    let totalKeys = 0
    let keys = []
    const ROW_HEIGHT = 25
    let isLoading = false
    let lastScrollY = 0
    const renderedRowCache = new Map()
    const renderedKeyQueue = []

    async function refresh() {
     if (isLoading) return
     isLoading = true
     await fetchKeys(0, 20)
     isLoading = false
    }

    _refresh = refresh

    async function fetchKeys(start, end) {
     const fetchedKeys = await s.call(keyDirectory, 'listKeys')
     totalKeys = fetchedKeys.length
     keys = fetchedKeys.slice(start, end)
     updateContentHeight()
     renderKeys()
    }

    function updateContentHeight() {
     const totalHeight = totalKeys * ROW_HEIGHT
     s.set(contentContainer, `height: ${totalHeight}px;`, 'style')
    }

    async function createRowElement(keyObject, index) {
     const key = keyObject.key || JSON.stringify(keyObject)

     // Check if the row is already in the cache
     if (renderedRowCache.has(key)) {
      return renderedRowCache.get(key)
     }

     const rowElement = s.call(doc, 'createElement', 'div')
     s.set(
      rowElement,
      `top: ${index * ROW_HEIGHT}px; height: ${ROW_HEIGHT}px;`,
      'style'
     )

     const keyElement = s.call(doc, 'createElement', 'div')
     s.set(keyElement, 'loupe-key', 'className')
     s.set(keyElement, key, 'textContent')
     s.call(rowElement, 'appendChild', keyElement)

     const valueElement = s.call(doc, 'createElement', 'div')
     s.set(valueElement, 'loupe-value', 'className')
     s.call(rowElement, 'appendChild', valueElement)
     const firstSegment = await s.call(look, 'get', key)
     updateValueElement(firstSegment, valueElement)

     // Add the row to the cache
     renderedRowCache.set(key, rowElement)
     renderedKeyQueue.push(key)

     // Remove oldest cache entry if we've exceeded 1000 items
     if (renderedKeyQueue.length > 1000) {
      const oldestKey = renderedKeyQueue.shift()
      renderedRowCache.delete(oldestKey)
     }

     return rowElement
    }

    function updateValueElement(segment, valueElement, isAppend = false) {
     if (!isAppend) {
      s.set(valueElement, '', 'innerHTML')
     }

     const valueTextElement = s.call(doc, 'createElement', 'span')
     s.set(valueTextElement, segment.value, 'textContent')
     s.call(valueElement, 'appendChild', valueTextElement)
     s.call(valueTextElement, 'scrollIntoView', { behavior: 'smooth' })

     // Remove existing "Load More" button if it exists
     const existingLoadMoreButton = s.call(
      valueElement,
      'querySelector',
      '.loupe-load-more'
     )
     if (existingLoadMoreButton) {
      s.call(valueElement, 'removeChild', existingLoadMoreButton)
     }

     if (segment.segment < segment.segmentCount - 1) {
      const loadMoreButton = s.call(doc, 'createElement', 'button')
      s.set(loadMoreButton, 'loupe-load-more', 'className')
      s.set(loadMoreButton, '...', 'textContent')
      s.call(loadMoreButton, 'addEventListener', 'click', () =>
       loadMore(segment, valueElement)
      )
      s.call(valueElement, 'appendChild', loadMoreButton)
     }
    }

    async function loadMore(segment, valueElement) {
     if (segment.segment < segment.segmentCount - 1) {
      const nextSegment = await segment.next()
      updateValueElement(nextSegment, valueElement, true)
     }
    }
    async function renderKeys() {
     s.set(contentContainer, '', 'innerHTML')
     const scrollTop = s.get(scrollContainer, 'scrollTop')
     const visibleStart = Math.floor(scrollTop / ROW_HEIGHT)
     const visibleEnd = Math.min(
      visibleStart + Math.ceil(400 / ROW_HEIGHT),
      totalKeys
     )

     for (let i = visibleStart; i < visibleEnd; i++) {
      const keyObject = keys[i]
      if (!keyObject) continue

      const rowElement = await createRowElement(keyObject, i)
      s.call(contentContainer, 'appendChild', rowElement)
     }
    }

    s.call(scrollContainer, 'addEventListener', 'scroll', () => {
     const scrollTop = s.get(scrollContainer, 'scrollTop')

     // Only update if the Y position has changed
     if (scrollTop !== lastScrollY) {
      lastScrollY = scrollTop
      renderKeys()

      const scrollHeight = s.get(scrollContainer, 'scrollHeight')
      const clientHeight = s.get(scrollContainer, 'clientHeight')

      if (
       scrollHeight - scrollTop <= clientHeight + 100 &&
       keys.length < totalKeys
      ) {
       refresh()
      }
     }
    })

    refresh()
   },
  })
 }
})
