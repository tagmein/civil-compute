globalThis.RSRC.get('main').resolve(async function () {
 const store = (await load('store'))(localStorage)
 const civil = await load('civil')
 const library = await load('library')
 return {
  run() {
   const sidebar = document.createElement('aside')
   sidebar.classList.add('sidebar')
   document.body.appendChild(sidebar)
   const content = document.createElement('main')
   content.setAttribute('tabindex', '0')
   content.classList.add('content')
   document.body.appendChild(content)
   const contentInput = document.createElement('input')
   const contentInsert = document.createElement('div')
   content.appendChild(contentInsert)
   content.addEventListener('focus', function () {
    content.appendChild(contentInput)
    contentInput.focus()
   })
   content.focus()
   const root = {
    ...library,
    content,
    document,
    sidebar,
    store,
   }
   const engine = civil.start(root)
   root.civil = engine
   function printValue(value) {
    const container = document.createElement('div')
    container.classList.add('result')
    const typeTag = document.createElement('div')
    typeTag.classList.add('tag')
    typeTag.textContent = typeof value
    const valueText = document.createElement('span')
    valueText.textContent = value
    container.appendChild(typeTag)
    container.appendChild(valueText)
    contentInsert.insertAdjacentElement('afterend', container)
    content.appendChild(contentInsert)
    content.appendChild(contentInput)
    contentInput.focus()
   }
   contentInput.setAttribute('name', 'content')
   contentInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
     try {
      const result = root.civil.submit(contentInput.value)
      root._ = result
      contentInput.value = ''
      printValue(result)
     } catch (e) {
      const message = document.createElement('div')
      message.classList.add('error-message')
      message.textContent = e.message
      console.error(e)
      contentInput.insertAdjacentElement('afterend', message)
      setTimeout(function () {
       message.classList.add('hide')
       setTimeout(function () {
        message.remove()
       }, 1000)
      }, 2500)
     }
    }
   })
  },
 }
})
