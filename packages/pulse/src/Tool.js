import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icons, IconButton } from '@storybook/components'

export class Tool extends Component {
  static propTypes = {
    api: PropTypes.shape({
      getQueryParam: PropTypes.func,
      setQueryParams: PropTypes.func,
    }).isRequired,
    channel: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
      removeListener: PropTypes.func,
    }),
  }

  static defaultProps = {
    channel: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      mode: 'paused',
    }

    this.setMode = this.setMode.bind(this)
  }

  componentDidMount() {
    const { channel } = this.props

    channel.on('pulse/check-status', () => {
      channel.emit('pulse/change-mode', this.state.mode)
    })
  }

  setMode() {
    this.setState(
      { mode: this.state.mode === 'paused' ? 'playing' : 'paused' },
      () => {
        this.props.channel.emit('pulse/change-mode', this.state.mode)
      }
    )
  }

  render() {
    return (
      <IconButton
        key="control"
        title={this.state.mode === 'paused' ? 'Play' : 'Pause'}
        onClick={this.setMode}
        mode={this.state.mode}
      >
        <Icons icon={this.state.mode === 'paused' ? 'arrowright' : 'cross'} />
      </IconButton>
    )
  }
}
