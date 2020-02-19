import React from 'react'
import { Heading } from './Heading'

export default {
  title: 'chrome/Heading',
}

export const Default = () => <Heading title="Heading 1" />

export const withAs = () => <Heading as="h2" title="Heading 2" />
