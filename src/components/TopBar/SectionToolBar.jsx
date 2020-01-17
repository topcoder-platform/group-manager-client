/**
 * Component to display simple section tool bar
 *
 * Includes:
 * - TopCoder logo
 * - title
 * - optional right side menu
 * - close (cross) button
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './SectionToolBar.scss'
import ConnectLogoMono from '../../assets/icons/connect-logo-mono.svg'
import XMark from '../../assets/icons/x-mark.svg'


const SectionToolBar = (props) => {
  const logo = <Link key="logo" to="/" className="logo"><ConnectLogoMono className="icon-connect-logo-mono" /></Link>
  const title = <div key="title" className="title">{props.title}</div>
  const close = <Link key="close" to="/" className="close"><XMark className="icon-x-mark" /></Link>
  const menu = props.menu ? <div key="menu" className="menu">{props.menu}</div> : null

  return (
    <div className="section-tool-bar">
      {menu ? [
        <div key="left" className="section">
          {logo}
        </div>,
        <div key="center" className="section">
          {title}
        </div>,
        <div key="right" className="section">
          {menu}
          {close}
        </div>
      ] : [
        logo,
        title,
        close
      ]}
    </div>
  )
}

SectionToolBar.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.array
}

export default SectionToolBar
