globalThis.RSRC.get('keyDirectory').resolve(async function () {
 return function (base) {
  const KD_ROOT = 'kd;'
  const KD_EXT_PREFIX = 'kd;x='

  async function getNode(path) {
   const data = await base.getItem(path)
   return data ? JSON.parse(data) : { cl: 0, ca: 0 }
  }

  async function setNode(path, node) {
   await base.setItem(path, JSON.stringify(node))
  }

  async function insertKey(key, index) {
   let path = KD_ROOT
   let node = await getNode(path)

   for (let i = 0; i < key.length; i += 2) {
    const chunk = key.substring(i, i + 2)
    node.ca++ // Increment total count for this node
    await setNode(path, node)

    if (i + 2 >= key.length) {
     // This is the last chunk (1 or 2 characters)
     if (!node['k' + chunk]) {
      node.cl++ // Increment level count for this node
     }
     node['k' + chunk] = index
     await setNode(path, node)
     return
    } else {
     // Not the last chunk, continue traversing or create new node
     if (!node['x' + chunk]) {
      const newExtIndex = await getNextExtIndex()
      node['x' + chunk] = newExtIndex
      await setNode(path, node)
      path = KD_EXT_PREFIX + newExtIndex
      node = { cl: 0, ca: 0 }
     } else {
      path = KD_EXT_PREFIX + node['x' + chunk]
      node = await getNode(path)
     }
    }
   }

   // This should never be reached for non-empty keys
   if (!node['k']) {
    node.cl++ // Increment level count for this node
   }
   node['k'] = index
   node.ca++ // Increment total count for this node
   await setNode(path, node)
  }

  async function lookupKey(key) {
   let path = KD_ROOT
   let node = await getNode(path)

   for (let i = 0; i < key.length; i += 2) {
    const chunk = key.substr(i, 2)

    if (i + 2 >= key.length) {
     // This is the last chunk (1 or 2 characters)
     if (chunk.length === 1) {
      return node['k' + chunk]
     } else {
      // Check for 'k' entry first, then 'x' entry
      if ('k' + chunk in node) {
       return node['k' + chunk]
      } else if ('x' + chunk in node) {
       path = KD_EXT_PREFIX + node['x' + chunk]
       node = await getNode(path)
       return node['k']
      } else {
       return undefined
      }
     }
    } else {
     // Not the last chunk, continue traversing
     if (!('x' + chunk in node)) {
      return undefined
     }
     path = KD_EXT_PREFIX + node['x' + chunk]
     node = await getNode(path)
    }
   }

   return undefined // This line should never be reached for valid keys
  }

  async function deleteKey(key) {
   const path = []
   let currentPath = KD_ROOT
   let node = await getNode(currentPath)

   for (let i = 0; i < key.length; i += 2) {
    const chunk = key.substring(i, i + 2)
    path.push({ nodePath: currentPath, node, chunk })

    if (chunk.length === 1) {
     if ('k' + chunk in node) {
      delete node['k' + chunk]
      node.cl--
      node.ca--
      await setNode(currentPath, node)
      await updateCountsUpwards(path.slice(0, -1))
      return true
     }
     return false
    } else {
     if (!('x' + chunk in node)) return false
     currentPath = KD_EXT_PREFIX + node['x' + chunk]
     node = await getNode(currentPath)
    }
   }

   if ('k' in node) {
    delete node['k']
    node.cl--
    node.ca--
    await setNode(currentPath, node)

    // Clean up empty nodes and update counts
    for (let i = path.length - 1; i >= 0; i--) {
     const { nodePath, node, chunk } = path[i]
     const childNode = await getNode(KD_EXT_PREFIX + node['x' + chunk])
     if (childNode.ca === 0) {
      delete node['x' + chunk]
      node.ca--
      await setNode(nodePath, node)
     } else {
      node.ca--
      await setNode(nodePath, node)
      break
     }
    }

    return true
   }

   return false
  }

  async function updateCountsUpwards(path) {
   for (const { nodePath, node } of path) {
    node.ca--
    await setNode(nodePath, node)
   }
  }

  async function listKeys() {
   const keys = []
   await traverseKeys(KD_ROOT, '', keys)
   return keys
  }

  async function traverseKeys(path, prefix, keys) {
   const node = await getNode(path)

   for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('k')) {
     keys.push({ key: prefix + key.substring(1), index: value })
    } else if (key.startsWith('x')) {
     await traverseKeys(KD_EXT_PREFIX + value, prefix + key.substring(1), keys)
    }
   }
  }

  async function getNextExtIndex() {
   const currentIndex = parseInt((await base.getItem('kd;next_ext')) || '0', 10)
   await base.setItem('kd;next_ext', (currentIndex + 1).toString())
   return currentIndex
  }

  async function getKeyCount() {
   const rootNode = await getNode(KD_ROOT)
   return rootNode.ca
  }

  async function getStats(path = KD_ROOT) {
   const node = await getNode(path)
   const stats = {
    keysAtThisLevel: node.cl,
    totalKeys: node.ca,
    children: [],
   }

   for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('x')) {
     const childPath = KD_EXT_PREFIX + value
     const childStats = await getStats(childPath)
     stats.children.push({
      prefix: key.substring(1),
      ...childStats,
     })
    }
   }

   return stats
  }

  return {
   insertKey,
   deleteKey,
   listKeys,
   getKeyCount,
   getStats,
   lookupKey,
  }
 }
})
