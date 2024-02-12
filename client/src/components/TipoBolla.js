import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
const TipoBollaIn = ({
  selectedElement,
  togglehandleCLose,
  handleRequestElementTipoBolla,
  toggleChooseSelectElementTipoBolla,
}) => {
  const [idtipobolla, setIdtipobolla] = useState(null);
  const [descrizione, setDescrizione] = useState("");
  const [editDescrizione, setEditDescrizione] = useState("");
  const [visibile, setVisibile] = useState("");
  const [editVisibile, setEditVisibile] = useState("");
  const [tipoBollaList, setTipoBollaList] = useState([]);
  const [selectedTipoBolla, setSelectedTipoBolla] = useState("");
  const [selectedEditTipoBolla, setSelectedEditTipoBolla] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [visibilita, setVisibilita] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const navigate = useNavigate();

  const fetchTipoBolla = async (e) => {
    try {
      const data = await baseURL.get("/tipoBolle", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { tipoBolle } = data.data;
      setTipoBollaList(tipoBolle);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchTipoBolla();
  }, []);

  // const handleChange = (e, field) => {
  //   e.preventDefault();
  //   if (field === "editDescrizione") {
  //     setEditDescrizione(e.target.value);
  //   }
  //   if (field === "editVisibile") {
  //     setEditVisibile(e.target.value);
  //   }
  // };

  const handleEditTipoBolla = async (e) => {
    e.preventDefault();
    try {
      if (
        editDescrizione
        // && editVisibile
      ) {
        const dataTipoBolla = await baseURL.put(
          `/tipoBolle/${idtipobolla}`,
          {
            descrizione: editDescrizione,
            visibile: editVisibile,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedTipoBolla = dataTipoBolla.data;
        const updatedListTipoBolla = tipoBollaList.map((tipoBolla) => {
          if (tipoBolla.idtipobolla === idtipobolla) {
            return (tipoBolla = updatedTipoBolla);
          }
          return tipoBolla;
        });
        setTipoBollaList(updatedListTipoBolla);
      }
      setIdtipobolla(null);
      setEditDescrizione("");
      setEditVisibile();
      setSelectedEditTipoBolla("");
      // setSelectedTipoBolla("");

      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsVisibile(!isVisibile);
    const visibilita = isVisibile ? setVisibilita(1) : setVisibilita(0);
  };

  useEffect(() => {
    handleCheckboxChange();
  }, []);

  const toggleEditTipoBolla = (e, selectedEditTipoBolla) => {
    setIdtipobolla(e.idtipobolla);
    setEditDescrizione(e.descrizione);
    setEditVisibile(e.visibile);
    setSelectedEditTipoBolla(selectedEditTipoBolla);
  };

  const handleInputChange = (e, field) => {
    if (field === "editDescrizione") {
      setEditDescrizione(e.target.value);
    } else if (field === "editVisibile") {
      checkChange();
    }
  };

  const checkChange = (e) => {
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
        <div 
        // key={e.idtipobolla}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              toggleEditTipoBolla(e, "True");
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
            type="submit"
            className="btn btn-success"
            onClick={() => {
              handleRequestElementTipoBolla(e.idtipobolla, e.descrizione);
              toggleChooseSelectElementTipoBolla(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedTipoBolla("");
              setSelectedEditTipoBolla("");
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
            <h1>Tipo Bolla</h1>
            <p>tutto ok</p>
          </div>
        )}

        <div>
          {selectedTipoBolla === "" && selectedEditTipoBolla === "" && (
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
      <section className="modificaTipoBolla">
        {tipoBollaList.map((e) => {
          if (
            selectedTipoBolla === e.idtipobolla &&
            selectedEditTipoBolla === "True"
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
                  //  key={e.idtipobolla}
                   >
                    <li
                      style={{
                        listStyleType: "none",
                        maxWidth: "1000px",
                        display: "flex",
                        alignContent: "row",
                      }}
                    >
                      <Form
                        onSubmit={handleEditTipoBolla}
                        // key={e.idtipobolla}
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
                        {/* checkboxmodifica */}

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            // key={e.idtipobolla}
                            type="checkbox"
                            label="Visibile"
                            checked={!isChecked}
                            onChange={(e) => {
                              handleInputChange(e, "editVisibile");
                            }}
                          />
                        </Form.Group>

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
                            setSelectedTipoBolla(e.idtipobolla);
                            setSelectedEditTipoBolla("False");
                          }}
                        >
                          Annulla
                        </Button>
                      </Form>
                    </li>
                  </ul>
                </div>
              </>
            );
          }
        })}
      </section>

      {/* dettagli */}
      <section className="dettagliTipoBolla">
        {tipoBollaList.map((e) => {
          if (
            selectedTipoBolla === e.idtipobolla &&
            selectedEditTipoBolla === "False"
          ) {
            // console.log(e.visibile);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <p>{toggleSubmitFatturaDettagli(e)}</p>
                <h2>Descrizione: {e.descrizione} </h2>
              </div>
            );
          }
        })}
      </section>

      {/* lista */}
      <section className="listaTipoBolle">
        <div>
          {tipoBollaList.map((e) => {
            if (
              selectedTipoBolla === "" &&
              selectedEditTipoBolla === "" &&
              e.visibile ===1 &&
              visibilita === 0
            ) {
              return (
                
                <ul
                  key={e.idtipobolla}
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
                    <div style={{ width: "1000px" }}>{e.descrizione} </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setSelectedTipoBolla(e.idtipobolla);
                          setSelectedEditTipoBolla("False");
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
              selectedTipoBolla === "" &&
              selectedEditTipoBolla === "" && 
              visibilita === 1
            ) {
              return (
                <ul
                key={e.idtipobolla}

                >
                  <li
                    // key={e.idtipobolla}
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
                    <div style={{ width: "1000px" }}>{e.descrizione} </div>
                    <div style={{ width: "1000px" }}>{e.visibile} </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setSelectedTipoBolla(e.idtipobolla);
                          setSelectedEditTipoBolla("False");
                          if (e.visibile === 1) {
                            setIsChecked(true);
                          } else if (e.visibile === 0) {
                            setIsChecked(false);
                          }
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
          })}
        </div>
      </section>
    </>
  );
};

export default TipoBollaIn;
