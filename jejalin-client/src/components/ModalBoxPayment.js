import { Form, FormGroup, Modal } from "react-bootstrap";

export default function ModalBoxPayment(props) {
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
            <h5>
                <FormGroup>
                    <Form.Check type="radio" label="Credit Card" onChange={props.onHide} className="my-5"/>
                    <Form.Check type="radio" label="Debit Card" onChange={props.onHide} className="my-5" />
                    <Form.Check type="radio" label="Gopay" onChange={props.onHide} className="my-5" />
                    <Form.Check type="radio" label="QRIS" onChange={props.onHide} className="my-5" />
                </FormGroup>
            </h5>
        </Modal.Body>
      </Modal>
    );
  }
  