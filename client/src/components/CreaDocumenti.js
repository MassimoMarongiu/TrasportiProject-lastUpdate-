import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const CreaDocumenti = () => {
  const [IdDocumento, setIdDocumento] = useState("");
  const [CodTipoDocumento, setCodTipoDocumento] = useState("");
  const [Numero, setNumero] = useState("");
  const [DataDocumento, setDataDocumento] = useState("");
  const [CodAgente, setCodAgente] = useState("");
  const [CodIntestatario, setCodIntestatario] = useState("");
  const [intestatario_ragionesociale, setIntestatario_ragionesociale] =
    useState("");
  const [intestatario_partitaiva, setIntestatario_partitaiva] = useState("");
  const [intestatario_codicefiscale, setIntestatario_codicefiscale] =
    useState("");
  const [intestatario_localita, setIntestatario_localita] = useState("");
  const [intestatario_prov, setIntestatario_prov] = useState("");
  const [intestatario_indirizzo, setIntestatario_indirizzo] = useState("");
  const [intestatario_cap, setIntestatario_cap] = useState("");
  const [DataAccettazione, setDataAccettazione] = useState("");
  const [PreAttivo, setPreAttivo] = useState("");
  const [DDT_Destinazione, setDDT_Destinazione] = useState("");
  const [ddt_indirizzo, setDdt_indirizzo] = useState("");
  const [ddt_localita, setDdt_localita] = useState("");
  const [ddt_cap, setDdt_cap] = useState("");
  const [ddt_prov, setDdt_prov] = useState("");
  const [CodModPagamento, setCodModPagamento] = useState("");
  const [DDT_Vettore, setDDT_Vettore] = useState("");
  const [DDT_TrasportoMezzo, setDDT_TrasportoMezzo] = useState("");
  const [DDT_AspettoBeni, setDDT_AspettoBeni] = useState("");
  const [DDT_NumeroColli, setDDT_NumeroColli] = useState("");
  const [DDT_DataOraInizio, setDDT_DataOraInizio] = useState("");
  const [DDT_DataOraRitiro, setDDT_DataOraRitiro] = useState("");
  const [DDT_Porto, setDDT_Porto] = useState("");
  const [DDT_CausaleTrasporto, setDDT_CausaleTrasporto] = useState("");
  const [accompagnatoria, setAccompagnatoria] = useState(false);
  const [codddt, setCodddt] = useState("");
  const [RifDDT, setRifDDT] = useState("");
  const [Attivo, setAttivo] = useState("");
  const [Imponibile, setImponibile] = useState("");
  const [IVA, setIVA] = useState("");
  const [Totale, setTotale] = useState("");
  const [Tipologia, setTipologia] = useState("");
  const [QuantitaPeso, setQuantitaPeso] = useState("");
  const [LuogoCarico, setLuogoCarico] = useState("");
  const [LuogoScarico, setLuogoScarico] = useState("");

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

  const handleInputChange = (e, field) => {
    if (field === "CodTipoDocumento") {
      setCodTipoDocumento(e.target.value);
    } else if (field === "Numero") {
      setNumero(e.target.value);
    } else if (field === "DataDocumento") {
      setDataDocumento(e.target.value);
    } else if (field === "CodAgente") {
      setCodAgente(e.target.value);
    } else if (field === "CodIntestatario") {
      setCodIntestatario(e.target.value);
    } else if (field === "Intestatario_ragionesociale") {
      setIntestatario_ragionesociale(e.target.value);
    } else if (field === "Intestatario_partitaiva") {
      setIntestatario_partitaiva(e.target.value);
    } else if (field === "Intestatario_codicefiscale") {
      setIntestatario_codicefiscale(e.target.value);
    } else if (field === "intestatario_localita") {
      setIntestatario_localita(e.target.value);
    } else if (field === "Intestatario_prov") {
      setIntestatario_prov(e.target.value);
    } else if (field === "Intestatario_indirizzo") {
      setIntestatario_indirizzo(e.target.value);
    } else if (field === "Intestatario_cap") {
      setIntestatario_cap(e.target.value);
    } else if (field === "DataAccettazione") {
      setDataAccettazione(e.target.value);
    } else if (field === "PreAttivo") {
      setPreAttivo(e.target.value);
    } else if (field === "DDT_Destinazione") {
      setDDT_Destinazione(e.target.value);
    } else if (field === "Ddt_indirizzo") {
      setDdt_indirizzo(e.target.value);
    } else if (field === "Ddt_localita") {
      setDdt_localita(e.target.value);
    } else if (field === "Ddt_cap") {
      setDdt_cap(e.target.value);
    } else if (field === "Ddt_prov") {
      setDdt_prov(e.target.value);
    } else if (field === "CodModPagamento") {
      setCodModPagamento(e.target.value);
    } else if (field === "DDT_Vettore") {
      setDDT_Vettore(e.target.value);
    } else if (field === "DDT_TrasportoMezzo") {
      setDDT_TrasportoMezzo(e.target.value);
    } else if (field === "DDT_AspettoBeni") {
      setDDT_TrasportoMezzo(e.target.value);
    } else if (field === "DDT_NumeroColli") {
      setDDT_NumeroColli(e.target.value);
    } else if (field === "DDT_DataOraInizio") {
      setDDT_DataOraInizio(e.target.value);
    } else if (field === "DDT_DataOraRitiro") {
      setDDT_DataOraRitiro(e.target.value);
    } else if (field === "DDT_Porto") {
      setDDT_Porto(e.target.value);
    } else if (field === "DDT_CausaleTrasporto") {
      setDDT_CausaleTrasporto(e.target.value);
    } else if (field === "Accompagnatoria") {
      setAccompagnatoria(e.target.value);
    } else if (field === "Codddt") {
      setCodddt(e.target.value);
    } else if (field === "RifDDT") {
      setRifDDT(e.target.value);
    } else if (field === "Attivo") {
      setAttivo(e.target.value);
    } else if (field === "Imponibile") {
      setImponibile(e.target.value);
    } else if (field === "IVA") {
      setIVA(e.target.value);
    } else if (field === "Totale") {
      setTotale(e.target.value);
    } else if (field === "Tipologia") {
      setTipologia(e.target.value);
    } else if (field === "QuantitaPeso") {
      setQuantitaPeso(e.target.value);
    } else if (field === "LuogoCarico") {
      setLuogoCarico(e.target.value);
    } else if (field === "LuogoScarico") {
      setLuogoScarico(e.target.value);
    }
  };

  useEffect(() => {
    handleInputChange();
  });

  const handleSubmitDocumento = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaDocumento`,
        {
          CodTipoDocumento,
          Numero,
          DataDocumento,
          CodAgente,
          CodIntestatario,
          intestatario_ragionesociale,
          intestatario_partitaiva,
          intestatario_codicefiscale,
          intestatario_localita,
          intestatario_prov,
          intestatario_indirizzo,
          intestatario_cap,
          DataAccettazione,
          PreAttivo,
          DDT_Destinazione,
          ddt_indirizzo,
          ddt_localita,
          ddt_cap,
          ddt_prov,
          CodModPagamento,
          DDT_Vettore,
          DDT_TrasportoMezzo,
          DDT_AspettoBeni,
          DDT_NumeroColli,
          DDT_DataOraInizio,
          DDT_DataOraRitiro,
          DDT_Porto,
          DDT_CausaleTrasporto,
          accompagnatoria,
          codddt,
          RifDDT,
          Attivo,
          Imponibile,
          IVA,
          Totale,
          Tipologia,
          QuantitaPeso,
          LuogoCarico,
          LuogoScarico,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setAnagraficaList([...anagraficaList, data.data]);
      setIdDocumento("");
      setNumero("");
      setDataDocumento("");
      setCodAgente("");
      setCodIntestatario("");
      setIntestatario_ragionesociale("");
      setIntestatario_partitaiva("");
      setIntestatario_codicefiscale("");
      setIntestatario_localita("");
      setIntestatario_prov("");
      setIntestatario_indirizzo("");
      setIntestatario_cap("");
      setDataAccettazione("");
      setPreAttivo("");
      setDDT_Destinazione("");
      setDdt_indirizzo("");
      setDdt_localita("");
      setDdt_cap("");
      setDdt_prov("");
      setCodModPagamento("");
      setDDT_Vettore("");
      setDDT_TrasportoMezzo("");
      setDDT_AspettoBeni("");
      setDDT_NumeroColli("");
      setDDT_DataOraInizio("");
      setDDT_DataOraRitiro("");
      setDDT_Porto("");
      setDDT_CausaleTrasporto("");
      setAccompagnatoria("");
      setCodddt("");
      setRifDDT("");
      setAttivo("");
      setImponibile("");
      setIVA("");
      setTotale("");
      setTipologia("");
      setQuantitaPeso("");
      setLuogoCarico("");
      setLuogoScarico("");
      navigate("/documenti");
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
          onSubmit={handleSubmitDocumento}
          style={{ maxWidth: "800px" }}
        >
          <Row>
            <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
              <Form.Label htmlFor="CodTipoDocumento">
                CodTipoDocumento
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodTipoDocumento")}
                type="number"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Numero">Numero</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "Numero")}
                type="number"
                maxlength={255}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DataDocumento">Data Documento</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DataDocumento")}
                maxlength={255}
                type="date"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="CodAgente">Codice Agente</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodAgente")}
                maxlength={255}
                type="number"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="CodIntestatario">
                Codice Intestatario
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodIntestatario")}
                maxlength={255}
                type="textbox"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_ragionesociale">
                intestatario_ragionesociale
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "intestatario_ragionesociale")
                }
                type="textbox"
                maxlength={2}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_codicefiscale">
                intestatario_codicefiscale
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  handleInputChange(e, "intestatario_codicefiscale")
                }
                type="textbox"
                maxlength={5}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_localita">
                intestatario_localita
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "intestatario_localita")}
                type="textbox"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_prov">
                intestatario_prov
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "intestatario_prov")}
                type="textbox"
                maxlength={2}
                style={{ width: "40px" }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_indirizzo">
                intestatario_indirizzo
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "intestatario_indirizzo")}
                type="textbox"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="intestatario_cap">
                intestatario_cap
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "intestatario_cap")}
                style={{ width: "80px" }}
                type="textbox"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DataAccettazione">
                DataAccettazione
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DataAccettazione")}
                style={{ width: "auto" }}
                type="date"
                maxlength={255}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="PreAttivo"
                checked={!PreAttivo ? false : true}
                onChange={(e) => handleInputChange(e, "PreAttivo")}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_Destinazione">
                DDT Destinazione
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_Destinazione")}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ddt_indirizzo">ddt indirizzo</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ddt_indirizzo")}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ddt_localita">ddt localita</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ddt_localita")}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ddt_cap">ddt_cap</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ddt_cap")}
                style={{ width: "80px" }}
                type="textbox"
                maxlength={50}
                pattern="^\S{1,4}$"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ddt_prov">ddt_prov</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "ddt_prov")}
                style={{ width: "auto" }}
                type="textbox"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="CodModPagamento">CodModPagamento</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodModPagamento")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_Vettore">DDT_Vettore</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_Vettore")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_TrasportoMezzo">
                DDT_TrasportoMezzo
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_TrasportoMezzo")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_AspettoBeni">DDT_AspettoBeni</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_AspettoBeni")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_NumeroColli">DDT_NumeroColli</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_NumeroColli")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_DataOraInizio">
                DDT_DataOraInizio
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_DataOraInizio")}
                style={{ width: "auto" }}
                type="date"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_DataOraRitiro">
                DDT_DataOraRitiro
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_DataOraRitiro")}
                style={{ width: "auto" }}
                type="date"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_Porto">DDT_Porto</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodModPagamento")}
                style={{ width: "auto" }}
                type="string"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="DDT_CausaleTrasporto">
                DDT_CausaleTrasporto
              </Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "DDT_CausaleTrasporto")}
                style={{ width: "auto" }}
                type="text"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="codddt">codddt</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "codddt")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="RifDDT">RifDDT</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "RifDDT")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="RifDDT">RifDDT</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "RifDDT")}
                style={{ width: "auto" }}
                type="checkbox"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Imponibile">Imponibile</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "Imponibile")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="IVA">IVA</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "IVA")}
                style={{ width: "auto" }}
                type="float"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Totale">Totale</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "Totale")}
                style={{ width: "auto" }}
                type="float"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="CodModPagamento">CodModPagamento</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "CodModPagamento")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Tipologia">Tipologia</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "Tipologia")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="QuantitaPeso">QuantitaPeso</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "QuantitaPeso")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="LuogoCarico">LuogoCarico</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "LuogoCarico")}
                style={{ width: "auto" }}
                type="number"
                maxlength={50}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="LuogoScarico">LuogoScarico</Form.Label>
              <Form.Control
                onChange={(e) => handleInputChange(e, "LuogoScarico")}
                style={{ width: "auto" }}
                type="number"
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

          {/* <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="accomagnatoria"
                checked={!accompagnatoria ? false : true}
                onChange={(e) => handleInputChange(e, "accomagnatoria")}
              />
            </Form.Group>
          </Row> */}

          <Button
            variant="primary"
            name="check"
            type="submit"
            // onSelect={checkChange}
            onClick={() => {
              window.alert("Documento creato con successo");
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

export default CreaDocumenti;
