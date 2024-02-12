import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";

const CreaDescrizioneTrasporto = () => {
  const [iddescrizione, setIddescrizione] = useState(null);
  const [descrizione, setDescrizione] = useState("");
  const [visibile, setVisibile] = useState(1);
  const [descrizioneTrasportoList, setDescrizioneTrasportoList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const checkChange = () => {
    setIsChecked(!isChecked);
    !isChecked ? setVisibile(0) : setVisibile(1);
    console.log(isChecked);
    console.log(visibile);
  };

  const handleInputChange = (e, field) => {
    if (field === "descrizione") {
      setDescrizione(e.target.value);
    }
    if (field === "visibile") {
      checkChange();
      // console.log(isChecked);
      // console.log(visibile);
    }
  };

  useEffect(() => {
    handleInputChange();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaDescrizioneTrasporti`,
        { descrizione, visibile },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setDescrizioneTrasportoList([...descrizioneTrasportoList, data.data]);
      setIddescrizione(null);
      setDescrizione("");
      // setVisibile(1);
      navigate("/descrizioneTrasporto");
      // setEditDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

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
        <h1>Aggiungi DescrizioneTrasporto </h1>
      </div>
<div>
        <Form
        onSubmit={handleSubmit}
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
          <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
          <Form.Control
            type="textbox"
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
          name="check"
          type="submit"
          // onSelect={checkChange}
        >
          Salva
        </Button>
        <Button
          style={{ marginTop: "10px" }}
          variant="success"
          name="check"
          type="submit"
          onClick={() => {
            navigate("/descrizioneTrasporto");
          }}
        >
          Annulla
        </Button>
      </Form>
</div>


    </div>
  );
};

export default CreaDescrizioneTrasporto;
