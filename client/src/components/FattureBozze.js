import React,{useState,useEffect} from 'react'
import { Form } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalCustom from './customComponents/ModalCustom';
function FattureBozze() {
    const [anagraficaList, setAnagraficaList] = useState([]);
    const [depositoList, setDepositoList] = useState([]);
    const [descrizioneTraportiList, setDescrizioneTrasportoList] = useState([]);
    const [documentiList, setDocumentiList] = useState([]);
    const [descrizioneList, setDescrizioneList] = useState([]);
    const [tipoBollaList, setTipoBollaList] = useState([]);
    const [tipoPagamentoList, setTipoPagamentoList] = useState([]);
    const [trasportiList, setTrasportiList] = useState([]);

    const requestTypeElement = ["anagrafica","deposito","descrizioneTrasporto","documenti","descrizione","tipoBolla","tipoPagamento","trasporti"];

  return (
    <>
    <div>CreaFattura</div>
    <div>Select Anagrafica</div>
    <Button variant="primary" onClick={() => <ModalCustom/>}>Primary</Button>

    </>
  )
}

export default FattureBozze