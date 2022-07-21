import React from 'react'
import { Link } from 'react-router-dom'

import TailLeft from '../assets/icons/arrows-16px-1_tail-left.svg'

import './BulkUploadInfoContainer.scss'

class BulkUploadInfoContainer extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const batchLink = '/bulkUpload' 

    return (
      <div>
        <div className="sideAreaWrapper">
          <div styleName="all-project-link-wrapper">
            <Link to={batchLink}>
              <div styleName="breadcrumb">
                <TailLeft styleName="icon-tail-left" />
                <span>ALL BULK UPLOAD LIST</span>
              </div>
            </Link>
          </div>

          {/* Separator above project description */}
          <hr styleName="separator" />
          <div>
            <div className="project-info">
            
              <div className="project-status">
                 Upload a new file for mass operations on groups
                <br/>
                <div>
                  1. The file should have the following 3 columns <br/>
                  2. Group Name <br/>
                  3. Email <br/>
                  4. Operation (Add / Remove) - if nothing is specified add is assumed <br/>
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

export default BulkUploadInfoContainer
