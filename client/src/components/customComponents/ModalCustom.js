import React from "react";
import Modal from "react-bootstrap/Modal";
import  { useState, useEffect } from "react";
// import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ModalCustom({show}) {
  console.log(show);
  const [showed, setShowed] = useState();
  setShowed(show);
  console.log(showed);
  const handleClose = () => setShowed(false);
  const handleShow = () => setShowed(true);

  
  return (
    <div>
 
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          marginTop: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Seleziona 
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCustom;
