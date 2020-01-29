/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

const FixedSidebar = ({ sidebar, main }) => {
  return (
    <Box>
      <Box sx={{ position: 'fixed' }}>{sidebar}</Box>
      <Box>{main}</Box>
    </Box>
  )
}

export default FixedSidebar
