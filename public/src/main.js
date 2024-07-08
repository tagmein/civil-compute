globalThis.RSRC.get('main').resolve(async function () {
 const s = await load('spark')
 const createSpark = await load('createSpark')
 const sourceSelect = await load('sourceSelect')

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
 flex-shrink: 0;
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

  function detachSpark(spark) {
   s.call(body, 'removeChild', spark.container)
  }

  sourceSelect({ attachSpark, detachSpark, doc })
 }

 return { run }
})
