import { Button, Form, Modal } from "react-bootstrap";

export default function ModalBoxDetailPayment(props) {
    
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title className="mx-auto mt-5">
            <h3 className="mx-5"><b>Choose Payment Method</b></h3>
        </Modal.Title>
        <Modal.Body className="px-5" >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Card Number" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Card Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="CVCr" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Valid Until(mm/yy)" />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={props.onHide} >
                        Pay Now
                    </Button>
                </div>
            </Form>
        </Modal.Body>
      </Modal>
    );
  }
  