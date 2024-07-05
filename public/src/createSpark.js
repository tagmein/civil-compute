globalThis.RSRC.get('createSpark').resolve(async function () {
 const s = await load('spark')
 return function createSpark(doc, config) {
  const container = s.call(doc, 'createElement', 'article')
  const containerClassList = s.get(container, 'classList')
  s.call(containerClassList, 'add', 'spark-container')
  s.call(containerClassList, 'add', 'new')
  const control = s.call(doc, 'createElement', 'div')
  const controlClassList = s.get(control, 'classList')
  s.call(controlClassList, 'add', 'spark-control')
  const main = s.call(doc, 'createElement', 'main')
  const mainClassList = s.get(main, 'classList')
  s.call(mainClassList, 'add', 'spark-main')
  s.call(container, 'appendChild', control)
  s.call(container, 'appendChild', main)
  for (const item of config.menu ?? []) {
   const itemContainer = s.call(doc, 'createElement', 'label')
   s.set(itemContainer, item.label, 'textContent')
   s.call(itemContainer, 'addEventListener', 'click', item.action)
   s.call(control, 'appendChild', itemContainer)
  }
  if (config.content) {
   config.content(main)
  }
  return { container, control, main }
 }
})
