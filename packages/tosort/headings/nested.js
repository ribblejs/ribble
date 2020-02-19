export const nested = items => {
  if (!Array.isArray(items)) {
    throw new Error('Expected array of items with depth property.')
  }

  if (items.length === 0) {
    return []
  }

  if (items[0].depth !== 0) {
    throw new Error('Expected first item with a zero depth.')
  }

  if (items.some(i => !i.hasOwnProperty('depth'))) {
    throw new Error('All items must have a depth property.')
  }

  if (items.some(i => i.depth < 0)) {
    throw new Error('All items must have a depth of zero or greater.')
  }

  const result = []
  const levels = [{ children: result }]

  items.forEach(item => {
    levels[item.depth].children = levels[item.depth].children || []
    levels[item.depth].children.push(
      (levels[item.depth + 1] = { ...item, children: [] }),
    )
  })

  return result
}
