import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

function TipoPagamento({
  selectedElement,
  togglehandleCLose,
  handleRequestElementTipoPagamento,
  toggleChooseSelectElementTipoPagamento,
}) {
  const [idtipopagamento, setIdtipopagamento] = useState("");
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
  const [codtipodeposito, setCodtipodeposito] = useState("");
  const [visibile, setVisibile] = useState("");
  
  const [editDescrizione, setEditDescrizione] = useState("");
  const [editGgrata1, setEditGgrata1] = useState("");
  const [editFmrata1, setEditFmrata1] = useState("");
  const [editPercrata1, setEditPercrata1] = useState("");
  const [editGgrata2, setEditGgrata2] = useState("");
  const [editFmrata2, setEditFmrata2] = useState("");
  const [editPercrata2, setEditPercrata2] = useState("");
  const [editGgrata3, setEditGgrata3] = useState("");
  const [editFmrata3, setEditFmrata3] = useState("");
  const [editPercrata3, setEditPercrata3] = useState("");
  const [editCodDeposito, setEditCodDeposito] = useState("");
  const [editVisibile, setEditVisibile] = useState("");
  const [editCodtipodeposito, setEditCodtipodeposito] = useState("");

  const [selectedTipoPagamento, setSelectedTipoPagamento] = useState("");
  const [selectEditTipoPagamento, setSelectEditTipoPagamento] = useState("");
  const [tipoPagamentoList, setTipoPagamentoList] = useState([]);
  
  const [isChecked, setIsChecked] = useState();
  const [visibilita, setVisibilita] = useState(true);
  const [isVisibile, setIsVisibile] = useState(false);

  // const [visibilita, setVisibilita] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const navigate = useNavigate();

  const fetchTIpoPagamento = async () => {
    try {
      const data = await baseURL.get("/tipoPagamento", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { tipoPagamento } = data.data;
      setTipoPagamentoList(tipoPagamento);
      // const t = data.data;
      // console.log(t);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchTIpoPagamento();
  }, []);

  const handleEditTipoPagamento = async (e) => {
    e.preventDefault();
    try {
      if (
        editDescrizione &&
        editGgrata1 &&
        editFmrata1 &&
        editPercrata1 &&
        editGgrata2 &&
        editFmrata2 &&
        editPercrata2 &&
        editGgrata3 &&
        editFmrata3 &&
        editPercrata3 &&
        editCodDeposito &&
        editCodtipodeposito 
        // &&
        // editVisibile
        
      ) {
        const dataTipoPagamento = await baseURL.put(
          `/tipoPagamento/${idtipopagamento}`,
          {
            descrizione: editDescrizione,
            ggrata1: editGgrata1,
            fmrata1: editFmrata1,
            percrata1: editPercrata1,
            ggrata2: editGgrata1,
            fmrata2: editFmrata2,
            percrata2: editPercrata2,
            ggrata3: editGgrata3,
            fmrata3: editFmrata3,
            percrata3: editPercrata3,
            codDeposito: editCodDeposito,
            codtipodeposito: editCodtipodeposito,
            visibile: editVisibile,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedTipoPagamento = dataTipoPagamento.data;
        const updatedListTipoPAgamento = tipoPagamentoList.map(
          (tipoPagamento) => {
            if (tipoPagamento.idtipopagamento === idtipopagamento) {
              return (tipoPagamento = updatedTipoPagamento);
            }
            return tipoPagamento;
          }
        );
        setTipoPagamentoList(updatedListTipoPAgamento);
      }
      // setSelectedTipoPagamento(idtipopagamento);
      // setSelectEditTipoPagamento("False");
      setIdtipopagamento(null);
      setEditDescrizione("");
      setEditGgrata1("");
      setEditFmrata1("");
      setEditPercrata1("");
      setEditGgrata2("");
      setEditFmrata2("");
      setEditPercrata2("");
      setEditGgrata3("");
      setEditFmrata3("");
      setEditPercrata3("");
      setEditCodDeposito("");
      setEditCodtipodeposito("");
      // setEditVisibile("");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsVisibile(!isVisibile);
    // const visibilita = isVisibile ? setVisibilita(1) : setVisibilita(0);
    setVisibilita(visibilita ? false : true);
  };

  useEffect(() => {
    handleCheckboxChange();
  }, []);

  const toggleEditTipoPagamento = (e, selectedEditTipoPagamento) => {
    setIdtipopagamento(e.idtipopagamento);
    setEditDescrizione(e.descrizione);
    setEditGgrata1(e.ggrata1);
    setEditFmrata1(e.fmrata1);
    setEditPercrata1(e.percrata1);
    setEditGgrata2(e.ggrata2);
    setEditFmrata2(e.fmrata2);
    setEditPercrata2(e.percrata2);
    setEditGgrata3(e.ggrata3);
    setEditFmrata3(e.fmrata3);
    setEditPercrata3(e.percrata3);
    setEditCodDeposito(e.codDeposito);
    setEditVisibile(e.visibile);
    setEditCodtipodeposito(e.codtipodeposito);
    setSelectEditTipoPagamento(selectedEditTipoPagamento);
  };

  const handleInputChange = (e, field) => {
    if (field === "editDescrizione") {
      setEditDescrizione(e.target.value);
    } else if (field === "editGgrata1") {
      setEditGgrata1(e.target.value);
    } else if (field === "editFmrata1") {
      setEditFmrata1(e.target.value);
    } else if (field === "editPercrata1") {
      setEditPercrata1(e.target.value);
    } else if (field === "editGgrata2") {
      setEditGgrata2(e.target.value);
    } else if (field === "editFmrata2") {
      setEditFmrata2(e.target.value);
    } else if (field === "editPercrata2") {
      setEditPercrata2(e.target.value);
    } else if (field === "editGgrata3") {
      setEditGgrata3(e.target.value);
    } else if (field === "editFmrata3") {
      setEditFmrata3(e.target.value);
    } else if (field === "editPercrata3") {
      setEditPercrata3(e.target.value);
    } else if (field === "editCodDeposito") {
      setEditCodDeposito(e.target.value);
    } else if (field === "editVisibile") {
      checkChange();
    } else if (field === "editCodtipodeposito") {
      setEditCodtipodeposito(e.target.value);
    }
  };

  const checkChange = () => {
    setIsChecked(!isChecked);
    console.log("checkChange");
    console.log("isChecked", isChecked);
    if (isChecked === false) {
      setEditVisibile(0);
    } else {
      setEditVisibile(1);
    }
    console.log("editVisibile", editVisibile);
  };

  useEffect(() => {
    checkChange();
  }, [visibile]);

  const toggleSubmitFatturaDettagli = (e) => {
    if (selectedElement === false) {
      return (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              toggleEditTipoPagamento(e, "True");
              // console.log("toggleSubmitFatturaDettagli");
              // console.log("isChecked", isChecked);
              // console.log("e.visibile", e.visibile);
              // console.log("editvisibile", editVisibile);
            }}
          >
            Modifica
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            style={{ marginRight: "80px" }}
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleRequestElementTipoPagamento(
                e.idtipopagamento,
                e.descrizione,
                e.codtipodeposito,
                e.ggrata1,
                e.fmrata1,
                e.percrata1
              );
              toggleChooseSelectElementTipoPagamento(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedTipoPagamento("");
              setSelectEditTipoPagamento("");
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
            <h1>Tipo Pagamento</h1>
            <p>tutto ok</p>
          </div>
        )}
        <div>
          {selectedTipoPagamento === "" && selectEditTipoPagamento === "" && (
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
        {tipoPagamentoList.map((e) => {
          if (
            selectedTipoPagamento === e.idtipopagamento &&
            selectEditTipoPagamento === "True"
          ) {
            return (
              <>
                <div
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <h1>Modifica</h1>
                  <ul 
                  // key={e.idtipopagamento}
                  >
                    <Form
                      onSubmit={handleEditTipoPagamento}
                      // key={e.idtipopagamento}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "auto",
                        marginRight: "auto",
                        justifyContent: "center",
                        maxWidth: "500px",
                      }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                          type="text"
                          name="editDescrizione"
                          value={editDescrizione}
                          onChange={(e) =>
                            handleInputChange(e, "editDescrizione")
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ggrata1</Form.Label>
                        <Form.Control
                          type="text"
                          name="editGgrata1"
                          value={editGgrata1}
                          onChange={(e) => handleInputChange(e, "editGgrata1")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fmrata1</Form.Label>
                        <Form.Control
                          type="text"
                          name="editFmrata1"
                          value={editFmrata1}
                          onChange={(e) => handleInputChange(e, "editFmrata1")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Percrata1</Form.Label>
                        <Form.Control
                          type="text"
                          name="editPercrata1"
                          value={editPercrata1}
                          onChange={(e) =>
                            handleInputChange(e, "editPercrata1")
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ggrata2</Form.Label>
                        <Form.Control
                          type="text"
                          name="editGgrata2"
                          value={editGgrata2}
                          onChange={(e) => handleInputChange(e, "editGgrata2")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fmrata2</Form.Label>
                        <Form.Control
                          type="text"
                          name="editFmrata2"
                          value={editFmrata2}
                          onChange={(e) => handleInputChange(e, "editFmrata2")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Percrata2</Form.Label>
                        <Form.Control
                          type="text"
                          name="editPercrata2"
                          value={editPercrata2}
                          onChange={(e) =>
                            handleInputChange(e, "editPercrata2")
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ggrata3</Form.Label>
                        <Form.Control
                          type="text"
                          name="editGgrata3"
                          value={editGgrata3}
                          onChange={(e) => handleInputChange(e, "editGgrata3")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fmrata3</Form.Label>
                        <Form.Control
                          type="text"
                          name="editFmrata3"
                          value={editFmrata3}
                          onChange={(e) => handleInputChange(e, "editFmrata3")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Percrata3</Form.Label>
                        <Form.Control
                          type="text"
                          name="editPercrata3"
                          value={editPercrata3}
                          onChange={(e) =>
                            handleInputChange(e, "editPercrata3")
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Codice Tipo Deposito</Form.Label>
                        <Form.Control
                          type="text"
                          name="editCodtipodeposito"
                          value={editCodtipodeposito}
                          onChange={(e) =>
                            handleInputChange(e, "editCodtipodeposito")
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Codice Deposito</Form.Label>
                        <Form.Control
                          type="text"
                          name="editCodDeposito"
                          value={editCodDeposito}
                          onChange={(e) =>
                            handleInputChange(e, "editCodDeposito")
                          }
                        />
                      </Form.Group>

{/*-------------------------checkbox */}                     
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          // key={e.iddescrizione}
                          type="checkbox"
                          label="Visibile"
                          checked={!isChecked}
                          onChange={(e) => {
                            handleInputChange(e, "editVisibile");
                          }}
                        />
                      </Form.Group>
{/*-------------------------checkbox */}

                      {/* bottone applica modifica */}

                      <Button
                        variant="primary"
                        name="check"
                        type="submit"
                        // onClick={}
                      >
                        Applica Modifica
                      </Button>

                      {/* bottone annulla modifica */}
                      <Button
                        style={{ marginTop: "10px" }}
                        variant="success"
                        name="check"
                        type="button"
                        onClick={() => {
                          // setSelectedTipoBolla(e.idtipobolla);
                          // setSelectedEditTipoBolla("False");
                          setSelectedTipoPagamento("");
                          setSelectEditTipoPagamento("");
                        }}
                      >
                        Annulla
                      </Button>
                    </Form>
                  </ul>
                </div>
              </>
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
        {tipoPagamentoList.map((e) => {
          if (
            selectedTipoPagamento === e.idtipopagamento &&
            selectEditTipoPagamento === "False"
          ) {
            return (
              <div
                key={e.idtipopagamento}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <p>{toggleSubmitFatturaDettagli(e)}</p>
                <h2>{e.descrizione}</h2>
                <p>ggrata1: {e.ggrata1}</p>
                <p>fmrata1: {e.fmrata1}</p>
                <p>percrata1: {e.percrata1}</p>
                <p>ggrata2: {e.ggrata2}</p>
                <p>fmrata2: {e.fmrata2}</p>
                <p>percrata2: {e.percrata2}</p>
                <p>ggrata3: {e.ggrata3}</p>
                <p>fmrata3: {e.fmrata3}</p>
                <p>percrata3: {e.percrata3}</p>
                <p>codDeposito: {e.codDeposito}</p>
                <p>visibile: {e.visibile}</p>
                <p>codtipodeposito: {e.codtipodeposito}</p>
              </div>
            );
          }
        })}
      </section>

      {/* lista */}

      <section className="lista">
        {tipoPagamentoList.map((e) => {
          if (
            selectedTipoPagamento === "" &&
            selectEditTipoPagamento === "" &&
            visibilita === false &&
            e.visibile === 1
          ) {
            return (
              <ul key={e.idtipopagamento}>
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
                    <div style={{ marginRight: "10px" }}>{e.descrizione}</div>
                    <div style={{ marginRight: "10px" }}>{e.visibile}</div>
                    <div style={{ marginRight: "10px" }}></div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectedTipoPagamento(e.idtipopagamento);
                        setSelectEditTipoPagamento("False");
                        setIsChecked(true);
                        setVisibile(e.visibile);
                      }}
                    >
                      Dettagli
                    </button>
                  </div>
                </li>
              </ul>
            );
          }
          if (
            selectedTipoPagamento === "" &&
            selectEditTipoPagamento === "" &&
            visibilita === true
          ) {
            return (
              <ul
               key={e.idtipopagamento}
               
               >
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
                    <div style={{ marginRight: "10px" }}>{e.descrizione}</div>
                    <div style={{ marginRight: "10px" }}>{e.visibile}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectedTipoPagamento(e.idtipopagamento);
                        setSelectEditTipoPagamento("False");
                        if (e.visibile === 1) {
                          setIsChecked(true);
                        } else if (e.visibile === 0) {
                          setIsChecked(false);
                        }
                        setVisibile(e.visibile);
                        // setEditVisibile(e.visibile);
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
}

export default TipoPagamento;
