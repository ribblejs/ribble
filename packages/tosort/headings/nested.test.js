import nested from './nested'

describe('nested', () => {
  it('should throw on undefined', () => {
    expect(() => nested()).toThrow(
      'Expected array of items with depth property.'
    )
  })

  it('should throw on null', () => {
    expect(() => nested(null)).toThrow(
      'Expected array of items with depth property.'
    )
  })

  it('should throw on non array', () => {
    expect(() => nested(true)).toThrow(
      'Expected array of items with depth property.'
    )
  })

  it('should return empty array for empty items', () => {
    expect(nested([])).toEqual([])
  })

  it('should throw if first item does not have depth of zero', () => {
    expect(() => nested([{ depth: 1 }])).toThrow(
      'Expected first item with a zero depth.'
    )
  })

  it('should throw with any missing depth property', () => {
    expect(() => nested([{ depth: 0 }, {}])).toThrow(
      'All items must have a depth property.'
    )
  })

  it('should throw with any depth less than zero', () => {
    expect(() => nested([{ depth: 0 }, { depth: -1 }])).toThrow(
      'All items must have a depth of zero or greater.'
    )
  })

  it('should return nested result', () => {
    const headings = [0, 0, 1, 2, 3, 1, 2, 0].map(d => ({
      title: `heading ${d}`,
      depth: d,
    }))

    expect(nested(headings)).toEqual([
      {
        title: 'heading 0',
        depth: 0,
        children: [],
      },
      {
        title: 'heading 0',
        depth: 0,
        children: [
          {
            title: 'heading 1',
            depth: 1,
            children: [
              {
                title: 'heading 2',
                depth: 2,
                children: [
                  {
                    title: 'heading 3',
                    depth: 3,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            title: 'heading 1',
            depth: 1,
            children: [
              {
                title: 'heading 2',
                depth: 2,
                children: [],
              },
            ],
          },
        ],
      },
      {
        title: 'heading 0',
        depth: 0,
        children: [],
      },
    ])
  })
})
