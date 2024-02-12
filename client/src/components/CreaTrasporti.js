import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function CreaTrasporti() {
  const [idtrasporto, setIdtrasporto] = useState("");
  const [dataTrasporto, setDataTrasporto] = useState("");
  const [codAnagrafica, setCodAnagrafica] = useState("");
  const [codLocalitaPartenza, setCodLocalitaPartenza] = useState("");
  const [codLocalitaArrivo, setCodLocalitaArrivo] = useState("");
  const [codDescrizioneTrasporto, setCodDescrizioneTrasporto] = useState("");
  const [imponibile, setImponibile] = useState("");
  const [codIva, setCodIva] = useState("");
  const [totale, setTotale] = useState("");
  const [codTipoBolla, setCodTipoBolla] = useState("");
  const [numero, setNumero] = useState("");
  const [note, setNote] = useState("");
  const [codDocumento, setCodDocumento] = useState("");
  const [dataAnticipato, setDataAnticipato] = useState("");
  const [codModalitaAnticipato, setCodModalitaAnticipato] = useState("");
  const [dettagliAnticipato, setDettagliAnticipato] = useState("");
  const [codDepositoAnticipato, setCodDepositoAnticipato] = useState("");

  const [trasportiList, setTrasportiList] = useState([]);
  const [validated, setValidated] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const navigate = useNavigate();

  const handleInputChangeTrasporto = (e, field) => {
    if (field === "DataTrasporto") {
      setDataTrasporto(e.target.value);
    } else if (field === "CodAnagrafica") {
      setCodAnagrafica(e.target.value);
    } else if (field === "CodLocalitaPartenza") {
      setCodLocalitaPartenza(e.target.value);
    } else if (field === "CodLocalitaArrivo") {
      setCodLocalitaArrivo(e.target.value);
    } else if (field === "CodDescrizioneTrasporto") {
      setCodDescrizioneTrasporto(e.target.value);
    } else if (field === "Imponibile") {
      setImponibile(e.target.value);
    } else if (field === "CodIva") {
      setCodIva(e.target.value);
    } else if (field === "Totale") {
      setTotale(e.target.value);
    } else if (field === "CodTipoBolla") {
      setCodTipoBolla(e.target.value);
    } else if (field === "Numero") {
      setNumero(e.target.value);
    } else if (field === "Note") {
      setNote(e.target.value);
    } else if (field === "CodDocumento") {
      setCodDocumento(e.target.value);
    } else if (field === "DataAnticipato") {
      setDataAnticipato(e.target.value);
    } else if (field === "CodModalitaAnticipato") {
      setCodModalitaAnticipato(e.target.value);
    } else if (field === "DettagliAnticipato") {
      setDettagliAnticipato(e.target.value);
    } else if (field === "CodDepositoAnticipato") {
      setCodDepositoAnticipato(e.target.value);
    }
  };

  useEffect(() => {
    handleInputChangeTrasporto();
  },[])

  const handleSubmitCreaTrasporto = async (e) => {
    e.preventDefault();
    try {
      const data= await baseURL.post(`/creaTrasporto`,{
        dataTrasporto,
        codAnagrafica,
        codLocalitaPartenza,
        codLocalitaArrivo,
        codDescrizioneTrasporto,
        imponibile,
        codIva,
        totale,
        codTipoBolla,
        numero,
        note,
        codDocumento,
        dataAnticipato,
        codModalitaAnticipato,
        dettagliAnticipato,
        codDepositoAnticipato
      }, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      setTrasportiList([...trasportiList,data.data]);
      setIdtrasporto(null);
      setDataTrasporto("");
      setCodAnagrafica("");
      setCodLocalitaPartenza("");
      setCodLocalitaArrivo("");
      setCodDescrizioneTrasporto("");
      setImponibile("");
      setCodIva("");
      setTotale("");
      setCodTipoBolla("");
      setNumero("");
      setNote("");
      setCodDocumento("");
      setDataAnticipato("");
      setCodModalitaAnticipato("");
      setDettagliAnticipato("");
      setCodDepositoAnticipato("");
      navigate("/trasporti");
    } catch (error) {
      console.error(error.message);

    }
  }

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
      <h1>Trasporto</h1>
    </div>
    <div style={{ marginTop: "30px" }}>
      {/* controlli su form */}
      {/* maxLength={4} 
        pattern="^\S{1,4}$" 
        pattern="[0-9]*"*/}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmitCreaTrasporto}
        style={{ width: "600px" }}
      >
        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="dataTrasporto">Data Trasporto (es. : 2022-01-01) </Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "dataTrasporto")
              }
              type="date"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codAnagrafica">codice Anagrafica</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codAnagrafica")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codLocalitaPartenza">Codice Localita Partenza</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codLocalitaPartenza")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codLocalitaArrivo">Codice Localita Arrivo</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codLocalitaArrivo")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codDescrizioneTrasporto">Codice Descrizione Trasporto</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codDescrizioneTrasporto")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="imponibile">Imponibile (decimale)</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "imponibile")
              }
              type="float"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codIva">Codice IVA</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codIva")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="totale">Totale (decimale)</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "totale")
              }
              type="float"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codTipoBolla">Codice Tipo Bolla</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codTipoBolla")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="numero">Numero (string)</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "numero")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="note">note</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "note")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codDocumento">Codice Documento</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codDocumento")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="dataAnticipato">Data pagamennto Anticipato</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "dataAnticipato")
              }
              type="date"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codModalitaAnticipato">Codice Modalita Pagamento Anticipato</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codModalitaAnticipato")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="importoAnticipato">Importo Anticipato</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "importoAnticipato")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="dettagliAnticipato">Dettagli Pagamento Anticipato</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "dettagliAnticipato")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="codDepositoAnticipato">Codice Deposito Anticipato</Form.Label>
            <Form.Control
              onChange={(e) =>
                handleInputChangeTrasporto(e, "codDepositoAnticipato")
              }
              type="textbox"
              maxlength={255}
              
            />
          </Form.Group>
        </Row>


    

        <Button
          variant="primary"
          name="check"
          type="submit"
          // onSelect={checkChange}
          onClick={() => {
            window.alert("Trasporto creato con successoa");
            // navigate(`/anagrafica`);
          }}
        >
          Salva
        </Button>
      </Form>
    </div>
  </div>
  )
}

export default CreaTrasporti