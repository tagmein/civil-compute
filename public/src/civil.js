globalThis.LOAD['civil'].resolve(async function ({ load }) {
 const { parse, wordType } = await load('parse')
 return {
  start(root) {
   function run(code) {
    let focus = root
    let args = []
    for (const line of code) {
     for (const word of line) {
      const type = word[0]
      const name = word.substring(1)
      switch (type) {
       case wordType.NORMAL:
        console.log(word, focus, args, name)
        if (typeof focus === 'function') {
         if (word.length > 0 && /^-?\d*(\.\d*)?$/.test(name)) {
          args.push(parseFloat(name))
         } else {
          args.push(root[name])
         }
        } else {
         if (typeof focus !== 'object') {
          throw new Error(`cannot read '${name}'`)
         }
         focus = focus[name]
        }
        break
       case wordType.LITERAL:
        args.push(name)
        break
       case wordType.QUOTE:
        throw new Error('not implemented')
        break
       case wordType.SPACE:
        throw new Error('not implemented')
        break
       case wordType.ESCAPE:
        throw new Error('not implemented')
        break
      }
     }
     if (typeof focus === 'function') {
      focus = focus(...args)
      args = []
     }
    }
    return focus
   }
   function submit(input) {
    return run(parse(input))
   }
   const civil = { parse, root, run, submit, wordType }
   return civil
  },
 }
})
