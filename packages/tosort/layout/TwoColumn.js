/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'

export const TwoColumn = ({ top, asideWidth, aside, main }) => (
  <Flex>
    <Box
      sx={{
        position: 'relative',
        top: 0,
        width: asideWidth,
        minWidth: 'initial',
        borderRight: '1px solid #bfc1c3',
        flexShrink: 0,
        display: ['none', 'block'],
      }}
    >
      {aside}
    </Box>
    <Box sx={{ flexGrow: 1 }}>{main}</Box>
  </Flex>
)

TwoColumn.defaultProps = {
  top: 0,
  asideWidth: '300px',
}
