import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
const Anagrafica = ({
  selectedElement,
  togglehandleCLose,
  handleRequestElementAnagrafica,
  toggleChooseSelectElementAnagrafica,
}) => {
  // console.log("selectedElementAnagrafica", selectedElement);
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
  const [attivo, setAttivo] = useState(true);
  const [estero, setEstero] = useState("");
  const [nazionale, setNazionale] = useState(true);
  const [codtipopagamento, setCodtipopagamento] = useState();
  const [CodCategoriaSconto, setCodCategoriaSconto] = useState();
  const [cli_for, setCli_for] = useState();
  const [tipo_cliente, setTipo_cliente] = useState();
  const [vettore, setVettore] = useState(true);
  const [scontopredlistino, setScontopredlistino] = useState("");

  const [editRagionesociale, setEditRagionesociale] = useState("");
  const [editPartitaiva, setEditPartitaiva] = useState("");
  const [editCodicefiscale, setEditCodicefiscale] = useState("");
  const [editLocalita, setEditLocalita] = useState("");
  const [editIndirizzo, setEditIndirizzo] = useState("");
  const [editProv, setEditProv] = useState("");
  const [editCap, setEditCap] = useState("");
  const [editTelefono1, setEditTelefono1] = useState("");
  const [editTelefono2, setEditTelefono2] = useState("");
  const [editFax, setEditFax] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAttivo, setEditAttivo] = useState("");
  const [editEstero, setEditEstero] = useState("");
  const [editNazionale, setEditNazionale] = useState("");
  const [editCodtipopagamento, setEditCodtipopagamento] = useState("");
  const [editCodCategoriaSconto, setEditCodCategoriaSconto] = useState("");
  const [editCli_for, setEditCli_for] = useState("");
  const [editVettore, setEditVettore] = useState("");
  const [editTipo_cliente, setEditTipo_cliente] = useState("");
  const [editScontopredlistino, setEditScontopredlistino] = useState("");

  const [selectIdanagrafica, setSelectIdanagrafica] = useState("");
  const [selectEditAnagrafica, setSelectEditAnagrafica] = useState("");

  const [anagraficaList, setAnagraficaList] = useState([]);
  const [selectedAnagrafica, setSelectedAnagrafica] = useState("");

  const navigate = useNavigate();

  const [isCheckedNazionale, setIsCheckedNazionale] = useState();
  const [isNazionale, setIsNazionale] = useState();
  const [isCheckedVettore, setIsCheckedVettore] = useState();
  const [isVettore, setIsVettore] = useState();
  const [isCheckedAttivo, setIsCheckedAttivo] = useState();
  const [isAttivo, setIsAttivo] = useState();

  const [visibilita, setVisibilita] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  // richiesta lettura database
  const fetchAnagrafiche = async () => {
    try {
      const data = await baseURL.get("/anagrafica", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { anagrafica } = data.data;
      setAnagraficaList(anagrafica);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchAnagrafiche();
  }, []);

  const handleEditAnagrafica = async (e) => {
    e.preventDefault();
    try {
      if (
        ragionesociale &&
        partitaiva &&
        codicefiscale &&
        localita &&
        indirizzo &&
        prov &&
        cap &&
        telefono1 &&
        telefono2 &&
        fax &&
        email &&
        attivo &&
        estero &&
        nazionale &&
        codtipopagamento &&
        CodCategoriaSconto &&
        cli_for &&
        vettore &&
        tipo_cliente &&
        scontopredlistino
      ) {
        const data = await baseURL.put(
          `/anagrafica/${idanagrafica}`,
          {
            ragionesociale: editRagionesociale,
            partitaiva: editPartitaiva,
            codicefiscale: editCodicefiscale,
            localita: editLocalita,
            indirizzo: editIndirizzo,
            prov: editProv,
            cap: editCap,
            telefono1: editTelefono1,
            telefono2: editTelefono2,
            fax: editFax,
            email: editEmail,
            attivo: editAttivo,
            estero: editEstero,
            nazionale: editNazionale,
            codtipopagamento: editCodtipopagamento,
            CodCategoriaSconto: editCodCategoriaSconto,
            cli_for: editCli_for,
            vettore: editVettore,
            tipo_cliente: editTipo_cliente,
            scontopredlistino: editScontopredlistino,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedAnagrafica = data.data;
        const updatedListAnagrafica = anagraficaList.map((anagrafica) => {
          if (anagrafica.idanagrafica === idanagrafica) {
            return (anagrafica = updatedAnagrafica);
          }
          return anagrafica;
        });
        setAnagraficaList(updatedListAnagrafica);
      }
      setSelectIdanagrafica(null);
      setEditRagionesociale("");
      setEditPartitaiva("");
      setEditCodicefiscale("");
      setEditLocalita("");
      setEditIndirizzo("");
      setEditProv("");
      setEditCap("");
      setEditTelefono1("");
      setEditTelefono2("");
      setEditFax("");
      setEditEmail("");
      // setEditAttivo("");
      setEditEstero("");
      // setEditNazionale("");
      setEditCodtipopagamento("");
      setEditCodCategoriaSconto("");
      setEditCli_for("");
      // setEditVettore("");
      setEditTipo_cliente("");
      setEditScontopredlistino("");

      setSelectEditAnagrafica("");

      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setVisibilita(visibilita ? false : true);
  };

  const toggleEditAnagrafica = (e, selectEditAnagrafica) => {
    setIdanagrafica(e.idanagrafica);
    setEditRagionesociale(e.ragionesociale);
    // setRagionesociale(e.ragionesociale);
    // setPartitaiva(e.partitaiva);
    setEditPartitaiva(e.partitaiva);
    // setCodicefiscale(e.codicefiscale.value);
    setEditCodicefiscale(e.codicefiscale.value);
    // setLocalita(e.localita);
    setEditLocalita(e.localita);
    setEditIndirizzo(e.indirizzo.value);
    // setIndirizzo(e.indirizzo.value);
    setEditProv(e.prov);
    // setProv(e.prov);
    // setCap(e.cap.value);
    setEditCap(e.cap.value);
    // setTelefono1(e.telefono1.value);
    setEditTelefono1(e.telefono1.value);
    // setTelefono2(e.telefono2.value);
    setEditTelefono2(e.telefono2.value);
    // setFax(e.fax);
    setEditFax(e.fax);
    // setEmail(e.email);
    setEditEmail(e.email);
    setEditAttivo(e.attivo);
    // setAttivo(e.attivo);
    // setIsAttivo(e.attivo);
    // setEstero(e.estero);
    setEditEstero(e.estero);
    // setNazionale(e.nazionale);
    setEditNazionale(e.nazionale);
    // setIsNazionale(e.nazionale);
    setEditCodtipopagamento(e.codtipopagamento);
    // setCodtipopagamento(e.codtipopagamento);
    // setCodCategoriaSconto(e.c);
    setEditCodCategoriaSconto(e.c);
    // setCli_for(e.CodCategoriaSconto);
    setEditCli_for(e.CodCategoriaSconto);
    // setVettore(e.vettore);
    setEditVettore(e.vettore);
    // setIsVettore(e.vettore);
    // setTipo_cliente(e.tipo_cliente);
    setEditTipo_cliente(e.tipo_cliente);
    // setScontopredlistino(e.scontopredlistino);
    setEditScontopredlistino(e.scontopredlistino);
    setSelectEditAnagrafica(selectEditAnagrafica);
  };

  const handleInputChange = (e, field) => {
    if (field === "editRagionesociale") {
      setEditRagionesociale(e.target.value);
    } else if (field === "editPartitaiva") {
      setEditPartitaiva(e.target.value);
    } else if (field === "editCodicefiscale") {
      setEditCodicefiscale(e.target.value);
    } else if (field === "editLocalita") {
      setEditLocalita(e.target.value);
    } else if (field === "editIndirizzo") {
      setEditIndirizzo(e.target.value);
    } else if (field === "editProv") {
      setEditProv(e.target.value);
    } else if (field === "editCap") {
      setEditCap(e.target.value);
    } else if (field === "editTelefono1") {
      setEditTelefono1(e.target.value);
    } else if (field === "editTelefono2") {
      setEditTelefono2(e.target.value);
    } else if (field === "editFax") {
      setEditFax(e.target.value);
    } else if (field === "editEmail") {
      setEditEmail(e.target.value);
    } else if (field === "editAttivo") {
      checkChangeAttivo();
    } else if (field === "editEstero") {
      setEditEstero(e.target.value);
    } else if (field === "editNazionale") {
      checkChangeNazionale();
    } else if (field === "editCodtipopagamento") {
      setEditCodtipopagamento(e.target.value);
    } else if (field === "editCodCategoriaSconto") {
      setEditCodCategoriaSconto(e.target.value);
    } else if (field === "editCli_for") {
      setEditCli_for(e.target.value);
    } else if (field === "editVettore") {
      checkChangeVettore();
    } else if (field === "editTipo_cliente") {
      setEditTipo_cliente(e.target.value);
    } else if (field === "editScontopredlistino") {
      setEditScontopredlistino(e.target.value);
    }
  };

  const checkChangeNazionale = () => {
    setIsNazionale(!isNazionale);
    setEditNazionale(isNazionale);
    // console.log("isNazionale", isNazionale);
  };

  const checkChangeVettore = () => {
    setIsVettore(!isVettore);
    setEditVettore(isVettore);
    // console.log("isVettore", isVettore);
  };
  const checkChangeAttivo = () => {
    setIsAttivo(!isAttivo);
    setEditAttivo(!isAttivo);
    console.log("isAttivo", isAttivo);
    console.log("editAttivo", editAttivo);
  };

  useEffect(() => {
    checkChangeNazionale();
  }, []);
  useEffect(() => {
    checkChangeVettore();
  }, []);
  useEffect(() => {
    checkChangeAttivo();
  }, []);

  const toggleSubmitFatturaDettagli = (e) => {
    if (selectedElement === false) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            toggleEditAnagrafica(e, "True");
            console.log("isAttivo",isAttivo);
          }}
        >
          Modifica
        </button>
      );
    } else {
      return (
        <div>
          <button
            style={{ marginRight: "80px" }}
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleRequestElementAnagrafica(
                e.idanagrafica,
                e.ragionesociale,
                e.partitaiva,
                e.indirizzo,
                e.localita,
                e.prov
              );
              toggleChooseSelectElementAnagrafica(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectIdanagrafica("");
              setSelectEditAnagrafica("");
            }}
          >
            Annulla
          </button>
        </div>
      );
    }
  };



  return (
    <>
      {/* titolo */}
      <section
        className="title"
        style={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {!selectedElement && (
          <div>
            <h1>Anagrafica</h1>
            <p>rivedere update</p>
          </div>
        )}

        <div>
          {selectIdanagrafica === "" && selectEditAnagrafica === "" && (
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Visibili Tutti"
                style={{
                  marginLeft: "100px",
                  paddingRight: "3px",
                  paddingLeft: "3px",
                  border: "solid",
                  borderColor: "green",
                  borderRadius: "5px",
                  borderWidth: "1px",
                }}
                checked={visibilita}
                onChange={handleCheckboxChange}
              />
            </Form>
          )}
        </div>
      </section>

      {/* modifica */}

      <section className="modifica">
        {anagraficaList.map((e) => {
          if (
            selectIdanagrafica === e.idanagrafica &&
            selectEditAnagrafica === "True"
          ) {
            return (
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Form
                  noValidate
                  // validated={validated}
                  onSubmit={handleEditAnagrafica}
                  style={{ maxWidth: "800px" }}
                >
                  <Row>
                    <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
                      <Form.Label htmlFor="editRagionesociale">
                        Descrizione
                      </Form.Label>
                      <Form.Control
                        value={editRagionesociale}
                        onChange={(e) =>
                          handleInputChange(e, "editRagionesociale")
                        }
                        type="textbox"
                        maxlength={255}
                        placeholder={e.ragionesociale}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editPartitaiva">
                        Paritita IVA
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleInputChange(e, "editPartitaiva")}
                        type="textbox"
                        value={editPartitaiva}
                        maxlength={255}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editCodicefiscale">
                        Codice Fiscale
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(e, "editCodicefiscale")
                        }
                        maxlength={255}
                        type="textbox"
                        value={editCodicefiscale}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editIndirizzo">Indirizzo</Form.Label>
                      <Form.Control
                        onChange={(e) => handleInputChange(e, "editIndirizzo")}
                        maxlength={255}
                        type="textbox"
                        value={editIndirizzo}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editLocalita">Localita</Form.Label>
                        <Form.Control
                          onChange={(e) => handleInputChange(e, "editLocalita")}
                          maxlength={255}
                          style={{ width: "280px" }}
                          type="textbox"
                          value={editLocalita}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editProv">Prov</Form.Label>
                        <Form.Control
                          onChange={(e) => handleInputChange(e, "editProv")}
                          style={{ width: "40px" }}
                          type="textbox"
                          maxlength={2}
                          value={editProv}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editCap">cap</Form.Label>
                        <Form.Control
                          onChange={(e) => handleInputChange(e, "editCap")}
                          style={{ width: "80px" }}
                          type="textbox"
                          maxlength={5}
                          value={editCap}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editTelefono1">
                          telefono1
                        </Form.Label>
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(e, "editTelefono1")
                          }
                          type="textbox"
                          maxlength={50}
                          style={{ width: "auto" }}
                          value={editTelefono1}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editTelefono2">
                          telefono2
                        </Form.Label>
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(e, "editTelefono2")
                          }
                          style={{ width: "auto" }}
                          type="textbox"
                          maxlength={50}
                          value={editTelefono2}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editFax">fax</Form.Label>
                        <Form.Control
                          onChange={(e) => handleInputChange(e, "editFax")}
                          style={{ width: "auto" }}
                          type="textbox"
                          maxlength={50}
                          value={editFax}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="editEmail">email</Form.Label>
                        <Form.Control
                          onChange={(e) => handleInputChange(e, "editEmail")}
                          style={{ width: "auto" }}
                          type="textbox"
                          maxlength={50}
                          value={editEmail}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editEstero">estero</Form.Label>
                      <Form.Control
                        onChange={(e) => handleInputChange(e, "editEstero")}
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={255}
                        pattern="^\S{1,4}$"
                        value={editEstero}
                      />
                    </Form.Group>
                  </Row>
{/* ---------------------------- */}
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="editNazionale"
                        checked={!isNazionale}
                        onChange={(e) => {
                          handleInputChange(e, "editNazionale");
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editCodtipopagamento">
                        Codice tipo pagamento
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(e, "editCodtipopagamento")
                        }
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={50}
                        pattern="^\S{1,4}$"
                        placeholder={e.codtipopagamento}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editCodCategoriaSconto">
                        Codice Categoria Sconto
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(e, "editCodCategoriaSconto")
                        }
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={50}
                        pattern="^\S{1,4}$"
                        placeholder={e.CodCategoriaSconto}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editCli_for">cli_for</Form.Label>
                      <Form.Control
                        onChange={(e) => handleInputChange(e, "editCli_for")}
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={50}
                        pattern="^\S{1,4}$"
                        placeholder={e.cli_for}
                      />
                    </Form.Group>
                  </Row>
{/* ---------------------------- */}
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="editVettore"
                        checked={!isVettore}
                        onChange={(e) => {
                          handleInputChange(e, "editVettore");
                          // setVettore(e.target.checked ? true : false);
                        }}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editTipo_cliente">
                        Tipo cliente
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(e, "editTipo_cliente")
                        }
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={50}
                        pattern="^\S{1,4}$"
                        placeholder={e.tipo_cliente}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="editScontopredlistino">
                        scontopredlistino
                      </Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(e, "editScontopredlistino")
                        }
                        style={{ width: "auto" }}
                        type="textbox"
                        maxlength={50}
                        placeholder={e.scontopredlistino}
                      />
                    </Form.Group>
                  </Row>
{/* ---------------------------- */}
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="editAttivo"
                        checked={!isAttivo}
                        onChange={(e) => {
                          // setAttivo(e.target.checked ? true : false);
                          handleInputChange(e, "editAttivo");
                        }}
                      />
                    </Form.Group>
                  </Row>

                  <Button
                    variant="primary"
                    name="check"
                    type="submit"
                    // onSelect={checkChange}
                    onClick={() => {
                    }}
                  >
                    Applica Modifica
                  </Button>
                  <Button
                    variant="success"
                    name="annulla"
                    type="button"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      setSelectIdanagrafica(e.idanagrafica);
                      setSelectEditAnagrafica("False");
                    }}
                  >
                    Annulla
                  </Button>
                </Form>
              </div>
            );
          }
        })}
      </section>

      {/* dettagli */}
      <section
        className="dettagliAnagrafica"
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
          justifyContent: "center",
          maxWidth: "500px",
        }}
      >
        {anagraficaList.map((e) => {
          if (
            selectIdanagrafica === e.idanagrafica &&
            selectEditAnagrafica === "False"
          ) {
            return (
              <div
                key={e.idanagrafica}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <p>{toggleSubmitFatturaDettagli(e)}</p>
                <h2>Denominazione: {e.ragionesociale} </h2>
                <p>Partita Iva: {e.partitaiva}</p>
                <p>Codice Fiscale: {e.codicefiscale}</p>
                <p>Località: {e.localita}</p>
                <p>Indirizzo: {e.indirizzo}</p>
                <p>Provincia: {e.prov}</p>
                <p>CAP: {e.cap}</p>
                <p>Numero Telefono: {e.telefono1} </p>
                <p>Numero Telefono: {e.telefono2}</p>
                <p>Fax: {e.fax}</p>
                <p>Email: {e.email}</p>
                <p>attivo: {e.attivo}</p>
                <p>estero: {e.estero}</p>
                <p>nazionale: {e.nazionale}</p>
                <p>codtipopagamento: {e.codtipopagamento}</p>
                <p>CodCategoriaSconto: {e.CodCategoriaSconto}</p>
                <p>cli_for: {e.cli_for}</p>
                <p>vettore: {e.vettore}</p>
                <p>tipo_cliente: {e.tipo_cliente}</p>
                <p>scontopredlistino: {e.scontopredlistino}</p>
              </div>
            );
          }
        })}
      </section>

      {/* lista */}

      <section className="lista">
        {anagraficaList.map((e) => {
          if (
            selectIdanagrafica === "" &&
            selectEditAnagrafica === "" &&
            visibilita === false
            && e.attivo === true
          ) {
            return (
              <ul key={e.idanagrafica}>
                <li
                  style={{
                    listStyleType: "none",
                    maxWidth: "1000px",
                    display: "flex",
                    alignContent: "row",
                    border: "solid",
                    borderRadius: "10px",
                    borderWidth: "1px",
                  }}
                >
                  <div
                    style={{
                      width: "1000px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                    visibilita === false
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      {e.ragionesociale}
                    </div>
                    <div style={{ marginRight: "10px" }}>{e.indirizzo}</div>
                    <div style={{ marginRight: "10px" }}>{e.prov}</div>
                    <div style={{ marginRight: "10px" }}>
                    nazionale ={e.nazionale?" true":" false"}
                    </div>
                    <div style={{ marginRight: "10px" }}>
                    vettore = {e.vettore?" true":" false"}
                    </div>
                    <div style={{ marginRight: "10px" }}>
                   attivo ={e.attivo?" true":" false"}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectIdanagrafica(e.idanagrafica);
                        setSelectEditAnagrafica("False");
                        setIsNazionale(!e.nazionale);
                        setIsVettore(!e.vettore);
                        setIsAttivo(!e.attivo);
                        console.log("isAttivo",isAttivo);
                      }}
                    >
                      Dettagli
                    </button>
                  </div>
                </li>
              </ul>
            );
          }else  if (
            selectIdanagrafica === "" &&
            selectEditAnagrafica === "" &&
            visibilita === true
            
          ){
            return (
              <ul key={e.idanagrafica}>
                <li
                  style={{
                    listStyleType: "none",
                    maxWidth: "1000px",
                    display: "flex",
                    alignContent: "row",
                    border: "solid",
                    borderRadius: "10px",
                    borderWidth: "1px",
                  }}
                >
                  <div
                    style={{
                      width: "1000px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                      <div style={{ marginRight: "10px" }}>
                      visibilita === true
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      {e.ragionesociale}
                    </div>
                    <div style={{ marginRight: "10px" }}>{e.indirizzo}</div>
                    <div style={{ marginRight: "10px" }}>{e.prov}</div>
                    <div style={{ marginRight: "10px" }}>
                    nazionale ={e.nazionale?" true":" false"}
                    </div>
                    <div style={{ marginRight: "10px" }}>
                    vettore = {e.vettore?" true":" false"}
                    </div>
                    <div style={{ marginRight: "10px" }}>
                   attivo ={e.attivo?" true":" false"}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectIdanagrafica(e.idanagrafica);
                        setSelectEditAnagrafica("False");
                        setIsNazionale(!e.nazionale);
                        setIsVettore(!e.vettore);
                        setIsAttivo(!e.attivo);
                      }}
                    >
                      Dettagli
                    </button>
                  </div>
                </li>
              </ul>
            );
          }
        })}
      </section>
    </>
  );
};

export default Anagrafica;
