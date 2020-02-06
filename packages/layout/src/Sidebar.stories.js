/** @jsx jsx */
import { jsx, Styled, Box } from 'theme-ui'
import { Sidebar } from './Sidebar'
import { textReact, paragraphs } from '@utilz/dummy'

export default {
  title: 'Sidebar',
}

const Padded = ({ title, children, color }) => (
  <Box sx={{ p: 3, backgroundColor: color, height: '100%' }}>
    <Styled.h1>{title}</Styled.h1>
    {children}
  </Box>
)

const defaultProps = {
  sidebarWidth: '20rem',
  sidebar: (
    <Padded title="Sidebar" color="#eee">
      {textReact(paragraphs(20, 50)).map(p => (
        <Styled.p {...p} />
      ))}
    </Padded>
  ),
  main: (
    <Padded title="Main" color="#e0e0e0">
      {textReact(paragraphs(100, 150)).map(p => (
        <Styled.p {...p} />
      ))}
    </Padded>
  ),
}

export const withLeftSidebar = () => <Sidebar {...defaultProps} />

export const withRightSidebar = () => <Sidebar {...defaultProps} side="right" />

export const withNumericGap = () => <Sidebar {...defaultProps} gap={3} />

export const withStringGap = () => <Sidebar {...defaultProps} gap="70px" />
