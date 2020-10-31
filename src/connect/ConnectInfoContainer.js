import React from 'react'
import { Link } from 'react-router-dom'

import TailLeft from '../assets/icons/arrows-16px-1_tail-left.svg'

import './ConnectInfoContainer.scss'

class ConnectInfoContainer extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const connectLink = '/connect' 

    return (
      <div>
        <div className="sideAreaWrapper">
          <div styleName="all-project-link-wrapper">
            <Link to={connectLink}>
              <div styleName="breadcrumb">
                <TailLeft styleName="icon-tail-left" />
                <span>CONNECT PROJECTS</span>
              </div>
            </Link>
          </div>

          {/* Separator above project description */}
          <hr styleName="separator" />
          <div>
            <div className="project-info">
            
              <div className="project-status">
                Submit a new request for updating connect project information
                <br/>
                <div>
                  1. A background process will update the project information. <br/>
                  2. Project Custom Info and Status will be updated. <br/>
                  3. Data will be updated in Looker in 24-48 hours. <br/>
                </div>
              </div>
            </div>    
      
          </div>
          <hr styleName="separator" />
        
        </div>
      </div>
    )
  }
}

export default ConnectInfoContainer
