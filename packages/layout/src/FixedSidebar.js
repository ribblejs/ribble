/** @jsx jsx */
import { jsx, Box } from 'theme-ui'

const FixedSidebar = ({ sidebar, main, footer }) => {
  return (
    <Box>
      <Box sx={{ position: 'fixed', width: '10rem' }}>{sidebar}</Box>
      <Box sx={{ ml: '10rem', padding: 1 }}>{main}</Box>
      <Box>{footer}</Box>
    </Box>
  )
}

export default FixedSidebar
