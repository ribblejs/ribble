const getSiblingIndex = (items, index) => {
  if (index <= 0) {
    return 0
  }

  for (let i = index - 1; i > 0; i--) {
    if (items[i].level <= items[index].level) {
      return i
    }
  }

  return 0
}

export const depths = items => {
  if (!Array.isArray(items)) {
    throw new Error('Expected array of items with level property.')
  }

  if (items.length === 0) {
    return []
  }

  if (items.some(i => !i.hasOwnProperty('level'))) {
    throw new Error('All items must have a level property.')
  }

  if (items.some(i => i.level < 0)) {
    throw new Error('All items must have a level of zero or greater.')
  }

  let currentDepth = 0
  const depths = []

  for (let index = 0; index < items.length; index++) {
    const item = items[index]

    if (index === 0) {
      currentDepth = 0
    } else if (items[index - 1].level < item.level) {
      currentDepth += 1
    } else {
      currentDepth = depths[getSiblingIndex(items, index)].depth
    }

    depths.push({
      ...item,
      depth: currentDepth,
    })
  }

  return depths
}
