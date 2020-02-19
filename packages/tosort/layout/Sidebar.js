/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { isNumeric } from '@utilz/types'

export const Sidebar = ({
  as,
  sidebar,
  sidebarWidth,
  stretch,
  main,
  side,
  gap,
}) => {
  const isSidebarLeft = side === 'left'

  const toGap = theme => (isNumeric(gap) ? `${theme.space[gap]}px` : gap) // TODO: add isInteger and inThemeRange?

  const sidebarStyle = {
    flexGrow: 1,
    flexBasis: sidebarWidth,
    margin: theme => `calc(${toGap(theme)} / 2)`,
  }

  const mainStyle = {
    flexBasis: 0,
    flexGrow: 999,
    margin: theme => `calc(${toGap(theme)} / 2)`,
    minWidth: theme => `calc(50% - ${toGap(theme)})`,
  }

  return (
    <Box
      as={as}
      sx={{
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: !stretch ? 'flex-start' : null,
          margin: theme => `calc(${toGap(theme)} / 2 * -1)`,
        }}
      >
        <Box sx={isSidebarLeft ? sidebarStyle : mainStyle}>
          {isSidebarLeft ? sidebar : main}
        </Box>
        <Box sx={isSidebarLeft ? mainStyle : sidebarStyle}>
          {isSidebarLeft ? main : sidebar}
        </Box>
      </Box>
    </Box>
  )
}

Sidebar.defaultProps = {
  as: 'div',
  side: 'left',
  sidebarWidth: null,
  stretch: true,
  gap: 0,
}
