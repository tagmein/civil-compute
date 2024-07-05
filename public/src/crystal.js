globalThis.RSRC.get('crystal').resolve(async function () {
 const keyDirectory = await load('keyDirectory')
 return function crystal({ base, segmentSize = 64 }) {
  const keys = keyDirectory(base)
  const c = {
   keys,
   async deleteSegment(_key, offset = 0) {
    const key = `k=${_key};s=${offset.toString(10)}`
    await base.removeItem(key)
   },
   async deleteSegments(from, to) {
    const promises = []
    if (typeof from !== 'number' || typeof to !== 'number' || from > to) {
     throw new Error(`expecting ${from} <= ${to}`)
    }
    for (let i = from; i <= to; i++) {
     promises.push(c.deleteSegment(_key, i))
    }
    await Promise.all(promises)
   },
   async deleteSegmentCount(_key) {
    const key = `k=${_key};sc`
    await base.removeItem(key)
   },
   async getSegmentCount(_key) {
    const key = `k=${_key};sc`
    const stringCount = await base.getItem(key)
    if (typeof stringCount !== 'string') {
     return undefined
    }
    const intCount = parseInt(stringCount, 10)
    if (isNaN(intCount)) {
     return undefined
    }
    return intCount
   },
   async setSegmentCount(_key, count) {
    const key = `k=${_key};sc`
    await base.setItem(key, count.toString(10))
   },
   async getSegment(_key, offset = 0) {
    const key = `k=${_key};s=${offset.toString(10)}`
    return base.getItem(key)
   },
   async setSegment(_key, value, offset) {
    if (typeof offset !== 'number') {
     throw new Error(`expecting number offset, got ${typeof offset}`)
    }
    const key = `k=${_key};s=${offset.toString(10)}`
    if (value.length > segmentSize) {
     throw new Error(
      `Cannot set segment of size ${value.length} (limit ${segmentSize})`
     )
    }
    await base.setItem(key, value)
   },
   async deleteRaw(_key) {
    const segmentCount = await this.getSegmentCount(_key)
    if (typeof segmentCount !== 'number') {
     return
    }
    await Promise.all([
     c.deleteSegments(_key, 0, segmentCount - 1),
     c.deleteSegmentCount(_key),
    ])
   },
   async getRaw(_key) {
    const segmentCount = await this.getSegmentCount(_key)
    if (typeof segmentCount !== 'number') {
     return
    }
    function getNext(offset) {
     return async function () {
      if (offset < segmentCount) {
       return {
        segment: offset,
        segmentCount,
        value: await c.getSegment(_key, offset),
        next: getNext(offset + 1),
       }
      }
     }
    }
    return getNext(0)()
   },
   async setRaw(_key, value) {
    const segmentCount = Math.ceil(value.length / segmentSize)
    const promises = []
    for (let i = 0; i < segmentCount; i++) {
     const offset = i * segmentSize
     const segment = value.substring(offset, offset + segmentSize)
     promises.push(c.setSegment(_key, segment, i))
    }
    const existingSegmentCount = await c.getSegmentCount(_key)
    if (
     typeof existingSegmentCount === 'number' &&
     existingSegmentCount > segmentCount
    ) {
     promises.push(
      c.deleteSegments(_key, segmentCount, existingSegmentCount - 1)
     )
    }
    promises.push(c.setSegmentCount(_key, segmentCount))
    await Promise.all(promises)
   },
   async set(_key, value) {
    const existingIndex = await c.keys.lookupKey(_key)
    if (existingIndex !== undefined) {
     // Key already exists, update the existing entry
     const virtualKey = existingIndex.toString(36)
     await c.setRaw(virtualKey, value)
    } else {
     // New key, insert it
     const keyCount = await c.keys.getKeyCount()
     const virtualKey = keyCount.toString(36)
     await Promise.all([
      c.keys.insertKey(_key, keyCount),
      c.setRaw(virtualKey, value),
     ])
    }
   },
   async get(_key) {
    const index = await c.keys.lookupKey(_key)
    console.log({ _key, index })
    if (index === undefined) {
     return undefined
    }
    const virtualKey = index.toString(36)
    return c.getRaw(virtualKey)
   },
   async delete(_key) {
    const index = await c.keys.lookupKey(_key)
    if (index === undefined) {
     return
    }
    const virtualKey = index.toString(36)
    await Promise.all([c.deleteRaw(virtualKey), c.keys.deleteKey(_key)])
   },
  }
  return c
 }
})
