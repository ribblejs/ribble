import React from 'react'
import FixedSidebar from './FixedSidebar'
import { Box } from 'theme-ui'

export default { title: 'FixedSidebar' }

export const withDefault = () => (
  <Box sx={{ border: '1px dashed #999', m: 4, p: 0 }}>
    <FixedSidebar sidebar={<p>sidebar</p>} main={<p>main</p>} />
  </Box>
)
