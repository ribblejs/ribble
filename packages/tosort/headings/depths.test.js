import depths from './depths'

describe('heading depths', () => {
  it('should throw on undefined', () => {
    expect(() => depths()).toThrow(
      'Expected array of items with level property.'
    )
  })

  it('should throw on null', () => {
    expect(() => depths(null)).toThrow(
      'Expected array of items with level property.'
    )
  })

  it('should throw on non array', () => {
    expect(() => depths(true)).toThrow(
      'Expected array of items with level property.'
    )
  })

  it('should return empty array for empty array', () => {
    expect(depths([])).toEqual([])
  })

  it('should throw with any missing level property', () => {
    expect(() => depths([{ level: 0 }, {}])).toThrow(
      'All items must have a level property.'
    )
  })

  it('should throw with any level less than zero', () => {
    expect(() => depths([{ level: 0 }, { level: -1 }])).toThrow(
      'All items must have a level of zero or greater.'
    )
  })

  it('should return depth of 0 for single level', () => {
    expect(depths([{ level: 6 }])).toEqual([{ level: 6, depth: 0 }])
  })

  it('should return expected depths for nested levels', () => {
    const headingLevels = [6, 1, 2, 3, 6, 2, 6, 1].map(l => ({
      level: l,
    }))

    expect(depths(headingLevels).map(i => i.depth)).toEqual([
      0,
      0,
      1,
      2,
      3,
      1,
      2,
      0,
    ])
  })
})
