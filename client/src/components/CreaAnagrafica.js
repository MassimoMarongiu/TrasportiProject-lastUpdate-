import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const CreaAnagrafica = () => {
  //   idanagrafica, ragionesociale, partitaiva, codicefiscale,
  //   localita, indirizzo,  prov, cap, telefono1, telefono2, fax, email,
  //  attivo, estero, nazionale, codtipopagamento, CodCategoriaSconto,
  //  cli_for, vettore, tipo_cliente, scontopredlistino
  const [idanagrafica, setIdanagrafica] = useState("");
  const [ragionesociale, setRagionesociale] = useState("");
  const [partitaiva, setPartitaiva] = useState("");
  const [codicefiscale, setCodicefiscale] = useState("");
  const [localita, setLocalita] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [prov, setProv] = useState("");
  const [cap, setCap] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [estero, setEstero] = useState("");
  const [nazionale, setNazionale] = useState(false);
  const [codtipopagamento, setCodtipopagamento] = useState(0);
  const [CodCategoriaSconto, setCodCategoriaSconto] = useState(0);
  const [cli_for, setCli_for] = useState(0);
  const [vettore, setVettore] = useState(false);
  const [tipo_cliente, setTipo_cliente] = useState(0);
  const [scontopredlistino, setScontopredlistino] = useState("");
  const [attivo, setAttivo] = useState(false);
  const [attivoNum, setAttivoNum] = useState(1);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };


  const [isCheckedAttivo, setIsCheckedAttivo] = useState(false);
  const [isCheckedNazionale, setIsCheckedNazionale] = useState(false);
  const [isCheckedVettore, setIsCheckedVettore] = useState(false);

  const [anagraficaList, setAnagraficaList] = useState([]);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const navigate = useNavigate();

  const checkChangeAttivo = () => {
    setIsCheckedAttivo(!isCheckedAttivo);
    !isCheckedAttivo ? setAttivo(true) : setAttivo(false);
    console.log(attivo);
  };

  const checkChangeNazionale = () => {
    setIsCheckedNazionale(!isCheckedNazionale);
    !isCheckedNazionale ? setNazionale(true) : setNazionale(false);
  };

  const checkChangeVettore = () => {
    setIsCheckedVettore(!isCheckedVettore);
    !isCheckedVettore ? setVettore(true) : setVettore(false);
  };

  const handleInputChange = (e, field) => {
    if (field === "ragionesociale") {
      setRagionesociale(e.target.value);
    } else if (field === "partitaiva") {
      setPartitaiva(e.target.value);
    } else if (field === "codicefiscale") {
      setCodicefiscale(e.target.value);
    } else if (field === "localita") {
      setLocalita(e.target.value);
    } else if (field === "indirizzo") {
      setIndirizzo(e.target.value);
    } else if (field === "prov") {
      setProv(e.target.value);
    } else if (field === "cap") {
      setCap(e.target.value);
    } else if (field === "telefono1") {
      setTelefono1(e.target.value);
    } else if (field === "telefono2") {
      setTelefono2(e.target.value);
    } else if (field === "fax") {
      setFax(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "attivo") {
      checkChangeAttivo();
    } else if (field === "estero") {
      setEstero(e.target.value);
    } else if (field === "nazionale") {
      checkChangeNazionale();
    } else if (field === "codtipopagamento") {
      setCodtipopagamento(e.target.value);
    } else if (field === "CodCategoriaSconto") {
      setCodCategoriaSconto(e.target.value);
    } else if (field === "cli_for") {
      setCli_for(e.target.value);
    } else if (field === "vettore") {
      checkChangeVettore();
    } else if (field === "tipo_cliente") {
      setTipo_cliente(e.target.value);
    } else if (field === "scontopredlistino") {
      setScontopredlistino(e.target.value);
    }
  };

  const handleSubmitCreaAnagrafica = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaAnagrafica`,
        {
          ragionesociale,
          partitaiva,
          codicefiscale,
          localita,
          indirizzo,
          prov,
          cap,
          telefono1,
          telefono2,
          fax,
          email,
          attivo,
          estero,
          nazionale,
          codtipopagamento,
          CodCategoriaSconto,
          cli_for,
          vettore,
          tipo_cliente,
          scontopredlistino,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setAnagraficaList([...anagraficaList, data.data]);
      setRagionesociale("");
      setPartitaiva("");
      setCodicefiscale("");
      setLocalita("");
      setIndirizzo("");
      setProv("");
      setCap("");
      setTelefono1("");
      setTelefono2("");
      setFax("");
      setEmail("");
      setAttivo(false);
      setEstero("");
      setNazionale(false);
      setCodtipopagamento(0);
      setCodCategoriaSconto(0);
      setCli_for(0);
      setVettore(false);
      setTipo_cliente(0);
      setScontopredlistino("");
      setIdanagrafica(null);
      navigate("/anagrafica");
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    handleInputChange();
  }, [isCheckedAttivo,isCheckedNazionale,isCheckedVettore]);



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
          onSubmit={handleSubmitCreaAnagrafica}
          style={{ maxWidth: "800px" }}
        >
          <Row>
            <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
              <Form.Label htmlFor="ragionesociale">Descrizione</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "ragionesociale")
                }
                type="textbox"
                maxlength={255}
                
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="partitaiva">Paritita IVA</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "partitaiva")
                }
                type="textbox"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="codicefiscale">Codice Fiscale</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "codicefiscale")
                }
                maxlength={255}
                type="textbox"
              />
            </Form.Group>
          
          </Row>
          <Row>
          <Form.Group className="mb-3" >
              <Form.Label htmlFor="indirizzo">Indirizzo</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "indirizzo")
                }
                maxlength={255}
                type="textbox"
              />
            </Form.Group>
            </Row>
          
          <Row>
            <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="localita">Localita</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "localita")
                }
                maxlength={255}
                style={{width:"280px"}}
                type="textbox"
              />
            </Form.Group>
             
            </Col>
            <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="Prov">Prov</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "Prov")
                }
                style={{width:"40px"}}
                type="textbox"
                maxlength={2}
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="cap">cap</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "cap")
                }
                style={{width:"80px"}}
                type="textbox"
                maxlength={5}
              />
            </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="telefono1">telefono1</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "telefono1")
                }
                type="textbox"
                maxlength={50}
                style={{width:"auto"}}
              />
            </Form.Group>
            </Col>
          <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="telefono2">telefono2</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "telefono2")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
              />
            </Form.Group>
            </Col>
       
          </Row>

          <Row>
            <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="fax">fax</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "fax")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
              />
           </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3" >
            <Form.Label htmlFor="email">email</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "email")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
              />
           </Form.Group>
             
            </Col>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="estero">estero</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "estero")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={255}
                pattern="^\S{1,4}$"
               
              />
           </Form.Group>
          
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="nazionale"
                checked={!isCheckedNazionale}
                onChange={(e) => handleInputChange(e, "nazionale")}
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="codtipopagamento">Codice tipo pagamento</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "codtipopagamento")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
           </Form.Group>
        
          </Row>
          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="CodCategoriaSconto">Codice Categoria Sconto</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "CodCategoriaSconto")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
           </Form.Group>
        
          </Row>

          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="cli_for">cli_for</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "cli_for")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
           </Form.Group>
           
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Vettore"
                checked={!isCheckedVettore}
                onChange={(e) => handleInputChange(e, "vettore")}
              />
            </Form.Group>
          </Row>

          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="tipo_cliente">Tipo cliente</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "tipo_cliente")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
           </Form.Group>
           
          </Row>
          <Row>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="scontopredlistino">scontopredlistino</Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "scontopredlistino")
                }
                style={{width:"auto"}}
                type="textbox"
                maxlength={50}
              />
           </Form.Group>
         
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Attivo"
                checked={!isCheckedAttivo}
                onChange={(e) => handleInputChange(e, "attivo")}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3"></Row>

          <Button
            variant="primary"
            name="check"
            type="submit"
            // onSelect={checkChange}
            onClick={() => {
              window.alert("Anagrafica registrata");
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

export default CreaAnagrafica;
