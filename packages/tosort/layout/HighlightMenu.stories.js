/** @jsx jsx */
import { HighlightMenu, getHeadings, isHighlighted } from './HighlightMenu'
import { Heading } from '~/headings/Heading'
import { Box } from '@theme-ui/components'
import { jsx, Styled } from 'theme-ui'
import { LoremIpsum } from 'lorem-ipsum'

export default {
  title: 'chrome/HighlightMenu',
}

const lorem = new LoremIpsum()

const paragraphs = num => {
  return new Array(num)
    .fill(0)
    .map(_ => lorem.generateSentences(5))
    .map((s, i) => <Styled.p key={i}>{s}</Styled.p>)
}

const MenuItem = ({ id, title, isHighlighted, children }) => (
  <li>
    <Styled.a
      href={`#${id}`}
      sx={{
        '&': {
          textDecoration: 'none',
          color: isHighlighted ? '#c0c' : 'text',
        },
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {title}
    </Styled.a>
    {children && children.length ? <Menu headings={children} /> : null}
  </li>
)

const Menu = ({ headings }) => (
  <ul>
    {headings.map(h => (
      <MenuItem
        key={h.id}
        id={h.id}
        title={h.title}
        isHighlighted={h.isHighlighted}
        children={h.children}
      />
    ))}
  </ul>
)

const HighlightMenuExample = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem' }}>
      <Box sx={{ width: '200px', position: 'fixed' }}>
        <HighlightMenu
          getHeadings={getHeadings(1, 6)}
          render={({ headings }) => <Menu headings={headings} />}
          isHighlighted={isHighlighted(-5, 400)}
        />
      </Box>
      <Box sx={{ ml: '200px' }}>
        <Heading title="Heading One" />
        {paragraphs(5)}
        <Heading as="h2" title="Heading One One" />
        {paragraphs(2)}
        <Heading as="h2" title="Heading One Two" />
        {paragraphs(2)}
        <Heading as="h3" title="Heading One Two One" />
        {paragraphs(5)}
        <Heading as="h2" title="Heading One Three" />
        {paragraphs(7)}
        <Heading title="Heading Two" />
        {paragraphs(5)}
      </Box>
    </Box>
  )
}

export const Default = () => <HighlightMenuExample />
