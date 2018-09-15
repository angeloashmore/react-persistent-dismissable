import React from 'react'
import PropTypes from 'prop-types'
import { get, set, del } from './idb-keyval'

export default class PersistentDismissable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      dismissed: true,
    }
  }

  componentDidMount() {
    get(this.props.name).then(val => this.setState({ dismissed: Boolean(val) }))
  }

  dismiss = () => {
    this.setState({ dismissed: true })
    set(this.props.name, new Date().getTime())
  }

  undismiss = () => {
    this.setState({ dismissed: false })
    del(this.props.name)
  }

  render() {
    return this.props.children({
      dismissed: this.state.dismissed,
      dismiss: this.dismiss,
      undismiss: this.undismiss,
    })
  }
}
