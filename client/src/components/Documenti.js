import React from "react";
import { useState, useEffect } from "react";
// import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import baseURL from "../api/connection";

function Documenti({
  selectedElement,
  togglehandleCLose,
  handleRequestElementDocumenti,
  toggleChooseSelectElementDocumenti,
})  {
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
  const [PreAttivo, setPreAttivo] = useState(false);
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
  const [accompagnatoria, setAccompagnatoria] = useState("");
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

  const [editCodTipoDocumento, setEditCodTipoDocumento] = useState("");
  const [editNumero, setEditNumero] = useState("");
  const [editDataDocumento, setEditDataDocumento] = useState("");
  const [editCodAgente, setEditCodAgente] = useState("");
  const [editCodIntestatario, setEditCodIntestatario] = useState("");
  const [editIntestatario_ragionesociale, setEditIntestatario_ragionesociale] =
    useState("");
  const [editIntestatario_partitaiva, setEditIntestatario_partitaiva] =
    useState("");
  const [editIntestatario_codicefiscale, setEditIntestatario_codicefiscale] =
    useState("");
  const [editIntestatario_localita, setEditIntestatario_localita] =
    useState("");
  const [editIntestatario_prov, setEditIntestatario_prov] = useState("");
  const [editIntestatario_indirizzo, setEditIntestatario_indirizzo] =
    useState("");
  const [editIntestatario_cap, setEditIntestatario_cap] = useState("");
  const [editDataAccettazione, setEditDataAccettazione] = useState("");
  const [editPreAttivo, setEditPreAttivo] = useState("");
  const [editDDT_Destinazione, setEditDDT_Destinazione] = useState("");
  const [editDDT_indirizzo, setEditDDT_indirizzo] = useState("");
  const [editDDT_localita, setEditDDT_localita] = useState("");
  const [editDDT_cap, setEditDDT_cap] = useState("");
  const [editDDT_prov, setEditDDT_prov] = useState("");
  const [editCodModPagamento, setEditCodModPagamento] = useState("");
  const [editDDT_Vettore, setEditDDT_Vettore] = useState("");
  const [editDDT_TrasportoMezzo, setEditDDT_TrasportoMezzo] = useState("");
  const [editDDT_AspettoBeni, setEditDDT_AspettoBeni] = useState("");
  const [editDDT_NumeroColli, setEditDDT_NumeroColli] = useState("");
  const [editDDT_DataOraInizio, setEditDDT_DataOraInizio] = useState("");
  const [editDDT_DataOraRitiro, setEditDDT_DataOraRitiro] = useState("");
  const [editDDT_Porto, setEditDDT_Porto] = useState("");
  const [editDDT_CausaleTrasporto, setEditDDT_CausaleTrasporto] = useState("");
  const [editAccompagnatoria, setEditAccompagnatoria] = useState("");
  const [editCodddt, setEditCodddt] = useState("");
  const [editRifDDT, setEditRifDDT] = useState("");
  const [editAttivo, setEditAttivo] = useState("");
  const [editImponibile, setEditImponibile] = useState("");
  const [editIVA, setEditIVA] = useState("");
  const [editTotale, setEditTotale] = useState("");
  const [editTipologia, setEditTipologia] = useState("");
  const [editQuantitaPeso, setEditQuantitaPeso] = useState("");
  const [editLuogoCarico, setEditLuogoCarico] = useState("");
  const [editLuogoScarico, setEditLuogoScarico] = useState("");

  const [documentoList, setDocumentoList] = useState([]);
  const [selectedDocumento, setSelectedDocumento] = useState("");
  const [selectedEditDocumento, setSelectedEditDocumento] = useState("");
  const [isCheckedPreAttivo, setIsCheckedPreAttivo] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const fetchDocumenti = async () => {
    try {
      const data = await baseURL.get("/documenti", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const { documenti } = data.data;
      setDocumentoList(documenti);
      const d = data.data;
      console.log(d);
    } catch (error) {
      navigate("/Login");
      console.error("Errore nella richiesta Axios:", error.message);
    }
  };
  useEffect(() => {
    fetchDocumenti();
  }, [selectedEditDocumento]);
  //  update documento
  const handleChangeDocumento = (e, field) => {
    if (field === "editCodTipoDocumento") {
      setEditCodTipoDocumento(e.target.value);
    } else if (field === "editNumero") {
      setEditNumero(e.target.value);
    } else if (field === "editDataDocumento") {
      setEditDataDocumento(e.target.value);
    } else if (field === "editCodAgente") {
      setEditCodAgente(e.target.value);
    } else if (field === "editCodIntestatario") {
      setEditCodIntestatario(e.target.value);
    } else if (field === "editIntestatario_ragionesociale") {
      setEditIntestatario_ragionesociale(e.target.value);
    } else if (field === "editIntestatario_partitaiva") {
      setEditIntestatario_partitaiva(e.target.value);
    } else if (field === "editIntestatario_codicefiscale") {
      setEditIntestatario_codicefiscale(e.target.value);
    } else if (field === "editIntestatario_localita") {
      setEditIntestatario_localita(e.target.value);
    } else if (field === "editIntestatario_prov") {
      setEditIntestatario_prov(e.target.value);
    } else if (field === "editIntestatario_indirizzo") {
      setEditIntestatario_indirizzo(e.target.value);
    } else if (field === "editIntestatario_cap") {
      setEditIntestatario_cap(e.target.value);
    } else if (field === "editDataAccettazione") {
      setEditDataAccettazione(e.target.value);
    } else if (field === "editPreAttivo") {
      setEditPreAttivo(e.target.value);
    } else if (field === "editDDT_Destinazione") {
      setEditDDT_Destinazione(e.target.value);
    } else if (field === "editDdt_indirizzo") {
      setEditDDT_indirizzo(e.target.value);
    } else if (field === "editDdt_localita") {
      setEditDDT_localita(e.target.value);
    } else if (field === "editDdt_cap") {
      setEditDDT_cap(e.target.value);
    } else if (field === "editDdt_prov") {
      setEditDDT_prov(e.target.value);
    } else if (field === "editCodModPagamento") {
      setEditCodModPagamento(e.target.value);
    } else if (field === "editDDT_Vettore") {
      setEditDDT_Vettore(e.target.value);
    } else if (field === "editDDT_TrasportoMezzo") {
      setEditDDT_TrasportoMezzo(e.target.value);
    } else if (field === "editDDT_AspettoBeni") {
      setEditDDT_TrasportoMezzo(e.target.value);
    } else if (field === "editDDT_NumeroColli") {
      setEditDDT_NumeroColli(e.target.value);
    } else if (field === "editDDT_DataOraInizio") {
      setEditDDT_DataOraInizio(e.target.value);
    } else if (field === "editDDT_DataOraRitiro") {
      setEditDDT_DataOraRitiro(e.target.value);
    } else if (field === "editDDT_Porto") {
      setEditDDT_Porto(e.target.value);
    } else if (field === "editDDT_CausaleTrasporto") {
      setEditDDT_CausaleTrasporto(e.target.value);
    } else if (field === "editAccompagnatoria") {
      setEditAccompagnatoria(e.target.value);
    } else if (field === "editCodddt") {
      setEditCodddt(e.target.value);
    } else if (field === "editRifDDT") {
      setEditRifDDT(e.target.value);
    } else if (field === "editAttivo") {
      setEditAttivo(e.target.value);
    } else if (field === "editImponibile") {
      setEditImponibile(e.target.value);
    } else if (field === "editIVA") {
      setEditIVA(e.target.value);
    } else if (field === "editTotale") {
      setEditTotale(e.target.value);
    } else if (field === "editTipologia") {
      setEditTipologia(e.target.value);
    } else if (field === "editQuantitaPeso") {
      setEditQuantitaPeso(e.target.value);
    } else if (field === "editLuogoCarico") {
      setEditLuogoCarico(e.target.value);
    } else if (field === "editLuogoScarico") {
      setEditLuogoScarico(e.target.value);
    }
  };

  const handleDeleteDocumento = async (IdDocumento) => {
    try {
      await baseURL.delete(`/documenti/${IdDocumento}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const updatedListDocumento = documentoList.filter(
        (documento) => documento.idIdDocumento !== IdDocumento
      );
      setDocumentoList(updatedListDocumento);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleEditDocumento = (e) => {
    // setEditIdDocumento(e.IdDocumento);
    setEditCodTipoDocumento(e.editCodTipoDocumento);
    setEditNumero(e.editNumero);
    setEditDataDocumento(e.editDataDocumento);
    setEditCodAgente(e.editCodAgente);
    setEditCodIntestatario(e.editCodIntestatario);
    setEditIntestatario_ragionesociale(e.editIntestatario_ragionesociale);
    setEditIntestatario_partitaiva(e.editIntestatario_partitaiva);
    setEditIntestatario_codicefiscale(e.editIntestatario_codicefiscale);
    setEditIntestatario_localita(e.editIntestatario_localita);
    setEditIntestatario_prov(e.editIntestatario_prov);
    setEditIntestatario_indirizzo(e.editIntestatario_indirizzo);
    setEditIntestatario_cap(e.editIntestatario_cap);
    setEditDataAccettazione(e.editDataAccettazione);
    setEditPreAttivo(e.editPreAttivo);
    setEditDDT_Destinazione(e.editDDT_Destinazione);
    setEditDDT_indirizzo(e.editDDT_indirizzo);
    setEditDDT_localita(e.editDDT_localita);
    setEditDDT_cap(e.editDDT_cap);
    setEditDDT_prov(e.editDDT_prov);
    setEditCodModPagamento(e.editCodModPagamento);
    setEditDDT_Vettore(e.editDDT_Vettore);
    setEditDDT_TrasportoMezzo(e.editDDT_TrasportoMezzo);
    setEditDDT_AspettoBeni(e.editDDT_AspettoBeni);
    setEditDDT_NumeroColli(e.editDDT_NumeroColli);
    setEditDDT_DataOraInizio(e.editDDT_DataOraInizio);
    setEditDDT_DataOraRitiro(e.editDDT_DataOraRitiro);
    setEditDDT_Porto(e.editDDT_Porto);
    setEditDDT_CausaleTrasporto(e.editDDT_CausaleTrasporto);
    setEditAccompagnatoria(e.editAccompagnatoria);
    setEditCodddt(e.editCodddt);
    setEditRifDDT(e.editRifDDT);
    setEditAttivo(e.editAttivo);
    setEditImponibile(e.editImponibile);
    setEditIVA(e.editIVA);
    setEditTotale(e.editTotale);
    setEditTipologia(e.editTipologia);
    setEditQuantitaPeso(e.editQuantitaPeso);
    setEditLuogoCarico(e.editLuogoCarico);
    setEditLuogoScarico(e.editLuogoScarico);
  };

  const handleEditDocumento = async (e) => {
    e.preventDefault();
    try {
      if (
        CodTipoDocumento &&
        Numero &&
        DataDocumento &&
        CodAgente &&
        CodIntestatario &&
        intestatario_ragionesociale &&
        intestatario_partitaiva &&
        intestatario_codicefiscale &&
        intestatario_localita &&
        intestatario_prov &&
        intestatario_indirizzo &&
        intestatario_cap &&
        DataAccettazione &&
        PreAttivo &&
        DDT_Destinazione &&
        ddt_indirizzo &&
        ddt_localita &&
        ddt_cap &&
        ddt_prov &&
        CodModPagamento &&
        DDT_Vettore &&
        DDT_TrasportoMezzo &&
        DDT_AspettoBeni &&
        DDT_NumeroColli &&
        DDT_DataOraInizio &&
        DDT_DataOraRitiro &&
        DDT_Porto &&
        DDT_CausaleTrasporto &&
        accompagnatoria &&
        codddt &&
        RifDDT &&
        Attivo &&
        Imponibile &&
        IVA &&
        Totale &&
        Tipologia &&
        QuantitaPeso &&
        LuogoCarico &&
        LuogoScarico
      ) {
        const data = await baseURL.put(
          `/documenti/${IdDocumento}`,
          {
            CodTipoDocumento: editCodTipoDocumento,
            Numero: editNumero,
            DataDocumento: editDataDocumento,
            CodAgente: editCodAgente,
            CodIntestatario: editCodIntestatario,
            intestatario_ragionesociale: editIntestatario_ragionesociale,
            intestatario_partitaiva: editIntestatario_partitaiva,
            intestatario_codicefiscale: editIntestatario_codicefiscale,
            intestatario_localita: editIntestatario_localita,
            intestatario_prov: editIntestatario_prov,
            intestatario_indirizzo: editIntestatario_indirizzo,
            intestatario_cap: editIntestatario_cap,
            DataAccettazione: editDataAccettazione,
            PreAttivo: editPreAttivo,
            DDT_Destinazione: editDDT_Destinazione,
            ddt_indirizzo: editDDT_indirizzo,
            ddt_localita: editDDT_localita,
            ddt_cap: editDDT_cap,
            ddt_prov: editDDT_prov,
            CodModPagamento: editCodModPagamento,
            DDT_Vettore: editDDT_Vettore,
            DDT_TrasportoMezzo: editDDT_TrasportoMezzo,
            DDT_AspettoBeni: editDDT_AspettoBeni,
            DDT_NumeroColli: editDDT_NumeroColli,
            DDT_DataOraInizio: editDDT_DataOraInizio,
            DDT_DataOraRitiro: editDDT_DataOraRitiro,
            DDT_Porto: editDDT_Porto,
            DDT_CausaleTrasporto: editDDT_CausaleTrasporto,
            accompagnatoria: editAccompagnatoria,
            codddt: editCodddt,
            RifDDT: editRifDDT,
            Attivo: editAttivo,
            Imponibile: editImponibile,
            IVA: editIVA,
            Totale: editTotale,
            Tipologia: editTipologia,
            QuantitaPeso: editQuantitaPeso,
            LuogoCarico: editLuogoCarico,
            LuogoScarico: editLuogoScarico,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        const updatedDocumento = data.data.documento;
        const updatedListDocumento = documentoList.map((documento) => {
          if (documento.IdDocumento === IdDocumento) {
            return (documento = updatedDocumento);
          }
          return documento;
        });
        setDocumentoList(updatedListDocumento);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleDetails = () => {};

  const toggleSubmitFatturaDettagli = (e) => {
    if (selectedElement === false) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            toggleEditDocumento(e);
            setSelectedDocumento(e.idIdDocumento);
            setSelectedEditDocumento("True");
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
              handleRequestElementDocumenti(
                e.intestatario_ragionesociale,
                e.intestatario_partitaiva,
                e.DDT_Destinazione,
                e.ddt_indirizzo,
                e.DDT_TrasportoMezzo,
                e.DDT_NumeroColli,
                e.Imponibile,
                e.IVA,
                e.Totale,
                e.QuantitaPeso,
                e.LuogoCarico,
                e.LuogoScarico
              );
              console.log(
                "dati documenti da traferire a creafattura",
                e.intestatario_ragionesociale,
                e.intestatario_partitaiva,
                e.DDT_Destinazione,
                e.ddt_indirizzo,
                e.DDT_TrasportoMezzo,
                e.DDT_NumeroColli,
                e.Imponibile,
                e.IVA,
                e.Totale,
                e.QuantitaPeso,
                e.LuogoCarico,
                e.LuogoScarico
              );
              toggleChooseSelectElementDocumenti(true);
              togglehandleCLose(false);
            }}
          >
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedDocumento("");
              setSelectedEditDocumento("");
            }}
          >
            Annulla
          </button>
        </div>
      );
    }
  };
  // const valoriDocumenti = [
  //   CodTipoDocumento,
  //   Numero,
  //   DataDocumento,
  //   CodAgente,
  //   CodIntestatario,
  //   intestatario_ragionesociale,
  //   intestatario_partitaiva,
  //   intestatario_codicefiscale,
  //   intestatario_localita,
  //   intestatario_prov,
  //   intestatario_indirizzo,
  //   intestatario_cap,
  //   DataAccettazione,
  //   PreAttivo,
  //   DDT_Destinazione,
  //   ddt_indirizzo,
  //   ddt_localita,
  //   ddt_cap,
  //   ddt_prov,
  //   CodModPagamento,
  //   DDT_Vettore,
  //   DDT_TrasportoMezzo,
  //   DDT_AspettoBeni,
  //   DDT_NumeroColli,
  //   DDT_DataOraInizio,
  //   DDT_DataOraRitiro,
  //   DDT_Porto,
  //   DDT_CausaleTrasporto,
  //   accompagnatoria,
  //   codddt,
  //   RifDDT,
  //   Attivo,
  //   Imponibile,
  //   IVA,
  //   Totale,
  //   Tipologia,
  //   QuantitaPeso,
  //   LuogoCarico,
  //   LuogoScarico,
  // ];
  // const parametriDocumenti = [
  //   "CodTipoDocumento",
  //   "Numero",
  //   "DataDocumento",
  //   "CodAgente",
  //   "CodIntestatario",
  //   "intestatario_ragionesociale",
  //   "intestatario_partitaiva",
  //   "intestatario_codicefiscale",
  //   "intestatario_localita",
  //   "intestatario_prov",
  //   "intestatario_indirizzo",
  //   "intestatario_cap",
  //   "DataAccettazione",
  //   "PreAttivo",
  //   "DDT_Destinazione",
  //   "ddt_indirizzo",
  //   "ddt_localita",
  //   "ddt_cap",
  //   "ddt_prov",
  //   "CodModPagamento",
  //   "DDT_Vettore",
  //   "DDT_TrasportoMezzo",
  //   "DDT_AspettoBeni",
  //   "DDT_NumeroColli",
  //   "DDT_DataOraInizio",
  //   "DDT_DataOraRitiro",
  //   "DDT_Porto",
  //   "DDT_CausaleTrasporto",
  //   "accompagnatoria",
  //   "codddt",
  //   "RifDDT",
  //   "Attivo",
  //   "Imponibile",
  //   "IVA",
  //   "Totale",
  //   "Tipologia",
  //   "QuantitaPeso",
  //   "LuogoCarico",
  //   "LuogoScarico",
  // ];
  return (
    <>
      {/* header */}
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
            <h1>Documenti</h1>
          </div>
        )}

        <div>
          {/* {selectedDocumento === "" && selectedEditDocumento=== "" && (
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
          )} */}
        </div>
      </section>

      {/* modifica */}
      <section className="modificaDDocumenti"></section>

      {/* dettagli */}
      <section
        className="dettagliDocumenti"
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
        {documentoList.map((e) => {
          if (selectedDocumento === e.idIdDocumento 
            && selectedEditDocumento === "False") {
            return (
            <div
              key={e.IdDocumento}
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
              <h2>Denominazione: {e.intestatario_ragionesociale} </h2>
              <p>Partita Iva: {e.partitaiva}</p>
              {/* <p>Codice Fiscale: {e.codicefiscale}</p>
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
              <p>scontopredlistino: {e.scontopredlistino}</p> */}
            </div>);
          }
        })}
      </section>

      {/* lista */}
      <section className="listaDocumenti">
        {documentoList.map((e) => {
          if (selectedDocumento === "" && selectedEditDocumento === "") {
            return (
              <ul key={e.IdDocumento}>
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
                      flexDirection: "colums",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      {e.intestatario_ragionesociale}{" "}
                    </div>
                    <div style={{ marginRight: "10px" }}>{e.LuogoCarico}</div>
                    <div style={{ marginRight: "10px" }}>{e.LuogoScarico}</div>
                    <div style={{ marginRight: "10px" }}>{e.codazienda}</div>
                    <div style={{ marginRight: "10px" }}>{e.DDT_Vettore}</div>
                    <div style={{ marginRight: "10px" }}>{e.Attivo}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setSelectedDocumento(e.idDocumento); 
                         setSelectedEditDocumento("False")
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

export default Documenti;
