import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutView from './Layout.jsx'

class Layout extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return React.createElement(LayoutView, this.props)
  }
}

const mapStateToProps = ({ loadUser }) => {
  return {
    user: loadUser.user
  }
}

const actionsToBind = { }

export default connect(mapStateToProps, actionsToBind)(Layout)
