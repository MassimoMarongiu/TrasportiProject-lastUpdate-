import React, { useState } from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function CustomInput({label,maxlength,pattern,largezza,value,name,input,
  insertEmpty,errorPattern}) {

    const[formData,setFormData]=useState({
      field:""});

    const handleInputChange=(e)=>{
      const {name} = e.target;
      const inputValue= value
      setFormData({[name]:inputValue})
    }
  return (
    <Form.Group  mb="30" controlId="validationCustomUsername">
    <Form.Label>{label}</Form.Label>
    <InputGroup hasValidation>
      <Form.Control
      style={{width:`${largezza}`}}
        type="text"
        placeholder={label}
        maxlength={maxlength}
        pattern={pattern}
        aria-describedby="inputGroupPrepend"
        required
        name={`${name}`}
        value={formData.field}
        onChange={handleInputChange}
      />
      <Form.Control.Feedback type="invalid">
      {/* {insertEmpty.trim() ? `${insertEmpty}` :""}
      { errorPattern ? `${errorPattern}` : ""} */}
      </Form.Control.Feedback>
      
    </InputGroup>
  </Form.Group>
  )
}

export default CustomInput