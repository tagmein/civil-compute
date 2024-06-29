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
 return function spark(context) {
  const created = Date.now()
  function setUndefined() {
   s.type = typeIds.undefined
  }
  function setNull() {
   s.type = typeIds.null
  }
  function setBoolean(value) {
   s.type = typeIds.boolean
   s.boolean = typeof value === 'boolean' ? value : Boolean(value)
  }
  function setInteger(value) {
   s.type = typeIds.integer
   s.integer =
    typeof value === 'number' ? Math.floor(value) : parseInt(String(value), 10)
  }
  function setDecimal(value) {
   s.type = typeIds.decimal
   s.decimal = typeof value === 'number' ? value : parseFloat(String(value), 10)
  }
  function setString(value) {
   s.type = typeIds.string
   s.string = typeof value === 'string' ? value : String(value)
  }
  function setReference(value) {
   if (value === null) {
    setNull()
    return
   } else if (value === undefined) {
    setUndefined()
    return
   }
   s.type = typeIds.reference
   s.reference = value
  }
  function getBoolean() {
   if (typeof s.boolean === 'boolean') {
    return s.boolean
   }
   throw new Error('boolean not set')
  }
  function getInteger() {
   if (typeof s.integer === 'number') {
    return s.integer
   }
   throw new Error('integer not set')
  }
  function getDecimal() {
   if (typeof s.decimal === 'number') {
    return s.decimal
   }
   throw new Error('decimal not set')
  }
  function getString() {
   if (typeof s.string === 'string') {
    return s.string
   }
   throw new Error('string not set')
  }
  function getReference() {
   if (s.reference !== undefined) {
    return s.reference
   }
   throw new Error('reference not set')
  }
  function call(name, ...args) {
   if (typeof context[name] !== 'function') {
    throw new Error(`${JSON.stringify(name)} is not a function`)
   }
   return context[name](...args)
  }
  function get(...path) {
   let c = context
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
  }
  function set(value, ...path) {
   let c = context
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
  }
  const s = {
   // main
   context,
   created,
   typeNames,
   typeIds,
   type: typeIds.undefined,
   // functions
   call,
   get,
   set,
   // values
   boolean: undefined,
   integer: undefined,
   decimal: undefined,
   string: undefined,
   reference: undefined,
   // setters
   setUndefined,
   setNull,
   setBoolean,
   setInteger,
   setDecimal,
   setString,
   setReference,
   // getters
   getBoolean,
   getInteger,
   getDecimal,
   getString,
   getReference,
  }
  return s
 }
})
