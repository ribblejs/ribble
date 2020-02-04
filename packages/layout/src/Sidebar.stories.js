/** @jsx jsx */
import { useState } from 'react'
import { jsx, Styled, Box } from 'theme-ui'
import { Sidebar } from './Sidebar'
import { text, paragraphs } from '@utilz/dummy'
import { keyframes } from '@emotion/core'

export default {
  title: 'Sidebar',
}

const Padded = ({ title, children, color }) => (
  <Box sx={{ p: 3, backgroundColor: color, height: '100%' }}>
    <Styled.h1>{title}</Styled.h1>
    {children}
  </Box>
)

const PlayIcon = () => (
  <svg viewBox="0 0 10 10" focusable="false">
    <path d="M1,0 10,5 1,10"></path>
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 10 10" focusable="false">
    <path d="M0,0 0,10 3,10 3,0 M7,0 7,10 10,10 10,0"></path>
  </svg>
)

const ShrinkGrow = ({ minWidth, maxWidth, timeInSeconds, children }) => {
  const [state, setState] = useState('paused')

  const squeeze = keyframes({
    '0%': { width: maxWidth },
    '100%': { width: minWidth },
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          backgroundColor: '#eee',
          margin: '0 auto',
          borderRadius: '50%',
          cursor: 'pointer',
          width: '70px',
          height: '70px',
          display: 'flex',
          mb: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() =>
          state === 'paused' ? setState('playing') : setState('paused')
        }
      >
        <Box sx={{ width: '20px', height: '20px' }}>
          {state === 'paused' ? <PlayIcon /> : <PauseIcon />}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            animation: `${timeInSeconds}s linear infinite alternate ${squeeze}`,
            animationPlayState: state === 'paused' ? 'paused' : 'running',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

ShrinkGrow.defaultProps = {
  minWidth: '300px',
  maxWidth: '100%',
  timeInSeconds: 5,
}

const defaultProps = {
  sidebarWidth: '20rem',
  sidebar: (
    <Padded title="Sidebar" color="#eee">
      {text(paragraphs(20, 50)).map(props => (
        <Styled.p key={props.id} {...props} />
      ))}
    </Padded>
  ),
  main: (
    <Padded title="Main" color="#e0e0e0">
      {text(paragraphs(100, 150)).map(props => (
        <Styled.p key={props.id} {...props} />
      ))}
    </Padded>
  ),
}

export const withLeftSidebar = () => (
  <ShrinkGrow timeInSeconds={3}>
    <Sidebar {...defaultProps} />
  </ShrinkGrow>
)

export const withRightSidebar = () => (
  <ShrinkGrow>
    <Sidebar {...defaultProps} side="right" />
  </ShrinkGrow>
)

export const withNumericGap = () => (
  <ShrinkGrow>
    <Sidebar {...defaultProps} gap={3} />
  </ShrinkGrow>
)

export const withStringGap = () => (
  <ShrinkGrow>
    <Sidebar {...defaultProps} gap="70px" />
  </ShrinkGrow>
)
