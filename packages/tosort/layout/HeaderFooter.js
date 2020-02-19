/** @jsx jsx */
import React from 'react'
import { jsx, Box } from 'theme-ui'
import { Global } from '@emotion/core'

export const HeaderFooter = ({ header, headerHeight, main, footer }) => {
  // Add global style to fix anchor link hiding content under fixed header
  // See https://stackoverflow.com/a/38106970/12510653 for details.
  const bufferedHeight = headerHeight + 10
  return (
    <React.Fragment>
      <Global
        styles={{
          '*[id]:before': {
            content: '""',
            display: 'block',
            height: bufferedHeight,
            margin: `-${bufferedHeight}px 0 0`,
            visibility: 'hidden',
          },
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          minHeight: headerHeight,
          width: '100%',
          zIndex: 9999,
          flexShrink: 0,
        }}
      >
        {header}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: `calc(100vh - ${headerHeight}px)`,
          paddingTop: headerHeight,
          position: 'relative',
          left: 0,
          zIndex: 99,
          flexGrow: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{main}</Box>
        <Box sx={{ flexShrink: 0 }}>{footer}</Box>
      </Box>
    </React.Fragment>
  )
}
