import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { addons, makeDecorator } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'
import { useAddonState, useChannel } from '@storybook/api'
import { Pulse } from './Pulse'

const Decorator = ({ story }) => {
  const [mode, setMode] = useState('paused')
  const [currentStory] = useState(story)
  const [channel] = useState(addons.getChannel())

  useEffect(() => {
    channel.emit('pulse/check-status')

    const handleModeChange = mode => {
      setMode(mode)
    }

    const handleStoryChange = story => {
      console.log(story)
    }

    channel.on('pulse/change-mode', handleModeChange)
    channel.on(STORY_CHANGED, handleStoryChange)

    return () => {
      channel.removeListener('pulse/change-mode', handleModeChange)
      channel.removeListener('STORY_CHANGED', handleStoryChange)
    }
  }, [])

  return <Pulse mode={mode}>{currentStory}</Pulse> // TODO: options
}

// class Decorator extends Component {
//   static propTypes = {
//     channel: PropTypes.shape({
//       emit: PropTypes.func,
//       on: PropTypes.func,
//       removeListener: PropTypes.func,
//     }),
//     story: PropTypes.object.isRequired,
//     // breakpoints: PropTypes.objectOf(PropTypes.number),
//   }

//   static defaultProps = {
//     channel: undefined,
//     // breakpoints: {
//     //   tablet: 768,
//     //   desktop: 1024,
//     // },
//   }

//   constructor(props) {
//     super(props)

//     const { channel, story } = props

//     if (channel) {
//       this.channel = channel
//     } else {
//       this.channel = addons.getChannel()
//     }

//     this.story = story
//   }

//   state = {
//     mode: 'paused',
//   }

//   componentDidMount() {
//     this.channel.emit('pulse/check-status')

//     this.channel.on('pulse/change-mode', mode => {
//       this.setState({ mode })
//     })
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.story !== prevProps.story) {
//       this.story = this.props.story
//     }
//   }

//   render() {
//     return <Pulse mode={this.state.mode}>{this.story}</Pulse> // TODO: options
//   }
// }

export const withPulse = makeDecorator({
  name: 'withPulse',
  parameterName: 'pulse',
  wrapper: (getStory, context, { options }) => {
    return <Decorator story={getStory(context)} /> // TODO: options
  },
})
