import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";

const CreaTipoBolla = () => {
  const [idtipobolla, setIdTipoBolla] = useState(null);
  const [descrizione, setDescrizione] = useState("");
  const [visibile, setVisibile] = useState(1);
  const [tipoBollaList, setTipoBollaList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const checkChange = () => {
    setIsChecked(!isChecked);
    !isChecked ? setVisibile(0) : setVisibile(1);
    // console.log(visibile);
  };
  const handleInputChange = (e, field) => {
    if (field === "descrizione") {
      setDescrizione(e.target.value);
    } else if (field === "visibile") {
      // setVisibile("sono in visibile");
      checkChange();
    }
  };

  useEffect(() => {
    handleInputChange();
  }, []);

  // crea azienda
  const handleSubmitTipoBolla = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaTipoBolla`,
        {
          descrizione,
          visibile,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setTipoBollaList([...tipoBollaList, data.data]);
      setIdTipoBolla(null);
      setDescrizione("");
      setVisibile("");
      navigate("/tipoBolla");
    } catch (error) {
      navigate("/Login");
      console.error(error.message);
    }
  };

  // const parametriTipoBolla = ["descrizione", "visibile"];

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        maxWidth: "500px",
      }}
    >
      <div>
        <h1>Aggiungi Tipo Bolla</h1>
      </div>
      <div>
        <Form
          onSubmit={handleSubmitTipoBolla}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            maxWidth: "500px",
          }}
        >
          <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Descrizione"
              onChange={(e) => handleInputChange(e, "descrizione")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Visibile"
              checked={!isChecked}
              onChange={(e) => handleInputChange(e, "visibile")}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            name="salva"
            // onClick={() => {
            // }}
          >
            Salva
          </Button>
          <Button
            style={{ marginTop: "10px" }}
            variant="success"
            name="annulla"
            type="submit"
            onClick={() => {
              navigate("/tipoBolla");
            }}
          >
            Annulla
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CreaTipoBolla;
