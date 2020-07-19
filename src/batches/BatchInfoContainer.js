import React from 'react'
import { Link } from 'react-router-dom'

import TailLeft from '../assets/icons/arrows-16px-1_tail-left.svg'

import './BatchInfoContainer.scss'

class BatchInfoContainer extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const batchLink = '/batches' 

    return (
      <div>
        <div className="sideAreaWrapper">
          <div styleName="all-project-link-wrapper">
            <Link to={batchLink}>
              <div styleName="breadcrumb">
                <TailLeft styleName="icon-tail-left" />
                <span>ALL BATCHES</span>
              </div>
            </Link>
          </div>

          {/* Separator above project description */}
          <hr styleName="separator" />
          <div>
            <div className="project-info">
            
              <div className="project-status">
                Submit a new batch of Wiro Emails that needs to be deactivated.
                <br/>
                <div>
                  1. A background process will deactivate the email (if exists). <br/>
                  2. The deactivated users will be removed from groups. <br/>
                  3. The batch status will be marked as completed. <br/>
                  4. A max of 500 emails are supported in one batch. <br/>
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

export default BatchInfoContainer
