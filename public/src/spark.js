globalThis.RSRC.get('spark').resolve(async function () {
 let _t = 0
 const typeIds = {
  undefined: _t++,
  null: _t++,
  boolean: _t++,
  integer: _t++,
  decimal: _t++,
  string: _t++,
  reference: _t++,
 }
 const typeNames = Object.entries(typeIds)
  .sort(([_a, x], [_b, y]) => x - y)
  .map(([n]) => n)
 return {
  typeNames,
  typeIds,
  type: typeIds.undefined,
  setUndefined(s) {
   s.type = typeIds.undefined
  },
  setNull(s) {
   s.type = typeIds.null
  },
  setBoolean(s, value) {
   s.type = typeIds.boolean
   s.boolean = typeof value === 'boolean' ? value : Boolean(value)
  },
  setInteger(s, value) {
   s.type = typeIds.integer
   s.integer =
    typeof value === 'number' ? Math.floor(value) : parseInt(String(value), 10)
  },
  setDecimal(s, value) {
   s.type = typeIds.decimal
   s.decimal = typeof value === 'number' ? value : parseFloat(String(value), 10)
  },
  setString(s, value) {
   s.type = typeIds.string
   s.string = typeof value === 'string' ? value : String(value)
  },
  setReference(s, value) {
   if (value === null) {
    setNull()
    return
   } else if (value === undefined) {
    setUndefined()
    return
   }
   s.type = typeIds.reference
   s.reference = value
  },
  getBoolean(s) {
   if (typeof s.boolean === 'boolean') {
    return s.boolean
   }
   throw new Error('boolean not set')
  },
  getInteger(s) {
   if (typeof s.integer === 'number') {
    return s.integer
   }
   throw new Error('integer not set')
  },
  getDecimal(s) {
   if (typeof s.decimal === 'number') {
    return s.decimal
   }
   throw new Error('decimal not set')
  },
  getString(s) {
   if (typeof s.string === 'string') {
    return s.string
   }
   throw new Error('string not set')
  },
  getReference(s) {
   if (s.reference !== undefined) {
    return s.reference
   }
   throw new Error('reference not set')
  },
  call(s, name, ...args) {
   if (typeof s[name] !== 'function') {
    throw new Error(`${JSON.stringify(name)} is not a function`)
   }
   return s[name](...args)
  },
  get(s, ...path) {
   let c = s
   for (const p of path) {
    if (c === undefined || c === null) {
     throw new Error(
      `cannot read property ${JSON.stringify(p)} of ${
       c === null ? 'null' : 'undefined'
      }`
     )
    }
    c = c[p]
   }
   return c
  },
  set(s, value, ...path) {
   let c = s
   const lastP = path.pop()
   for (const p of path) {
    if (c === undefined || c === null) {
     throw new Error(
      `cannot read property ${JSON.stringify(p)} of ${
       c === null ? 'null' : 'undefined'
      }`
     )
    }
    c = c[p]
   }
   if (c === undefined || c === null) {
    throw new Error(
     `cannot set property ${JSON.stringify(lastP)} of ${
      c === null ? 'null' : 'undefined'
     }`
    )
   }
   c[lastP] = value
  },
 }
})
