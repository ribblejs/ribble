import { configure, addDecorator } from '@storybook/react'
import { withPulse } from 'storybook-addon-pulse'

addDecorator(withPulse)

configure(require.context('../src', true, /\.stories\.jsx?$/), module)
