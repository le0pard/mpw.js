import React from 'react'
import PropTypes from 'prop-types'
import GenerateKey from 'containers/generateKey'
import GeneratePassword from 'containers/generatePass'

export default class MainGenerator extends React.Component {
  static propTypes = {
    isHaveGeneratedKey: PropTypes.bool.isRequired
  }

  render() {
    const {isHaveGeneratedKey} = this.props
    if (isHaveGeneratedKey) {
      return (<GeneratePassword />)
    } else {
      return (<GenerateKey />)
    }
  }
}
