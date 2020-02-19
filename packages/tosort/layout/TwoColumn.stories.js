/** @jsx jsx */
import { jsx, Styled, Box } from 'theme-ui'
import { text, paragraphs } from '@utilz/dummy'
import { TwoColumn } from './TwoColumn'

export default {
  title: 'common/TwoColumn',
}

const Content = () =>
  text(paragraphs(100, 150)).map(p => <Styled.p key={p.id} {...p} />)

export const withFoo = () => (
  <TwoColumn
    aside={
      <Box sx={{ width: '300px' }} as="aside">
        <Box>This is a menu</Box>
      </Box>
    }
    main={
      <Box as="main">
        <Content />
      </Box>
    }
  />
)
