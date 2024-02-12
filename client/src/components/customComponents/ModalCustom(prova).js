import React from "react";
import Modal from "react-bootstrap/Modal";
import  { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ModalCustom() {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{ marginLeft: "10px" }}
      >
        Elimina
      </Button>
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
            Sei sicuro di voler eliminare il tipo di bolla?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          {/* console.log("gestire visibilita visibili tutti"); */}
          <Button
            variant="primary"
            onClick={() => {
            //   handleDelete(e.iddescrizione, "");
            //   navigate("/descrizioneTrasporto");
            }}
          >
            Elimina
          </Button>
          {/* console.log("gestire visibilita visibili tutti"); */}
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCustom;
