import React, { useState, useEffect } from "react";
// import { Form } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import GetFunctionFattura from "./GetFunctionFattura";
import Modal from "react-bootstrap/Modal";
import Anagrafica from "./Anagrafica";
import Depositi from "./Depositi";
import Documenti from "./Documenti";
import Trasporti from "./Trasporti";
import TipoBolla from "./TipoBolla";
import LocalitaTrasporti from "./LocalitaTrasporti";
import TipoPagamento from "./TipoPagamento";
import DescrizioneTrasporto from "./DescrizioneTrasporto";

function CreaFattura({
  selectedElement,
  toggleSelected_Detail /*deriva da <App/> */,
}) {
  // toggleSelected_Detail(true); //modificato 03/02/2024

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    toggleSelected_Detail(false);
  };
  const handleShow = () => {
    setShow(true);
    toggleSelected_Detail(true);
  };
  const togglehandleCLose = (e) => {
    setShow(e);
    toggleSelected_Detail(false);
  };

  const [chooseSelectElementAnagrafica, setChooseSelectElementAnagrafica] =
    useState(false);
  const toggleChooseSelectElementAnagrafica = (e) =>
    setChooseSelectElementAnagrafica(e);

  const [chooseSelectElementDocumenti, setChooseSelectElementDocumenti] =
    useState(false);
  const toggleChooseSelectElementDocumenti = (e) =>
    setChooseSelectElementDocumenti(e);

  const [chooseSelectElementDepositi, setChooseSelectElementDepositi] =
    useState(false);
  const toggleChooseSelectElementDepositi = (e) =>
    setChooseSelectElementDepositi(e);

  const [
    chooseSelectElementDescrizioneTrasporto,
    setChooseSelectElementDescrizioneTrasporto,
  ] = useState(false);
  const toggleChooseSelectElementDescrizioneTrasporto = (e) =>
    setChooseSelectElementDescrizioneTrasporto(e);

  const [chooseSelectElementTrasporti, setChooseSelectElementTrasporti] =
    useState(false);
  const toggleChooseSelectElementTrasporti = (e) =>
    setChooseSelectElementTrasporti(e);

  const [
    chooseSelectElementLocalitaTrasporti,
    setChooseSelectElementLocalitaTrasporti,
  ] = useState(false);
  const toggleChooseSelectElementLocalitaTrasporti = (e) =>
    setChooseSelectElementLocalitaTrasporti(e);

  const [chooseSelectElementTipoBolla, setChooseSelectElementTipoBolla] =
    useState(false);
  const toggleChooseSelectElementTipoBolla = (e) =>
    setChooseSelectElementTipoBolla(e);

  const [
    chooseSelectElementTipoPagamento,
    setChooseSelectElementTipoPagamento,
  ] = useState(false);
  const toggleChooseSelectElementTipoPagamento = (e) =>
    setChooseSelectElementTipoPagamento(e);

  const [anagraficaList, setAnagraficaList] = useState([]);
  const [depositoList, setDepositoList] = useState([]);
  const [descrizioneTrasportoList, setDescrizioneTrasportoList] = useState([]);
  const [localitaTrasportiList, setLocalitaTrasportiList] = useState([]); //localitaTrasporti
  const [tipoBollaList, setTipoBollaList] = useState([]);
  const [tipoPagamentoList, setTipoPagamentoList] = useState([]);
  const [trasportiList, setTrasportiList] = useState([]);
  // const [documentiList, setDocumentiList] = useState([]);

  const [selectedTypeElement, setSelectedTypeElement] = useState(""); // seleziona pagina

  const handleSelectTypeElement = (e) => {
    // selezione intestazione modal
    setSelectedTypeElement(`${e}`);
    handleShow();
  };

  // useEffect(() => {
  //   handleSelectTypeElement();
  // }, []);

  // richiesta dati anagrafica
  const handleRequestElementAnagrafica = (
    idanagrafica,
    ragionesociale,
    partitaiva,
    indirizzo,
    localita,
    prov
  ) => {
    setAnagraficaList([
      idanagrafica,
      ragionesociale,
      partitaiva,
      indirizzo,
      localita,
      prov,
    ]);
  };

  useEffect(() => {
    handleRequestElementAnagrafica();
  }, []);

  const toggleButtonDetailsAnagrafica = () => {
    if (chooseSelectElementAnagrafica === true) {
      return (
        <div>
          <p>{anagraficaList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("Anagrafica");
              toggleSelected_Detail(true);
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Anagrafica
          </Button>
        </>
      );
    }
  };

  // richiesta depositi
  const handleRequestElementDepositi = (Descrizione, CoordinateIBAN) => {
    setDepositoList([Descrizione, CoordinateIBAN]);
  };

  useEffect(() => {
    handleRequestElementDepositi();
  }, []);

  const toggleButtonDetailsDepositi = () => {
    if (chooseSelectElementDepositi === true) {
      return (
        <div>
          <p>{depositoList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("Depositi");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Deposito
          </Button>
        </>
      );
    }
  };

  // richiesta DescrizioneTrasporto
  const handleRequestElementDescrizioneTrasporto = (
    iddescrizione,
    descrizione
  ) => {
    setDescrizioneTrasportoList([iddescrizione, descrizione]);
  };

  useEffect(() => {
    handleRequestElementDescrizioneTrasporto();
  }, []);

  const toggleButtonDetailsDescrizioneTrasporto = () => {
    if (chooseSelectElementDescrizioneTrasporto === true) {
      return (
        <div>
          <p>{descrizioneTrasportoList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("DescrizioneTrasporto");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona DescrizioneTrasporto
          </Button>
        </>
      );
    }
  };

  // richiesta localita trasporti
  const handleRequestElementLocalitaTrasporti = (
    idlocalita,
    descrizione,
    arrivo,
    provincia,
    cap
  ) => {
    setLocalitaTrasportiList([idlocalita,descrizione, arrivo, provincia, cap]);
  };

  useEffect(() => {
    handleRequestElementLocalitaTrasporti();
  }, []);

  const toggleButtonDetailsLocalitaTrasporti = () => {
    if (chooseSelectElementLocalitaTrasporti === true) {
      return (
        <div>
          <p>{localitaTrasportiList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("LocalitaTrasporti");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Localita Trasporti
          </Button>
        </>
      );
    }
  };

  // richiesta tipobolla
  const handleRequestElementTipoBolla = (idtipobolla, descrizione) => {
    setTipoBollaList([idtipobolla, descrizione]);
  };

  useEffect(() => {
    handleRequestElementTipoBolla();
  }, []);

  const toggleButtonDetailsTipoBolla = () => {
    if (chooseSelectElementTipoBolla === true) {
      return (
        <div>
          <p>{tipoBollaList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("TipoBolla");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Tipo Bolla
          </Button>
        </>
      );
    }
  };

  // richiesta tipopagamento
  const handleRequestElementTipoPagamento = (
    idtipopagamento,
    descrizione,
    codtipodeposito,
    ggrata1,
    fmrata1,
    percrata1
  ) => {
    setTipoPagamentoList([
      idtipopagamento,
      descrizione,
      codtipodeposito,
      ggrata1,
      fmrata1,
      percrata1,
    ]);
  };

  useEffect(() => {
    handleRequestElementTipoPagamento();
  }, []);

  const toggleButtonDetailsTipoPagamento = () => {
    if (chooseSelectElementTipoPagamento === true) {
      return (
        <div>
          <p>{tipoPagamentoList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("TipoPagamento");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Tipo Pagamento
          </Button>
        </>
      );
    }
  };

  // richiesta trasporti
  const handleRequestElementTrasporti = (
    idtrasporto,
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
    importoAnticipato,
    dettagliAnticipato,
    codDepositoAnticipato
  ) => {
    setTrasportiList([
      idtrasporto,
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
      importoAnticipato,
      dettagliAnticipato,
      codDepositoAnticipato]);
  };

  useEffect(() => {
    handleRequestElementTrasporti();
  }, []);

  const toggleButtonDetailsTrasporti = () => {
    if (chooseSelectElementTrasporti === true) {
      return (
        <div>
          <p>{trasportiList}</p>
        </div>
      );
    } else {
      return (
        <>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSelectTypeElement("Trasporti");
              toggleSelected_Detail(true); //modificato 03/02/2024
            }}
            style={{ marginTop: "20px" }}
          >
            Seleziona Trasporti
          </Button>
        </>
      );
    }
  };

  // richiesta dati documenti
  // const handleRequestElementDocumenti = (
  //   intestatario_ragionesociale,
  //   intestatario_partitaiva,
  //   DDT_Destinazione,
  //   ddt_indirizzo,
  //   DDT_TrasportoMezzo,
  //   DDT_NumeroColli,
  //   Imponibile,
  //   IVA,
  //   Totale,
  //   QuantitaPeso,
  //   LuogoCarico,
  //   LuogoScarico
  // ) => {
  //   setDocumentiList([
  //     intestatario_ragionesociale,
  //     intestatario_partitaiva,
  //     DDT_Destinazione,
  //     ddt_indirizzo,
  //     DDT_TrasportoMezzo,
  //     DDT_NumeroColli,
  //     Imponibile,
  //     IVA,
  //     Totale,
  //     QuantitaPeso,
  //     LuogoCarico,
  //     LuogoScarico,
  //   ]);
  // };

  // const toggleButtonDetailsDocumenti = () => {
  //   if (chooseSelectElementDocumenti === true) {
  //     return (
  //       <div>
  //         <p>{documentiList[0]}</p>
  //         <p>{documentiList[1]}</p>
  //         <p>{documentiList[2]}</p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Button
  //           variant="primary"
  //           onClick={(e) => {
  //             handleSelectTypeElement("Documenti");
  //             toggleSelected_Detail(true);//modificato 03/02/2024
  //           }}
  //           style={{ marginTop: "20px" }}
  //         >
  //           Select Documento, ne vede 2
  //         </Button>
  //       </>
  //     );
  //   }
  // };

  // useEffect(() => {
  //   handleRequestElementDocumenti();
  // }, []);

  /*{-------------------------REndering----------------------------------}*/

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Crea Fattura</h1>
      </div>
      {/* buttoni */}
      <div
        className="buttoncontainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        {toggleButtonDetailsAnagrafica()}
        {toggleButtonDetailsDepositi()}
        {toggleButtonDetailsDescrizioneTrasporto()}
        {toggleButtonDetailsTrasporti()}
        {toggleButtonDetailsLocalitaTrasporti()}
        {toggleButtonDetailsTipoBolla()}
        {toggleButtonDetailsTipoPagamento()}
        {/* {toggleButtonDetailsDocumenti()} */}
      </div>

      {/* modal */}
      <div className="modal">
        <Modal
          show={show}
          onHide={handleClose}
          style={{
            marginTop: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Seleziona {selectedTypeElement}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {handleSelectTypeElement} seleziona intestazione modal */}
            {selectedTypeElement === "Anagrafica" && {
                handleSelectTypeElement,
              } && (
                <Anagrafica
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementAnagrafica={
                    handleRequestElementAnagrafica
                  }
                  toggleChooseSelectElementAnagrafica={
                    toggleChooseSelectElementAnagrafica
                  }
                />
              )}

            {selectedTypeElement === "Depositi" && {
                handleSelectTypeElement,
              } && (
                <Depositi
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementDepositi={handleRequestElementDepositi}
                  toggleChooseSelectElementDepositi={
                    toggleChooseSelectElementDepositi
                  }
                />
              )}

            {selectedTypeElement === "DescrizioneTrasporto" && {
                handleSelectTypeElement,
              } && (
                <DescrizioneTrasporto
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementDescrizioneTrasporto={
                    handleRequestElementDescrizioneTrasporto
                  }
                  toggleChooseSelectElementDescrizioneTrasporto={
                    toggleChooseSelectElementDescrizioneTrasporto
                  }
                />
              )}

            {selectedTypeElement === "Trasporti" && {
                handleRequestElementTrasporti,
              } && (
                <Trasporti
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementTrasporti={handleRequestElementTrasporti}
                  toggleChooseSelectElementTrasporti={
                    toggleChooseSelectElementTrasporti
                  }
                />
              )}

            {selectedTypeElement === "LocalitaTrasporti" && {
                handleSelectTypeElement,
              } && (
                <LocalitaTrasporti
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementLocalitaTrasporti={
                    handleRequestElementLocalitaTrasporti
                  }
                  toggleChooseSelectElementLocalitaTrasporti={
                    toggleChooseSelectElementLocalitaTrasporti
                  }
                />
              )}

            {selectedTypeElement === "TipoBolla" && {
                handleRequestElementTipoBolla,
              } && (
                <TipoBolla
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementTipoBolla={handleRequestElementTipoBolla}
                  toggleChooseSelectElementTipoBolla={
                    toggleChooseSelectElementTipoBolla
                  }
                />
              )}
            {selectedTypeElement === "TipoPagamento" && {
                handleRequestElementTipoPagamento,
              } && (
                <TipoPagamento
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementTipoPagamento={
                    handleRequestElementTipoPagamento
                  }
                  toggleChooseSelectElementTipoPagamento={
                    toggleChooseSelectElementTipoPagamento
                  }
                />
              )}

            {/* {selectedTypeElement === "Documenti" && {
                handleSelectTypeElement,
              } && (
                <Documenti
                  selectedElement={selectedElement}
                  togglehandleCLose={togglehandleCLose}
                  handleRequestElementDocumenti={handleRequestElementDocumenti}
                  toggleChooseSelectElementDocumenti={
                    toggleChooseSelectElementDocumenti
                  }
                />
              )} */}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Seleziona
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Annulla
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    </div>
  );
}

export default CreaFattura;
