import React from 'react'
import Modal from './../Modal/Modal'

// eslint-disable-next-line no-unused-vars
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