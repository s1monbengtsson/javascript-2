import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface IProps {
    children: React.ReactNode
    onConfirm: () => void
    onCancel: () => void
    show: boolean
}

const ConfirmationModal: React.FC<IProps> = ({ children, onCancel, onConfirm, show }) => {
  return (
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
            Cancel
            </Button>
            <Button variant="warning" onClick={onConfirm}>
            Confirm
            </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ConfirmationModal