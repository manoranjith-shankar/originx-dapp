import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modal1 = ({ imageURI }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {/* Remove the Button component here */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="Modal-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="Modal-custom-modal-styling-title">
            NFT Minted successfully <br />
            BoredApeYacthClub NFT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Use the imageURI prop here */}
          <div>
            <img src={imageURI} alt='' />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modal1;