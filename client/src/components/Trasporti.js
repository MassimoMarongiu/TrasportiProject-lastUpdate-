import React, { useState, useEffect } from "react";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

function Trasporti({
  selectedElement,
  togglehandleCLose,
  handleRequestElementTrasporti,
  toggleChooseSelectElementTrasporti,
}) {
  const [idTrasporti,setIdTrasporti] = useState("")
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
  const [importoAnticipato, setImportoAnticipato] = useState("");
  const [dettagliAnticipato, setDettagliAnticipato] = useState("");
  const [codDepositoAnticipato, setCodDepositoAnticipato] = useState("");

  const [trasportiList, setTrasportiList] = useState([]);

  const [selectedIdTrasporti, setSelectedIdTrasporti] = useState("");
  const [selectEditTrasporti, setSelectEditTrasporti] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const fetchTrasporti = async (e) => {
    try {
      const data = await baseURL.get("/trasportiList", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const t =data.data;
      const { trasporti } =data.data;
     setTrasportiList(trasporti);
     console.log("t", t);
     console.log("trasporti", trasporti);
     console.log("trasportiList", trasportiList);

    } catch (error) {
      // navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };

  useEffect(() => {
    fetchTrasporti();
  }, []);

  const toggleSubmitFatturaDettagli = (e) => {
    if (selectedElement === false) {
      return (
        <div>
          {/* bottone modifica trasporto */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              // toggleEditTrasporti(e, "True");
              // handleChangeIsCecked(e.visibile);
              setSelectedIdTrasporti(e.idTrasporti);
              selectEditTrasporti("True");
              // toggleSelected_Detail(false)
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
              handleRequestElementTrasporti(
                e.idTrasporti,
                e.dataTrasporto,
                e.codAnagrafica,
                e.codLocalitaPartenza,
                e.codLocalitaArrivo,
                e.codDescrizioneTrasporto,
                e.imponibile,
                e.codIva,
                e.totale,
                e.codTipoBolla,
                e.numero,
                e.note,
                e.codDocumento,
                e.dataAnticipato,
                e.codModalitaAnticipato,
                e.importoAnticipato,
                e.dettagliAnticipato,
                e.codDepositoAnticipato
              );
              toggleChooseSelectElementTrasporti(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedIdTrasporti("");
              setSelectEditTrasporti("");
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
            <h1>Trasporti</h1>
          </div>
        )}
      </section>

      {/* modifica */}

      {/* dettagli */}
      {/* <section
        className="dettagli"
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
          {trasportiList.map((e) => {
            if (
              selectedIdTrasporti === e.idTrasporti &&
              selectEditTrasporti === "False"
            ) {
              return (
                <li>
                  <div
                    key={e.idTrasporti}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "auto",
                    }}
                  >
                    <div
                      key={e.idTrasporti}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "auto",
                      }}
                    >
                      <p>{toggleSubmitFatturaDettagli(e)}</p>
                      <p>Data trasporto: {e.dataTrasporto}</p>
                      <p>Cod. Anagrafica: {e.codAnagrafica}</p>
                      <p>Cod. Localita Partenza: {e.codLocalitaPartenza}</p>
                      <p>Cod. Localita Arrivo: {e.codLocalitaArrivo}</p>
                      <p>
                        Cod. Descrizione trasporto: {e.codDescrizioneTrasporto}
                      </p>
                      <p>Imponibile: {e.imponibile}</p>
                      <p>Cod. Iva: {e.codIva}</p>
                      <p>Totale: {e.totale}</p>
                      <p>Cod. Tipo Bolla: {e.codTipoBolla}</p>
                      <p>Numero: {e.numero}</p>
                      <p>Note: {e.note}</p>
                      <p>Cod. Documento: {e.codDocumento}</p>
                      <p>Data anticipato: {e.dataAnticipato}</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
      </section> */}
      {/* lista */}
      <section className="lista">
        {trasportiList?.map((e) => {
          if (selectedIdTrasporti === "" && selectEditTrasporti === "") {
            return (
              <ul>
                <li
                  // key={e.idTrasporti}
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
                    <div style={{ marginRight: "10px" }}>{e.dataTrasporto}</div>
                    <div style={{ marginRight: "10px" }}>{e.codAnagrafica}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectedIdTrasporti(e.idTrasporti);
                        setSelectEditTrasporti("False");
                      }}
                    >
                      Dettagli
                    </button>
                  </div>
                </li>
              </ul>
            );
          }
          return null;
        })}
      </section>
    </>
  );
}

export default Trasporti;
