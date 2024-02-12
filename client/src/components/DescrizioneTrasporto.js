import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DescrizioneTrasporto = ({
  selectedElement,
  togglehandleCLose,
  handleRequestElementDescrizioneTrasporto,
  toggleChooseSelectElementDescrizioneTrasporto,
}) => {
  const [iddescrizione, setIddescrizione] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [editDescrizione, setEditDescrizione] = useState("");
  const [visibile, setVisibile] = useState();
  const [editVisibile, setEditVisibile] = useState();
  const [descrizioneTrasportoList, setDescrizioneTrasportoList] = useState([]);

  const [selectIdDT, setSelectIdDT] = useState("");
  const [selectEditDescrizioneTrasporti, setSelectEditDescrizioneTrasporti] =
    useState("");

  const [isChecked, setIsChecked] = useState();
  const [visibilita, setVisibilita] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const navigate = useNavigate();

  const fetchDescrizioneTrasporti = async (e) => {
    try {
      const data = await baseURL.get("/descrizioneTrasporti", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { descrizioneTrasporti } = data.data;
      setDescrizioneTrasportoList(descrizioneTrasporti);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchDescrizioneTrasporti();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (
        editDescrizione
         && editVisibile
      ) {
        const data = await baseURL.put(
          `descrizioneTrasporti/${iddescrizione}`,
          { descrizione: editDescrizione, visibile: editVisibile },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedDescrizione = data.data;
        const updatedDescrizioneList = descrizioneTrasportoList.map((e) => {
          if (e.iddescrizione === iddescrizione) {
            return (e = updatedDescrizione);
          }
          return e;
        });
        setDescrizioneTrasportoList(updatedDescrizioneList);
      }
      setIddescrizione(null);
      setEditDescrizione("");
      // setEditVisibile();
      setSelectEditDescrizioneTrasporti("");
      // setSelectIdDT("");

      window.location.reload();

      // window.alert("Descrizione trasporto modificata con successo!");
      // setSelectEditDescrizioneTrasporti("False");
      // setSelectIdDT(e.iddescrizione);
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

  const toggleEditDescTrasp = (e, selectEditDescrizioneTrasporti) => {
    setIddescrizione(e.iddescrizione);
    setEditDescrizione(e.descrizione);
    setEditVisibile(e.visibile);
    setSelectEditDescrizioneTrasporti(selectEditDescrizioneTrasporti);
  };

  const handleInputChange = (e, field) => {
    if (field === "editDescrizione") {
      setEditDescrizione(e.target.value);
      console.log(editDescrizione);
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
          {/* bottone modifica descrizione trasporto */}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              toggleEditDescTrasp(e, "True");
              //  console.log("toggleSubmitFatturaDettagli");
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
              handleRequestElementDescrizioneTrasporto(
                e.iddescrizione,
                e.descrizione
              );
              toggleChooseSelectElementDescrizioneTrasporto(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectIdDT("");
              setSelectEditDescrizioneTrasporti("");
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
            <h1>Descrizione Trasporto </h1>
            <p>tutto ok</p>
          </div>
        )}
        <div>
          {selectIdDT === "" && selectEditDescrizioneTrasporti === "" && (
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
        {descrizioneTrasportoList.map((e) => {
          if (
            selectIdDT === e.iddescrizione &&
            selectEditDescrizioneTrasporti === "True"
          ) {
            return (
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "auto",
                }}
              >
                <div  style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                  <h1>Modifica</h1>
                </div>
                <div
                >
                  <Form
                    onSubmit={handleEdit}
                    // key={e.iddescrizione}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "auto",
                      marginRight: "auto",
                      justifyContent: "center",
                      maxWidth: "500px",
                    }}
                  >
                    <Form.Group className="mb-3" >
                      <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          handleInputChange(e, "editDescrizione");
                        }}
                        value={editDescrizione}
                        type="text"
                      />
                    </Form.Group>

                    {/*-------------------------checkbox */}

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        // key={e.iddescrizione}
                        type="checkbox"
                        label="Visibile"
                        checked={!isChecked}
                        onChange={(e) => {
                          // setIsChecked(e.target.checked ? true : false);
                          handleInputChange(e, "editVisibile");
                        }}
                      />
                      {/*-------------------------checkbox */}

                      {/* bottone applica modifica */}

                      <Button
                        variant="primary"
                        name="applicamodifica"
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
                        setSelectIdDT(e.iddescrizione);
                        setSelectEditDescrizioneTrasporti("False");
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

      {/* sezione dettagli */}

      <section
        className="dettagliDescrizione"
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
        {descrizioneTrasportoList.map((e) => {
          if (
            selectIdDT === e.iddescrizione &&
            selectEditDescrizioneTrasporti === "False"
          ) {
            return (
              <div
                // key={e.iddescrizione}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <p>{toggleSubmitFatturaDettagli(e)}</p>
                <h3>Descrizione: {e.descrizione}</h3>
              </div>
            );
          }
        })}
      </section>

      {/* lista */}

      <section className="lista descrizione trasporti">
        {descrizioneTrasportoList.map((e) => {
          if (
            selectIdDT === "" &&
            selectEditDescrizioneTrasporti === "" &&
            visibilita === 1
          ) {
            return (
              <>
                <ul
                // key={e.iddescrizione}
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
                          setSelectIdDT(e.iddescrizione);
                          setSelectEditDescrizioneTrasporti("False");
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
                  <li>{e.visibile}</li>
                </ul>
              </>
            );
          }
          if (
            selectIdDT === "" &&
            selectEditDescrizioneTrasporti === "" &&
            visibilita === 0 &&
            e.visibile === 1
          ) {
            return (
              <>
                <ul
                // key={e.iddescrizione}
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
                          setSelectIdDT(e.iddescrizione);
                          setSelectEditDescrizioneTrasporti("False");
                          setIsChecked(true);
                          setVisibile(e.visibile);
                        }}
                      >
                        Dettagli
                      </button>
                    </div>
                  </li>
                  <li>{e.visibile}</li>
                </ul>
              </>
            );
          }
        })}
      </section>
    </>
  );
};

export default DescrizioneTrasporto;
