import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/main.css'
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Anagrafica from "./components/Anagrafica";
import CreaAnagrafica from "./components/CreaAnagrafica";
import Depositi from "./components/Depositi";
import CreaDeposito from "./components/CreaDeposito";
import DescrizioneTrasporto from "./components/DescrizioneTrasporto";
import CreaDescrizioneTrasporto from "./components/CreaDescrizioneTrasporto";
import Documenti from "./components/Documenti";
import CreaDocumenti from "./components/CreaDocumenti";
import TipoPagamento from "./components/TipoPagamento";
import CreaTipoPagamento from "./components/CreaTipoPagamento";
import LocalitaTrasporti from "./components/LocalitaTrasporti";
import CreaLocalitaTrasporti from "./components/CreaLocalitaTrasporti";
import TipoBolla from "./components/TipoBolla";
import CreaTipoBolla from "./components/CreaTipoBolla";
import SessioneScaduta from "./components/SessioneScaduta";
import Trasporti from "./components/Trasporti";
import CreaTrasporti from "./components/CreaTrasporti";
import FattureList from "./components/FattureList";
import CreaFattura from "./components/CreaFattura";
import FattureBozze from "./components/FattureBozze";
import { useState } from "react";
function App() {
const [selectedElement, setSelectedElement] = useState(false); 

const toggleSelected_Detail = (e) => setSelectedElement(e);
  return (
    <>
      <Router>
        <NavBar element={NavBar} 
        /*selectedElement={selectedElement}*//>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/descrizioneTrasporto" element={<DescrizioneTrasporto selectedElement={selectedElement} />}/>
          <Route path="/creaDescrizioneTrasporto" element={<CreaDescrizioneTrasporto />}/>
          <Route path="/anagrafica" element={<Anagrafica selectedElement={selectedElement} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/>} />
          <Route path="/creaAnagrafica" element={<CreaAnagrafica />} />
          <Route path="/documenti" element={<Documenti selectedElement={selectedElement} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/>} />
          <Route path="/creaDocumenti" element={<CreaDocumenti />} />
          <Route path="/sessioneScaduta" element={<SessioneScaduta />} />
          <Route path="/depositi" element={<Depositi selectedElement={selectedElement}/>}  />
          <Route path="/creaDeposito" element={<CreaDeposito />} />
          <Route path="/localitaTrasporti" element={<LocalitaTrasporti selectedElement={selectedElement}/>} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/> 
          <Route path="/creaLocalitaTrasporti" element={<CreaLocalitaTrasporti />} /> 
          <Route path="/tipoPagamento" element={<TipoPagamento selectedElement={selectedElement} />} />
          <Route path="/creaTipoPagamento" element={<CreaTipoPagamento />} />
          <Route path="/tipoBolla" element={<TipoBolla selectedElement={selectedElement} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/>} />
          <Route path="/creaTipoBolla" element={<CreaTipoBolla />} />
          <Route path="/trasporti" element={<Trasporti selectedElement={selectedElement} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/>} />
          <Route path="/creaTrasporti" element={<CreaTrasporti />} />
          <Route path="/fatture" element={<FattureList />} />
          <Route path="/fattureBozze" element={<FattureBozze />} />
          <Route path="/creaFattura" element={<CreaFattura selectedElement={selectedElement} toggleSelected_Detail={(e)=>toggleSelected_Detail(e)}/> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
