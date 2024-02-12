import React from "react";
import { useState, useEffect } from "react";
// import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import baseURL from "../api/connection";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

function CreaTipoPagamento() {
  const [idtipopagamento, setIdtipopagamento] = useState(null);
  const [descrizione, setDescrizione] = useState("");
  const [ggrata1, setGgrata1] = useState("");
  const [fmrata1, setFmrata1] = useState("");
  const [percrata1, setPercrata1] = useState("");
  const [ggrata2, setGgrata2] = useState("");
  const [fmrata2, setFmrata2] = useState("");
  const [percrata2, setPercrata2] = useState("");
  const [ggrata3, setGgrata3] = useState("");
  const [fmrata3, setFmrata3] = useState("");
  const [percrata3, setPercrata3] = useState("");
  const [codDeposito, setCodDeposito] = useState("");
  const [visibile, setVisibile] = useState(1);
  const [codtipodeposito, setCodtipodeposito] = useState("");

  const [validated, setValidated] = useState(false);

  const [tipoPagamentoList, setTipoPagamentoList] = useState([]);
  const [isCheckedvisibile, setIsCheckedVisibile] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const navigate = useNavigate();

  const checkChangeVisibile = () => {
    setIsCheckedVisibile(!isCheckedvisibile);
    !isCheckedvisibile ? setVisibile(1) : setVisibile(0);
    console.log(visibile);
  };

  const handleInputChange = (e, field) => {
    if (field === "descrizione") {
      setDescrizione(e.target.value);
    } else if (field === "ggrata1") {
      setGgrata1(e.target.value);
    } else if (field === "fmrata1") {
      setFmrata1(e.target.value);
    } else if (field === "percrata1") {
      setPercrata1(e.target.value);
    } else if (field === "ggrata2") {
      setGgrata2(e.target.value);
    } else if (field === "fmrata2") {
      setFmrata2(e.target.value);
    } else if (field === "percrata2") {
      setPercrata2(e.target.value);
    } else if (field === "ggrata3") {
      setGgrata3(e.target.value);
    } else if (field === "fmrata3") {
      setFmrata3(e.target.value);
    } else if (field === "percrata3") {
      setPercrata3(e.target.value);
    } else if (field === "codDeposito") {
      setCodDeposito(e.target.value);
    } else if (field === "visibile") {
      //   setVisibile(e.target.value);
      checkChangeVisibile();
    } else if (field === "codtipodeposito") {
      setCodDeposito(e.target.value);
    }
  };
  useEffect(() => {
    handleInputChange();
  }, [isCheckedvisibile]);

  const handleSubmitTipoPagamento = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaTipoPagamento`,
        {
          descrizione,
          ggrata1,
          fmrata1,
          percrata1,
          ggrata2,
          fmrata2,
          percrata2,
          ggrata3,
          fmrata3,
          percrata3,
          codDeposito,
          visibile,
          codtipodeposito,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setTipoPagamentoList([...tipoPagamentoList, data.data]);
      setIdtipopagamento(null);
      setDescrizione("");
      setGgrata1("");
      setFmrata1("");
      setPercrata1("");
      setGgrata2("");
      setFmrata2("");
      setPercrata2("");
      setGgrata3("");
      setFmrata3("");
      setPercrata2("");
      setGgrata2("");
      setFmrata3("");
      setPercrata3("");
      setCodDeposito("");
      setCodtipodeposito("");
      setVisibile();
      // navigate("/tipopagametno");
    } catch (error) {
      console.error(error.message);
    }
  };



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
        <h1>Tipo Pagamento</h1>
      </div>
      <div>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitTipoPagamento}
          style={{ width: "600px" }}
        >
          <Row>
            <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
              <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "descrizione")}
                type="text"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ggrata1">ggrata1</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ggrata1")}
                type="text"
                maxlength={255}
                style={{ width: "auto" }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="fmrata1">fmrata1</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "fmrata1")}
                maxlength={255}
                type="text"
                style={{ width: "auto" }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="percrata1">percrata1</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "percrata1")}
                maxlength={255}
                type="text"
                style={{ width: "auto" }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ggrata2">ggrata2</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ggrata2")}
                type="text"
                maxlength={50}
                style={{ width: "auto" }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="fmrata2">fmrata2</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "fmrata2")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="percrata2">percrata2</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "percrata2")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ggrata3">ggrata3</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ggrata3")}
                style={{ width: "auto" }}
                type="text"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="fmrata3">fmrata3</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "fmrata3")}
                style={{ width: "auto" }}
                type="text"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="percrata3">percrata3</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "percrata3")}
                style={{ width: "auto" }}
                type="text"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="codDeposito">codDeposito</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "codDeposito")}
                style={{ width: "auto" }}
                type="text"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="codtipodeposito">codtipodeposito</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "codtipodeposito")}
                style={{ width: "auto" }}
                type="text"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="visibile"
                checked={!isCheckedvisibile}
                onChange={(e) => handleInputChange(e, "visibile")}
              />
            </Form.Group>
          </Row>
          
          <Button
            variant="primary"
            name="check"
            type="submit"
            // onSelect={checkChange}
            onClick={() => {
              window.alert("Tipop pagamento creato con successo");
              // navigate(`/anagrafica`);
            }}
          >
            Salva
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreaTipoPagamento;
