/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { HeaderFooter } from './HeaderFooter'
import { text, paragraphs } from '@utilz/dummy'

export default {
  title: 'common/HeaderFooter',
}

const Content = () =>
  text(paragraphs(100, 150)).map(p => <Styled.p key={p.id} {...p} />)

export const withFoo = () => (
  <HeaderFooter
    header={<p sx={{ backgroundColor: '#ccc', color: '#fff' }}>Header</p>}
    headerHeight="2rem"
    main={<Content />}
    footer={<p sx={{ backgroundColor: '#333', color: '#fff' }}>Footer</p>}
  />
)
