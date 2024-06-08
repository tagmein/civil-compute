globalThis.RSRC.get('parse').resolve(async function () {
 function parse(source, exact) {
  const BREAK = '\n'
  const ESCAPE = '\\'
  const QUOTE = "'"
  const SPACE = ' '
  const code = []
  const line = []
  let word = ''
  const state = {
   inEscape: false,
   inString: false,
  }
  function pushWord(type, char) {
   if (word.length || state.inString) {
    const prefix = state.inString ? wordType.LITERAL : wordType.NORMAL
    line.push(prefix + word)
   }
   if (exact && type && char) {
    const lastWord = line[line.length - 1]
    const lastType = lastWord?.[0]
    if (lastType === type) {
     line[line.length - 1] = lastWord + char
    } else {
     line.push(type + char)
    }
   }
   word = ''
  }
  function pushLine(char) {
   pushWord(char)
   if (line.length > 0 || exact) {
    code.push(line.splice(0))
   }
  }
  for (let i = 0; i < source.length; i++) {
   const char = source[i]
   if (state.inEscape) {
    if (char === '\n') {
     if (exact) {
      pushWord(wordType.SPACE, '\\\n')
     }
    } else if (exact) {
     word += ESCAPE + char
    } else {
     word += char === 'n' ? '\n' : ESCAPE + char
    }
    state.inEscape = false
   } else {
    switch (char) {
     case BREAK:
      if (state.inString) {
       word += char
      } else {
       pushLine(wordType.SPACE, char)
      }
      break
     case ESCAPE:
      state.inEscape = true
      break
     case QUOTE:
      pushWord(wordType.QUOTE, char)
      state.inString = !state.inString
      break
     case SPACE:
      if (state.inString) {
       word += char
      } else {
       pushWord(wordType.SPACE, char)
      }
      break
     default:
      word += char
    }
   }
  }
  pushLine()
  return code
 }

 const wordType = {
  NORMAL: '0',
  LITERAL: '1',
  QUOTE: '2',
  SPACE: '3',
  ESCAPE: '4',
 }

 return { parse, wordType }
})
