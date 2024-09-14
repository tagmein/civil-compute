globalThis.LOAD['components/text'].resolve(async function ({ load }) {
 return (text, options) => {
  const element = document.createElement('span')
  element.textContent = text
  element.classList.add('--components-text--container')
  if (options?.auto) {
   element.classList.add('--components-text--auto')
  }
  function autoSize(viewport) {
   function computedStyle(el, k) {
    return getComputedStyle(el).getPropertyValue(k)
   }
   function measure() {
    let fontSize = computedStyle(element, 'font-size')
    if (fontSize === '') {
     fontSize = computedStyle(document.body, 'font-size')
    }
    if (fontSize === '') {
     fontSize = '16px'
    }
    const unitPlace =
     1 +
     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((a, n) => {
      const index = fontSize.lastIndexOf(n.toString(10))
      return Math.max(a, index)
     }, 0)
    const currentFontSizeUnit = fontSize.slice(unitPlace)
    if (currentFontSizeUnit !== 'px') {
     console.warn('autosize: font size must be in px, got', fontSize)
     return
    }
    const currentFontSize = parseFloat(fontSize.slice(0, unitPlace))
    const currentSize = element.getBoundingClientRect()
    const currentViewportSize = viewport.element.getBoundingClientRect()
    const currentPaddingLeft = parseFloat(
     computedStyle(viewport.element, 'padding-left')
    )
    const currentPaddingRight = parseFloat(
     computedStyle(viewport.element, 'padding-right')
    )
    const fillX =
     (currentViewportSize.width - currentPaddingLeft - currentPaddingRight) /
     currentSize.width
    const currentPaddingTop = parseFloat(
     computedStyle(viewport.element, 'padding-top')
    )
    const currentPaddingBottom = parseFloat(
     computedStyle(viewport.element, 'padding-bottom')
    )
    const fillY =
     (currentViewportSize.height - currentPaddingTop - currentPaddingBottom) /
     currentSize.height
    const scale = Math.min(fillX, fillY)
    element.style.fontSize = `${scale * currentFontSize}${currentFontSizeUnit}`
    element.style.transform = `scale(${1 / scale})`
    setTimeout(function () {
     element.style.transition = `transform 0.25s ease-out`
     element.style.transform = `scale(1)`
    }, 120)
   }
   setTimeout(measure, 100)
  }
  return { element, autoSize }
 }
})
