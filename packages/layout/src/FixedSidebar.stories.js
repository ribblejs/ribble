import React from 'react'
import FixedSidebar from './FixedSidebar'
import { Box } from 'theme-ui'
import { text, paragraphs } from '@utilz/dummy'
import { Styled } from 'theme-ui'

export default { title: 'FixedSidebar' }

const Dummy = () => {
  const ps = text(paragraphs(100, 150))
  return ps.map((p, i) => <Styled.p key={i}>{p}</Styled.p>)
}

export const withDefault = () => (
  <Box sx={{ border: '1px dashed #999', m: 4, p: 0 }}>
    <FixedSidebar
      sidebar={<p>sidebar</p>}
      main={<Dummy />}
      footer={<div>Footer</div>}
    />
  </Box>
)
