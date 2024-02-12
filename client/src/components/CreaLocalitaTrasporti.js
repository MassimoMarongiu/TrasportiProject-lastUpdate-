import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import baseURL from "../api/connection";
import { useNavigate } from "react-router-dom";

const CreaLocalitaTrasporti = () => {
  const [idlocalita, setIdLocalita] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [provincia, setProvincia] = useState("");
  const [cap, setCap] = useState("");
  const [visibile, setVisibile] = useState(1);
  const [arrivo, setArrivo] = useState("");

  const [localitaTrasportiList, setLocalitaTrasportiList] = useState([]);
 const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const checkChange = () => {
    setIsChecked(!isChecked);
    !isChecked ? setVisibile(0) : setVisibile(1);
    // console.log(isChecked);
    // console.log(visibile);
  };

  const handleInputChange = (e, field) => {
    if (field === "descrizione") {
      setDescrizione(e.target.value);
    }
    if (field === "provincia") {
      setProvincia(e.target.value);
    }
    if (field === "cap") {
      setCap(e.target.value);
     }
    if (field === "arrivo") {
      setArrivo(e.target.value);
    }
    if (field === "visibile") {
      checkChange();
      // console.log(isChecked);
      // console.log(visibile);
    }
      
  };

  useEffect(() => {
    handleInputChange();
  }, [isChecked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await baseURL.post(
        `/creaLocalitaTrasporti`,
        { descrizione,provincia,cap,arrivo, visibile },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setLocalitaTrasportiList([...localitaTrasportiList, data.data]);
      setIdLocalita(null);
      setDescrizione("");
      setProvincia("");
      setCap("");
      setArrivo("");
      // setVisibile(1);
      navigate("/localitaTrasporti");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
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
          onChange={(e) => handleInputChange(e, "descrizione")}
          type="textbox"
        /> 
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
        <Form.Label htmlFor="provincia">Provincia</Form.Label>
        <Form.Control
          onChange={(e) => handleInputChange(e, "provincia")}
          type="textbox"
        /> 
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
        <Form.Label htmlFor="cap">cap</Form.Label>
        <Form.Control
        style={{ width: "80px" }}
          onChange={(e) => handleInputChange(e, "cap")}
          type="textbox"
          maxLength={5}
        /> 
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
        <Form.Label htmlFor="arrivo">Arrivo</Form.Label>
        <Form.Control
        style={{ width: "80px" }}
          onChange={(e) => handleInputChange(e, "arrivo")}
          type="textbox"
        /> 
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
      
         <Form.Check
        //  style={{ marginTop: "20px" }}
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
          navigate("/localitaTrasporti");
        }}
      >
        Annulla
      </Button>
    </Form>
  );
};

export default CreaLocalitaTrasporti;
