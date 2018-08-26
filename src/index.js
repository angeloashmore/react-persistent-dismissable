import React from 'react'
import PropTypes from 'prop-types'

const get = key => {
  try {
    return window.localStorage.getItem(key)
  } catch (e) {
    console.error(e)
    return undefined
  }
}

const set = (key, val) => {
  try {
    window.localStorage.setItem(key, val)
  } catch (e) {
    console.error(e)
  }
}

const remove = key => {
  try {
    window.localStorage.removeItem(key)
  } catch (e) {
    console.error(e)
  }
}

export default class PersistentDismissable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      dismissed: Boolean(get(props.name)),
    }
  }

  dismiss = () => {
    this.setState({ dismissed: true })
    set(this.props.name, new Date().getTime())
  }

  undismiss = () => {
    this.setState({ dismissed: false })
    remove(this.props.name)
  }

  render() {
    return this.props.children({
      dismissed: this.state.dismissed,
      dismiss: this.dismiss,
      undismiss: this.undismiss,
    })
  }
}
