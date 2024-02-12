import React from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../auth";
import Dropdown from "react-bootstrap/Dropdown";

const LoggedInLinks = () => {
  const liStyle = {
    display: "flex",
    alignItems: "center",
    border: "1px solid",
    borderRadius: "5px",
    borderColor: "white",
    variant: "primary",
    height: "40px",
    width: "auto",
    boxShadow: "2px 2px 4px black",
    marginRight: "2px",
  };
  const DropDownStyle = {
    border: "1px solid",
    borderRadius: "5px",
    borderColor: "white",
    variant: "primary",
    backgroundColor: "#0d6efd",
    color: "white",
  };
  return (
    <ul className="navbar-nav" style={{display: "flex", alignItems: "center",gap: "1px",paddingLeft: "5px"}}>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            id="dropdown-basic"
            name="dropdown-basic"
            style={liStyle}
          >
            Fatture
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/fatture" style={DropDownStyle}>
              Lista Fatture
            </Dropdown.Item>
            <Dropdown.Item href="/fattureBozze" style={DropDownStyle}>
              Bozze Fatture
            </Dropdown.Item>
            <Dropdown.Item href="/creaFattura" style={DropDownStyle}>
              Registra Fattura
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            id="dropdown-basic"
            name="dropdown-basic"
            style={liStyle}
          >
            Documenti
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/documenti" style={DropDownStyle}>
              Lista Documenti
            </Dropdown.Item>
            <Dropdown.Item href="/creaDocumenti" style={DropDownStyle}>
              Registra Documento
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Anagrafica
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/anagrafica" style={DropDownStyle}>
              Lista Anagrafica
            </Dropdown.Item>
            <Dropdown.Item href="/creaAnagrafica" style={DropDownStyle}>
              Registra Anagrafica
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Depositi
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/depositi" style={DropDownStyle}>
              Lista Depositi
            </Dropdown.Item>
            <Dropdown.Item href="/creaDeposito" style={DropDownStyle}>
              Registra Deposito
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Descrizione trasporto
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/descrizioneTrasporto" style={DropDownStyle}>
              Descrizione trasporto
            </Dropdown.Item>
            <Dropdown.Item
              href="/creaDescrizioneTrasporto"
              style={DropDownStyle}
            >
              Crea descrizione trasporto
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Trasporti
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/trasporti" style={DropDownStyle}>
              Lista trasporti
            </Dropdown.Item>
            <Dropdown.Item href="/creaTrasporti" style={DropDownStyle}>
              Registra Trasporto
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Località trasporti
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/localitaTrasporti" style={DropDownStyle}>
              Lista località Trasporti
            </Dropdown.Item>
            <Dropdown.Item href="/creaLocalitaTrasporti" style={DropDownStyle}>
              Registra località Trasporti
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            name="dropdown-basic"
          >
            Tipo bolla
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/tipoBolla" style={DropDownStyle}>
              Lista tipi bolla
            </Dropdown.Item>
            <Dropdown.Item href="/creaTipoBolla" style={DropDownStyle}>
              Registra tipo bolla
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="nav-item dropdown">
        <Dropdown>
          <Dropdown.Toggle
            className="drop"
            style={liStyle}
            id="dropdown-basic"
            name="dropdown-basic"
          >
            Tipo pagamento
          </Dropdown.Toggle>
          <Dropdown.Menu style={DropDownStyle}>
            <Dropdown.Item href="/tipoPagamento" style={DropDownStyle}>
              Lista tipi pagamento
            </Dropdown.Item>
            <Dropdown.Item href="/creaTipoPagamento" style={DropDownStyle}>
              Registra tipo pagamento
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <li
        className="nav-item"
        style={liStyle}
      >
        <a
          className="nav-link"
          href="/login"
          onClick={() => {
            logout();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-down"
            viewBox="0 0 16 16"
            style={{ marginRight: "3px" }}
          >
            <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
          </svg>{" "}
          LogOut{" "}
        </a>
      </li>
    </ul>
  );
};

const LoggedOutLinks = () => {
  return (
    <>
      {/* <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">
          Home
        </a>
      </li> */}

      {/* <li className="nav-item">
        <a className="nav-link" href="/signup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-add"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
          </svg>
          Sign up
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          Login
        </a>
      </li> */}
    </>
  );
};

const NavBar = () => {
  const [logged] = useAuth();
  console.log("logged" + logged);
  const toggleButtonListElemet = () => {
    let x = document.getElementById("navbarNav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">  
    <div>
        <div className="collapse navbar-collapse" id="navbarNav">
          {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
        </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler order-sm-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => toggleButtonListElemet()}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
     
      </div>
    </div>
   
    </nav>
  );
};

export default NavBar;
