import { Button, Modal } from 'react-bootstrap';

function DeleteModal({ onClose, onConfirm, item }) {

    return (
        <div>
            <Modal show={true} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this { item }??</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onConfirm}>
                        CONFIRM
                    </Button>

                    <Button variant='secondary' onClick={onClose}>
                        CANCEL
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteModal;