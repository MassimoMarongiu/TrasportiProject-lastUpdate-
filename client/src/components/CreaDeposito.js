import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreaDeposito = () => {
  
  const [idDeposito, setIdDeposito] = useState("");
  const [Descrizione, setDescrizione] = useState("");
  const [CoordinateIBAN, setCoordinateIBAN] = useState("");
  const [codtipodeposito, setCodtipodeposito] = useState("");
  const [codazienda, setCodazienda] = useState("");
  const [predef, setPredef] = useState("");

  const [depositiList, setDepositiList] = useState("");

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleInputChange = (e, field) => {
    if (field === "Descrizione") {
      setDescrizione(e.target.value);
    } else if (field === "CoordinateIBAN") {
      setCoordinateIBAN(e.target.value);
    } else if (field === "codtipodeposito") {
      setCodtipodeposito(e.target.value);
    } else if (field === "codazienda") {
      setCodazienda(e.target.value);
    } else if (field === "predef") {
      setPredef(e.target.value);
    }
  };

  const handleSubmitDeposito = async (e) => {
    e.preventDefault();
    try {
      const dataDeposito = await baseURL.post(`creaDeposito`, {
        Descrizione,
        CoordinateIBAN,
        codtipodeposito,
        codazienda,
        predef,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }
    );
      setDepositiList([...depositiList, dataDeposito.data]);
      setIdDeposito(null);
      setDescrizione("");
      setCoordinateIBAN("");
      setCodtipodeposito("");
      setCodazienda("");
      setPredef("");
      navigate("/depositi");
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    handleInputChange();
  }, []);



  return (
    <div
      className="App"
      style={{
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Aggiungi anagrafica cliente</h1>
      </div>
      <div style={{ marginTop: "30px" }}>
        {/* controlli su form */}
        {/* maxLength={4} 
          pattern="^\S{1,4}$" 
          pattern="[0-9]*"*/}

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitDeposito}
          style={{ maxWidth: "800px" }}
        >
          <Row>
            <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
              <Form.Label htmlFor="Descrizione">Descrizione</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "Descrizione")
                }
                type="textbox"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="CoordinateIBAN">Coordinate IBAN </Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "CoordinateIBAN")
                }
                type="textbox"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="codtipodeposito">Codice tipo deposito</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "codtipodeposito")
                }
                style={{ width: "50px" }}
                maxlength={255}
                type="textbox"
              />
            </Form.Group>
          
          </Row>

          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="codazienda">Codice Azienda</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "codazienda")
                }
                maxlength={255}
                type="textbox"
                style={{ width: "50px" }}
              />
            </Form.Group>
            </Row>
          
          <Row>
         
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="predef">predef</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "predef")
                }
                maxlength={255}
                style={{width:"50px"}}
                type="textbox"
                
              />
            </Form.Group>
             </Row>
         
          <Button
            variant="primary"
            name="check"
            type="submit"
            // onSelect={checkChange}
            onClick={() => {
              window.alert("Deposito creato con successo");
              // navigate(`/anagrafica`);
            }}
          >
            Salva
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreaDeposito;
