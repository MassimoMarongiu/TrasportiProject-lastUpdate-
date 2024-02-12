import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [show, setShow] = useState(true);
  const [serverResponse, setServerResponse] = useState("");

  const {
    register,
    // watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate= useNavigate();
  const submitForm = (data) => {
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };

      // fetch('/auth/signup')

      fetch("/signup", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setServerResponse(data.message);
          // console.log(serverResponse)
          navigate('/login');
        }).catch = (err) => console.log(err);

      reset();
    } else {
      alert("Passwords don't match");
    }
  };

  // console.log(watch("username"));
  return (
    <div className="container">
      <div className="form">
        {show ? (
          <>
            <Alert
              variant="success"
              onClose={() => {
                setShow(false);
              }}
              dismissible
            >
              <p>{serverResponse}</p>
            </Alert>

            <h1>Sign Up Page</h1>
          </>
        ) : (
          <>
            <h1>Sign Up Page</h1>
          </>
        )}
        <form>
          <Form.Group>
            <Form.Label for htmlFor="signUsername">Username</Form.Label>
            <Form.Control
              type="text"
              name="signUsername"
              id="signUsername"
              placeholder="Username"
              {...register("username", { required: true, maxLength: 25 })}
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
            <br></br>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true, maxLength: 80 })}
            />
          </Form.Group>
          <br></br>
          {errors.email?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Username is required</small>
            </p>
          )}
          {errors.email?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Max characters should be 80</small>
            </p>
          )}
          {/* {errors.email?.type === "pattern" && (
            <p style={{ color: "red" }}>
              <small>
                Invalid email format <br /> (example: your_email@gmail.com)
              </small>
            </p>
          )} */}
          <Form.Group>
            <br></br>
            <Form.Label htmlFor="signPassword">Password</Form.Label>
            <Form.Control
              type="password"
              name="signPassword"
              id="signPassword"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br></br>
          {errors.password?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Password is required</small>
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p style={{ color: "red" }}>
              <small>Min characters should be 8</small>
            </p>
          )}

          <Form.Group>
            <br></br>
            <Form.Label htmlFor="signConfPass">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="signConfPass"
              id="signConfPass"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br></br>
          {errors.confirmPassword?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Confirm Password is required</small>
            </p>
          )}
          {errors.confirmPassword?.type === "minLength" && (
            <p style={{ color: "red" }}>
              <small>Min characters should be 8</small>
            </p>
          )}

          <Form.Group>
            <br></br>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              Signup
            </Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>
              Hai già un accout?
              <a href="/login">Login</a>
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
