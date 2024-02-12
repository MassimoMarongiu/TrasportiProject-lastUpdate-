import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { closedCaptioning } from "fontawesome";
function LocalitaTrasporti({
  selectedElement,
  togglehandleCLose,
  handleRequestElementLocalitaTrasporti,
  toggleChooseSelectElementLocalitaTrasporti,
}) {
  const [idlocalita, setIdLocalita] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [editDescrizione, setEditDescrizione] = useState("");
  const [provincia, setProvincia] = useState("");
  const [editProvincia, setEditProvincia] = useState("");
  const [cap, setCap] = useState("");
  const [editCap, setEditCap] = useState("");
  const [arrivo, setArrivo] = useState("");
  const [editArrivo, setEditArrivo] = useState("");
  const [visibile, setVisibile] = useState("");
  const [editVisibile, setEditVisibile] = useState("");
 
  const [localitaTrasportiList, setLocalitaTrasportiList] = useState([]);

  const [selectIdLocalitaTasporti, setSelectIdLocalitaTasporti] = useState("");
  const [selectEditLocalitaTasporti, setSelectEditLocalitaTasporti] =
    useState("");

  const [isChecked, setIsChecked] = useState();
  const [visibilita, setVisibilita] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const navigate = useNavigate();

  const fetchLocalitaTrasporti = async () => {
    try {
      const response = await baseURL.get("/localitaTrasporti", {
        headers: {
          //   "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { localitaTrasporti } = response.data;
      setLocalitaTrasportiList(localitaTrasporti);
      console.log("localitaTrasporti",localitaTrasporti);
      // console.log("localitaTrasportiList",localitaTrasportiList);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchLocalitaTrasporti();
  }, []);

  const handleEditLocalitaTrasporti = async (e) => {
    e.preventDefault();
    try {
      if (editDescrizione && editProvincia && editCap && editArrivo && editVisibile) {
        const dataLocalitaTrasporti = await baseURL.put(
          `/localitaTrasporti/${idlocalita}`,
          {
            descrizione: editDescrizione,
            provincia: editProvincia,
            cap: editCap,
            arrivo: editArrivo,
            visibile: editVisibile,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedLocalitaTrasporti = dataLocalitaTrasporti.data;
        const updatedListLocalitaTrasporti = localitaTrasportiList.map(
          (localitaTrasporti) => {
            if (localitaTrasporti.idlocalita === idlocalita) {
              return (localitaTrasporti = updatedLocalitaTrasporti);
            }
            return localitaTrasporti;
          }
        );
        setLocalitaTrasportiList(updatedListLocalitaTrasporti);
      }
      setIdLocalita(null);
      setEditDescrizione("");
      setEditProvincia("");
      setEditCap("");
      setEditArrivo("");
      setSelectEditLocalitaTasporti("");
      // setSelectIdLocalitaTasporti("");

      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsVisibile(!isVisibile);
    const visibilita = isVisibile ? setVisibilita(1) : setVisibilita(0);
  };

  useEffect(() => {handleCheckboxChange();}, []);

  const toggleEditLocalitaTrasporti = (e, selectEditLocalitaTasporti) => {
    setIdLocalita(e.idlocalita);
    setEditDescrizione(e.descrizione);
    setEditProvincia(e.provincia);
    setEditCap(e.cap);
    setEditVisibile(e.visibile);
    setEditArrivo(e.arrivo);
    setSelectEditLocalitaTasporti(selectEditLocalitaTasporti);
  };

  const handleInputChange = (e, field) => {
    if (field === "editDescrizione") {
      setEditDescrizione(e.target.value);
    } else if (field === "editArrivo") {
      setEditArrivo(e.target.value);
    } else if (field === "editProvincia") {
      setEditProvincia(e.target.value);
      checkChange();
    } else if (field === "editCap") {
      setEditCap(e.target.value);
      // checkChange();
    } else if (field === "editVisibile") {
      checkChange();
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
              toggleEditLocalitaTrasporti(e, "True");
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
              handleRequestElementLocalitaTrasporti(
                e.idlocalita,
                e.descrizione,
                e.arrivo,
                e.provincia,
                e.cap
              );
              toggleChooseSelectElementLocalitaTrasporti(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              selectIdLocalitaTasporti("");
              selectEditLocalitaTasporti("");
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
        <div>
          {!selectedElement && (
            <div>
              <h1>Localita Trasporti</h1>
              <p>ok per tutto</p>
            </div>
          )}
        </div>
        <div>
          {selectIdLocalitaTasporti === "" &&
            selectEditLocalitaTasporti === "" && (
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
      <section className="modificaLocalitaTrasporti">
        {localitaTrasportiList.map((e) => {
          if (
            selectIdLocalitaTasporti === e.idlocalita &&
            selectEditLocalitaTasporti === "True"
          ) {
            return (
              <div
                // key={e.idlocalita}
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto"
                }}
              >
                <div>
                  <h1>Modifica</h1>
                </div>
                <div>
                  <Form
                    onSubmit={handleEditLocalitaTrasporti}
                    // key={e.idlocalita}
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
                        value={editDescrizione}
                        onChange={(e) =>
                          handleInputChange(e, "editDescrizione")
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Provincia</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="editProvincia"
                        value={editProvincia}
                        onChange={(e) => handleInputChange(e, "editProvincia")}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Arrivo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="editArrivo"
                        value={editArrivo}
                        onChange={(e) => handleInputChange(e, "editArrivo")}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Cap</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="editCap"
                        value={editCap}
                        onChange={(e) => handleInputChange(e, "editCap")}
                      />
                    </Form.Group>

{/*-------------------------checkbox */}

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        // key={e.idlocalita}
                        type="checkbox"
                        label="Visibile"
                        checked={!isChecked}
                        onChange={(e) => {
                          handleInputChange(e, "editVisibile");
                        }}
                        />
  {/*-------------------------checkbox */}

                      {/* bottone applica modifica */}

                      <Button
                        variant="primary"
                        name="applicaModifica"
                        type="submit"
                        // onClick={}
                      >
                        Applica Modifica
                      </Button>

                {/* bottone annulla modifica */}
                    </Form.Group>
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="success"
                      name="check"
                      type="button"
                      onClick={() => {
                        // setSelectedTipoBolla(e.idtipobolla);
                        // setSelectedEditTipoBolla("False");
                        setSelectIdLocalitaTasporti(e.idlocalita);
                        setSelectEditLocalitaTasporti("False");
                      }}
                    >
                      Annulla
                    </Button>
                  </Form>
                </div>
              </div>
            );
          }
        })}
      </section>

      {/* dettagli */}

      <section
        className="dettagliLocalitaTrasporti"
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
        {localitaTrasportiList.map((e) => {
          if (
            selectIdLocalitaTasporti === e.idlocalita &&
            selectEditLocalitaTasporti === "False"
          ) {
            return (
              <div
                // key={e.idlocalita}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <p style={{ alignItems: "right" }}>
                  {toggleSubmitFatturaDettagli(e)}
                </p>
                <h2>Indirizzo: {e.descrizione} </h2>
                <p>Partita Provincia: {e.provincia}</p>
                <p>CAP: {e.cap}</p>
                <p>Arrivo: {e.arrivo}</p>
              </div>
            );
          }
        })}
      </section>

      {/* lista */}

      <section className="lista">
        {localitaTrasportiList?.map(e => {
          if (
            selectIdLocalitaTasporti === "" &&
            selectEditLocalitaTasporti === "" &&
            visibilita === 1
          ) {
            return (
              <>
              {/* <p>tutti</p> */}
                <ul>
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
                          setSelectIdLocalitaTasporti(e.idlocalita);
                          setSelectEditLocalitaTasporti("False");
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
                  {/* <li >{e.visibile}</li> */}
                </ul>
              </>
            );
          }
          if (
            selectEditLocalitaTasporti === "" &&
            selectEditLocalitaTasporti === "" &&
            visibilita === 0 &&
            e.visibile === 1
            
          ) {
            return (
              <>
                <ul>
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
                          setSelectIdLocalitaTasporti(e.idlocalita);
                          setSelectEditLocalitaTasporti("False");
                          setIsChecked(true);
                          setVisibile(e.visibile);
                        }}
                      >
                        Dettagli
                      </button>
                    </div>
                  </li>
                  {/* <li >{e.visibile}</li> */}
                </ul>
              </>
            );
          }
        })}
      </section>
    </>
  );
}

export default LocalitaTrasporti;
