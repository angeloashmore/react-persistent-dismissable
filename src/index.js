import React from 'react'
import PropTypes from 'prop-types'
import {
  get as getCookie,
  set as setCookie,
  remove as removeCookie,
} from 'es-cookie'

const windowExists = typeof window !== 'undefined'

export default class PersistentDismissable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    expires: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      dismissed: windowExists ? Boolean(getCookie(props.name)) : false,
    }
  }

  dismiss = () => {
    const { name, path, expires } = this.props

    this.setState({ dismissed: true })

    if (windowExists) setCookie(name, true, { path, expires })
  }

  undismiss = () => {
    const { name, path, expires } = this.props

    this.setState({ dismissed: false })

    if (windowExists) removeCookie(name, { path, expires })
  }

  render() {
    return this.props.children({
      dismissed: this.state.dismissed,
      dismiss: this.dismiss,
      undismiss: this.undismiss,
    })
  }
}
