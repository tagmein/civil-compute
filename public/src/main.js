globalThis.RSRC.get('main').resolve(async function () {
 const spark = await load('spark')
 async function run() {
  const home = spark(globalThis)
  const doc = spark(home.get('document'))
  const main = spark(doc.call('createElement', 'main'))
  const body = spark(doc.get('body'))
  body.call('appendChild', main.context)
  const mainClassList = spark(main.get('classList'))
  mainClassList.call('add', 'spark')

  const style = spark(doc.call('createElement', 'style'))
  style.set(
   `
.spark {
 box-shadow: inset 0 0 2px 2px #fffff080;
 flex-grow: 1;
}
   `,
   'textContent'
  )
  const head = spark(doc.get('head'))
  head.call('appendChild', style.context)
 }
 return { run }
})
