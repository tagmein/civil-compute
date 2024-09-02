globalThis.LOAD['store'].resolve(async function ({ load }) {
 return function (adapter) {
  const s = {
   delete(k) {
    localStorage.removeItem(k)
   },
   ensureArrayItem(k, v) {
    const existing = s.getArray(k)
    if (!existing.includes(v)) {
     existing.push(v)
     s.setArray(k, existing)
    }
   },
   removeArrayItem(k, v) {
    const existing = s.getArray(k)
    const position = existing.indexOf(v)
    if (position !== -1) {
     existing.splice(position, 1)
     if (existing.length > 0) {
      s.setArray(k, existing)
     } else {
      s.delete(k)
     }
    }
    return existing
   },
   get(k) {
    const v = adapter.getItem(k)
    if (typeof v !== 'string') {
     return {}
    }
    try {
     const x = JSON.parse(v)
     return x
    } catch (e) {
     return
    }
   },
   set(k, v) {
    adapter.setItem(k, JSON.stringify(v))
   },
   setArray(k, v) {
    if (!Array.isArray(v)) {
     throw new Error('must be an array')
    }
    adapter.setItem(k, JSON.stringify(v))
   },
   setObject(k, v) {
    if (typeof v !== 'object') {
     throw new Error('must be an object')
    }
    adapter.setItem(k, JSON.stringify(v))
   },
   getObject(k) {
    const v = adapter.getItem(k)
    if (typeof v !== 'string') {
     return {}
    }
    try {
     const x = JSON.parse(v)
     if (typeof x !== 'object') {
      return {}
     }
     return x
    } catch (e) {
     return {}
    }
   },
   getArray(k) {
    const v = adapter.getItem(k)
    if (typeof v !== 'string') {
     return []
    }
    try {
     const x = JSON.parse(v)
     return Array.isArray(x) ? x : [x]
    } catch (e) {
     return []
    }
   },
  }
  return s
 }
})
