import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUser = (data) => {
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    };

    fetch("/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("data.access_token",data.access_token);
        console.log("data.refresh_token",data.refresh_token);
        if (data){
          login(data.access_token)
          navigate("/");
         }
         else{
             alert('Invalid username or password')
         }
      });

    reset();
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Login</h1>
        <p>rivedere tentativi sbagliati in flask</p>
        <form>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              {...register("username", { required: true, maxLength: 25 })}

              value={"Username"}

            />
          </Form.Group>
          <br></br>
          {errors.username?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Username is required</small>
            </p>
          )}
          {errors.username?.type === "minLength" && (
            <p style={{ color: "red" }}>
              <small>Username should be less than 25 character</small>
            </p>
          )}
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              {...register("password", { required: true, minLength: 8 })}

              value={"Password"}
              
            />
          </Form.Group>
          <br></br>
          {errors.password?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Password is required</small>
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Min characters should be 8</small>
            </p>
          )}
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(loginUser)}
            >
              Accedi
            </Button>
          </Form.Group>
          {/* <br></br>
          <Form.Group>
            <small>
              Non hai un account?
              <a href="/signup">Registrati</a>
            </small>
          </Form.Group> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
