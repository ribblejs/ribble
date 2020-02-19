import { useState, useEffect } from 'react'
import { depths, nested } from '../headings'

export const isHighlighted = (bottomRange = 0, topRange = 100) => ({
  heading,
}) => {
  if (!heading || !heading.element) {
    return false
  }

  const { top } = heading.element.getBoundingClientRect()
  if (!top) {
    return false
  }

  return top >= bottomRange && top <= topRange
}

const defaultIsHighlighted = isHighlighted(-5, 100)

const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)

export const getHeadings = (
  startLevel,
  endLevel,
  anchorClassName = 'anchor',
) => () => {
  if (startLevel < 1 || startLevel > 6) {
    throw new Error('Start range expected to be in the range one to six.')
  }

  if (endLevel < 1 || endLevel > 6) {
    throw new Error('End range expected to be in the range one to six.')
  }

  if (endLevel < startLevel) {
    throw new Error(
      'End range expected to be equal or greater than start range.',
    )
  }

  const validHeadings = range(startLevel, endLevel).map(l => `h${l}`)

  const anchors = document.getElementsByClassName(anchorClassName)
  const anchorArray = [...anchors]

  return anchorArray
    .map(anchor => {
      const heading = anchor.parentNode
      const tagName = heading.tagName.toLowerCase()

      if (!validHeadings.includes(tagName)) {
        return null
      }

      const level = Number(tagName.replace('h', ''))

      const { href, text } = anchor
      const anchorValue = decodeURIComponent(
        href.substring(href.indexOf('#') + 1),
      )

      return {
        id: anchorValue,
        title: text,
        level,
        element: anchor,
      }
    })
    .filter(h => h)
}

// headers is a collection of
// [ { id, title, level, element } ]
export const HighlightMenu = ({
  getHeadings,
  render,
  isHighlighted = defaultIsHighlighted,
}) => {
  const [lastHighlightedId, setLastHighlightedId] = useState(undefined)
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    const headers = getHeadings()
    setHeadings(headers)

    const updateHeadings = () => {
      headers.forEach(heading => {
        const highlighted = isHighlighted({ heading })

        if (highlighted) {
          setLastHighlightedId(heading.id)
        }
      })
    }

    window.addEventListener('scroll', updateHeadings)
    window.addEventListener('resize', updateHeadings)

    updateHeadings()

    return () => {
      window.removeEventListener('scroll', updateHeadings)
      window.removeEventListener('resize', updateHeadings)
    }
  }, [getHeadings, isHighlighted, lastHighlightedId])

  const highlightedHeadings = headings.map(h => ({
    ...h,
    isHighlighted: lastHighlightedId ? h.id === lastHighlightedId : false,
  }))

  return render({ headings: nested(depths(highlightedHeadings)) })
}
