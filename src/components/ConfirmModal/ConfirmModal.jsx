import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Modal from './../Modal/Modal'

const ConfirmModal = ({children, className, onClose}) => {
  return (
    <Modal>
      <Modal.Title>This is title</Modal.Title>
      <Modal.Body>
        Ok
      </Modal.Body>
    </Modal>
  )
}
  
export default ConfirmModal