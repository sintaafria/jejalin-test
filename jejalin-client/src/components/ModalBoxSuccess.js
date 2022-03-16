import { Button, Modal } from "react-bootstrap";
import MdCheckmarkCircleOutline from '@meronex/icons/ios/MdCheckmarkCircleOutline';

export default function ModalBoxSuccess(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title className="mx-auto mt-5 text-center">
            <h3 className="mx-5" style={{color: "#22175B"}}><b>Payment Successfull</b></h3>
            <h1 style={{fontSize: "200px", color: "#22175B"}}><MdCheckmarkCircleOutline/></h1>
        </Modal.Title>
        <Modal.Body className="px-5 mx-auto" >
            <h5>
                <Button onClick={props.onHide}>Done</Button>
            </h5>
        </Modal.Body>
      </Modal>
    );
  }
  