globalThis.RSRC.get('main').resolve(async function () {
 const s = await load('spark')
 function createSpark(doc, config) {
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
  return { container, control, main }
 }
 async function run() {
  const doc = s.get(globalThis, 'document')
  const body = s.get(doc, 'body')
  const style = s.call(doc, 'createElement', 'style')
  s.set(
   style,
   `
.spark-container {
 background: #80808040;
 border-radius: 4px;
 box-shadow: inset 0 0 1px 1px #fffff080, 0 0 25px #fffff040;
 display: flex;
 flex-direction: column;
 height: 480px;
 max-height: calc(100dvh - 40px);
 min-height: calc(50dvh - 30px);
 transition: filter 1s ease-out, opacity 0.1s linear;
 filter: brightness(1);
 opacity: 1;
}

.spark-container.new {
 filter: brightness(2);
 opacity: 0;
}

.spark-control {
 background: #fffff020;
 border-top-left-radius: 4px;
 border-top-right-radius: 4px;
 box-shadow: inset 0 0 1px 1px #ffffff00;
 box-sizing: border-box;
 display: flex;
 flex-direction: row;
 height: 25px;
 opacity: 0.85;
 overflow: auto;
 position: relative;
 transition: box-shadow 0.1s linear, opacity 0.1s linear;
}

.spark-control:hover {
 box-shadow: inset 0 0 1px 1px #fffff040;
 opacity: 1;
}

.spark-control > label {
 background: #00000040;
 border-radius: 4px;
 box-shadow: 0 0 2px #000;
 cursor: pointer;
 font-size: 13px;
 line-height: 8px;
 margin: 4px 4px 3px;
 padding: 4px 4px 0;
 transition: background-color 0.1s linear;
 white-space: nowrap;
}

.spark-control > label:hover {
 background: #80808020;
}

.spark-control > label:active {
 background: #00000080;
}

.spark-main {
 box-shadow: inset 0 0 4px #00000040;
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 overflow: auto;
}
   `,
   'textContent'
  )
  const head = s.get(doc, 'head')
  s.call(head, 'appendChild', style)

  function attachSpark(config) {
   const spark = createSpark(doc, config)
   s.call(body, 'appendChild', spark.container)
   const container = s.get(spark, 'container')
   s.call(container, 'scrollIntoView', { behavior: 'smooth' })
   const containerClassList = s.get(container, 'classList')
   setTimeout(function () {
    s.call(containerClassList, 'remove', 'new')
   })
   return spark
  }

  attachSpark({
   menu: [
    {
     label: 'Source',
     action() {
      const sourceSelect = attachSpark({
       menu: [
        {
         label: 'Close',
         action() {
          s.call(body, 'removeChild', sourceSelect.container)
         },
        },
       ],
      })
     },
    },
   ],
  })
 }

 return { run }
})
