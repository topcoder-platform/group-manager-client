import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'
import Dropdown from 'appirio-tech-react-components/components/Dropdown/Dropdown'
import IconCarretDownActive from './../assets/icons/arrow-6px-carret-down-active.svg'
import IconCarretDownNormal from '../assets/icons/arrow-6px-carret-down-normal.svg'
import IconCheckDark from '../assets/icons/check-dark.svg'

const options = [
  { val: 'best match', label: 'Best Match' },
  { val: 'createdAt desc', label: 'Latest first' },
  { val: 'createdAt', label: 'Oldest first' },
  { val: 'name', label: 'Name Z-A' },
  { val: 'name', label: 'Name A-Z' }
]

class GroupListColHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = { focused:  false }
  }

  toggleFocusState() {
    this.state.focused = !this.state.focused
    this.forceUpdate()
  }

  onOutsideClick(ev) {
    const currNode = ev.target
    /*
    if (currNode.className.indexOf('dropdown') > -1) {
      return
    }

    this.state.focused = false
    this.forceUpdate()
    */
  }

  componentDidMount() {
    document.addEventListener('click', ev => this.onOutsideClick(ev))
  }

  render() {
    const {currentSortField, sortHandler} = this.props
    const cur = 'name' // _.find(options, o => currentSortField.indexOf(o.val) > -1)|| options[0]
  
    return (
      <div>
        <span className="txt txt-black">Groups</span>
        <Dropdown>
          <a href="javascript:;" className="dropdown-menu-header txt-link" onClick={ev => this.toggleFocusState(ev)}>
            {cur.label}
            {!this.state.focused? <IconCarretDownNormal className="icon-carret-down-normal"/> : <IconCarretDownActive className="icon-carret-down-active" />}
          </a>
          <div className="dropdown-menu-list down-layer">
            <ul>
              {
                options.map((item, i) => {
                  const activeClass = cn({
                    active: item.val === currentSortField
                  })
                  return (<li key={i} className={activeClass} onClick={() => sortHandler(item.val)}>
                    {activeClass? <IconCheckDark className="icon-check-dark"/>: ''}
                    <a href="javascript:;">{item.label}</a>
                  </li>)
                })
              }
            </ul>
          </div>
        </Dropdown>
      </div>
    )
  }
}


GroupListColHeader.propTypes = {
  currentSortField: PropTypes.string,
  sortHandler: PropTypes.func
}
export default GroupListColHeader
