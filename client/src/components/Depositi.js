import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Depositi = (
  {selectedElement,
  togglehandleCLose,
  handleRequestElementDepositi,
  toggleChooseSelectElementDepositi}
) => {
  const [IdDeposito, setIdDeposito] = useState("");

  const [Descrizione, setDescrizione] = useState("");
  const [editDescrizione, setEditDescrizione] = useState("");

  const [CoordinateIBAN, setCoordinateIBAN] = useState("");
  const [editCoordinateIBAN, setEditCoordinateIBAN] = useState("");

  const [codtipodeposito, setCodtipodeposito] = useState("");
  const [editcodtipodeposito, setEditCodtipodeposito] = useState("");

  const [codazienda, setCodazienda] = useState("");
  const [editcodazienda, setEditCodazienda] = useState("");

  const [predef, setPredef] = useState("");
  const [editpredef, setEditPredef] = useState("");

  const [depositiList, setDepositiList] = useState([]);

  const [selectedDepositi, setSelectedDepositi] = useState("");
  const [selectedEditDepositi, setSelectedEditDepositi] = useState("");

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const navigate = useNavigate();
  const fetchDepositi = async () => {
    try {
      const data = await baseURL.get("/depositi", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { depositi } = data.data;
      setDepositiList(depositi);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchDepositi();
  }, []);

  const handleChange = (e, field) => {
    if (field === "editDescrizione") {
      setEditDescrizione(e.target.value);
    } else if (field === "editCoordinateIBAN") {
      setEditCoordinateIBAN(e.target.value);
    } else if (field === "editCodtipodeposito") {
      setCodtipodeposito(e.target.value);
    } else if (field === "editCodazienda") {
      setCodazienda(e.target.value);
    } else if (field === "editPredef") {
      setPredef(e.target.value);
    }
  };

  const handleEditDepositi = async (e) => {
    e.preventDefault();
    try {
      if (
        IdDeposito &&
        editDescrizione &&
        editCoordinateIBAN &&
        editcodtipodeposito &&
        editcodazienda &&
        editpredef
      ) {
        const data = await baseURL.put(
          `/depositi/${IdDeposito}`,
          {
            Descrizione: editDescrizione,
            CoordinateIBAN: editCoordinateIBAN,
            codtipodeposito: editcodtipodeposito,
            codazienda: editcodazienda,
            predef: editpredef,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedDeposito = data.data;
        const updatedListDeposito = depositiList.map((e) =>
          e.IdDeposito === IdDeposito ? updatedDeposito : e
        );
        setDepositiList(updatedListDeposito);
      } else {
        // Gestisci il caso in cui IdDeposito è null
        console.error("IdDeposito è null");
      }

      setIdDeposito(null);
      setEditDescrizione("");
      setEditCoordinateIBAN("");
      setEditCodtipodeposito("");
      setEditCodazienda("");
      setEditPredef("");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleEditDepositi = (e, selectedEditDepositi) => {
    setIdDeposito(e.IdDeposito); 
    setEditDescrizione(e.Descrizione);
    setEditCoordinateIBAN(e.CoordinateIBAN);
    setEditCodtipodeposito(e.codtipodeposito);
    setEditCodazienda(e.codazienda);
    setEditPredef(e.predef);
    setSelectedEditDepositi(selectedEditDepositi);
  };

   const toggleSubmitFatturaDettagli = (e) => {
    if (selectedElement === false) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            toggleEditDepositi(e);
            setSelectedDepositi(e.IdDeposito);
            setSelectedEditDepositi("True");
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
              handleRequestElementDepositi(
                e.Descrizione,e.CoordinateIBAN);
              toggleChooseSelectElementDepositi(true);
              togglehandleCLose(false);
              
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedDepositi("");
              setSelectedEditDepositi("");
            }}
          >
            Annulla
          </button>
        </div>
      );
    }
  };
// console.log("selectedElement",selectedElement);
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
            <h1>Depositi</h1>
          </div>
        )}

        {/* <div>
          {selectedDepositi === "" && selectedEditDepositi === "" && (
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
        </div> */}
      </section>

      {/* modifica */}
      <section
        className="modificaTipoBolla"
        style={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {depositiList.map((e) => {
          if (selectedDepositi === e.IdDeposito &&selectedEditDepositi === "True") {
              return (
                <ul>
                  <div>
                    <h3
                      style={{
                        paddingTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      Modifica
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <li
                      key={e.idDeposito}
                      style={{
                        listStyleType: "none",
                        maxWidth: "1000px",
                        display: "flex",
                        alignContent: "row",
                      }}
                    >
                      <form
                        onSubmit={handleEditDepositi}
                        style={{ display: "flex", flexDirection: "column" }}
                        key={e.idDeposito}
                      >
                        <label
                          key={e.idDeposito}
                          htmlFor={editDescrizione}
                          style={{ font: "bold", marginTop: "10px" }}
                        >
                          Descrizione
                        </label>
                        <input
                          onChange={(e) => handleChange(e, "editDescrizione")}
                          type="text"
                          style={{
                            border: "solid",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            width: "400px",
                          }}
                          name="editDescrizione"
                          id="editDescrizione"
                          value={editDescrizione}
                        />

                        <label
                          key={e.idDeposito}
                          htmlFor={editCoordinateIBAN}
                          style={{ font: "bold" }}
                        >
                          Coordinate IBAN
                        </label>
                        <input
                          onChange={(e) =>
                            handleChange(e, "editCoordinateIBAN")
                          }
                          type="text"
                          value={editCoordinateIBAN}
                          style={{
                            border: "solid",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            width: "400px",
                          }}
                          name="editCoordinateIBAN"
                          id="editCoordinateIBAN"
                          placeholder={e.CoordinateIBAN}
                        />

                        <label
                          key={e.idDeposito}
                          htmlFor={editcodtipodeposito}
                          style={{ font: "bold" }}
                        >
                          Codice tipo deposito
                        </label>
                        <input
                          onChange={(e) =>
                            handleChange(e, "editcodtipodeposito")
                          }
                          value={editcodtipodeposito}
                          type="text"
                          style={{
                            border: "solid",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            width: "25px",
                          }}
                          name="editcodtipodeposito"
                          id="editcodtipodeposito"
                          placeholder={e.codtipodeposito}
                          // value={e.visibile}
                        />

                        <label
                          key={e.idDeposito}
                          htmlFor={editcodazienda}
                          style={{ font: "bold" }}
                        >
                          Codice Azienda
                        </label>
                        <input
                          onChange={(e) => handleChange(e, "editcodazienda")}
                          type="text"
                          style={{
                            border: "solid",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            width: "25px",
                          }}
                          value={editcodazienda}
                          name="editcodazienda"
                          id="editcodazienda"
                          placeholder={e.codazienda}
                        />

                        <label
                          key={e.idDeposito}
                          htmlFor={editcodazienda}
                          style={{ font: "bold" }}
                        >
                          Predef
                        </label>
                        <input
                          onChange={(e) => handleChange(e, "editPredef")}
                          type="text"
                          style={{
                            border: "solid",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            width: "25px",
                          }}
                          name="editPredef"
                          id="editPredef"
                          value={editpredef}
                          placeholder={e.predef}
                        />

                        <button
                          className="btn btn-primary"
                          type="submit"
                          style={{ marginTop: "10px" }}
                          onClick={() => {}}
                        >
                          Applica Modifiche
                        </button>

                        <button
                          type="submit"
                          className="btn btn-success"
                          style={{ marginTop: "10px" }}
                          onClick={() => {
                            setSelectedDepositi(e.idDeposito);
                            setSelectedEditDepositi("False");
                          }}
                        >
                          Annulla
                        </button>
                      </form>
                    </li>
                  </div>
                </ul>
              );
            }
        })}
        </section>
        {/* dettagli */}
        <section className="dettagli">
         {depositiList.map((e) => {
           console.log("selectedDepositi,selectedEditDepositi",selectedDepositi,selectedEditDepositi)
           if (
             selectedDepositi === e.IdDeposito &&
             selectedEditDepositi === "False"
             ) {
            return (
              <div
                
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                }}
              >
                <ul key={e.idDeposito}>
                  <li 
                  key={e.idDeposito}
                  style={{ alignItems: "right" }}>
                    {toggleSubmitFatturaDettagli(e)}
                  </li>
                  <li>
                    <h3 style={{ marginRight: "10px" }}>
                      Descrizione: {e.Descrizione}{" "}
                    </h3>
                  </li>
                  <li>Coordinate IBAN: {e.CoordinateIBAN}</li>
                  <li>Codice tipo depostio: {e.codtipodeposito}</li>
                  <li>CodiceAzienda:{e.codazienda}</li>
                  <li>Predef: {e.predef}</li>
                  </ul>
                  {/* <p style={{ marginRight: "10px" }}>
                    </p>
                    <p style={{ marginRight: "10px" }}>
                    </p>
                    <p style={{ marginRight: "10px" }}>
                    </p>
                    <p style={{ marginRight: "10px" }}></p> */}

                {/* <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        toggleEditDepositi(e, "True");
                        // setSelectedIdDepositi(e.IdDeposito);
                        // setSelectedDepositi("True");
                      }}
                    >
                      Modifica
                    </button> */}
              </div>
            );
          }
        })}
      </section>

      {/* lista depositi */}
      <section className="listaDepositi">
        <div>
          {depositiList.map((e) => {
            if (selectedDepositi === "" && selectedEditDepositi === "") {
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
                        Descrizione: {e.Descrizione}{" "}
                      </div>
                      <div style={{ marginRight: "10px" }}>
                        Coordinate IBAN: {e.CoordinateIBAN}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setSelectedDepositi(e.IdDeposito);
                          setSelectedEditDepositi("False");
                        
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

export default Depositi;
