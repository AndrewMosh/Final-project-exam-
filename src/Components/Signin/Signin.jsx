import React from "react";
import signin from "./signin.svg";
import { useState } from "react";
import "../Report/report.css";
import "./signin.css";
import axios from "axios";
import { Home } from "../Home/Home";

export const Signin = ({
  isAuth,
  setAuth,
  admin,
  setAdmin,
  data,
  setData,
  worker,
  setWorker,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/auth/sign_in",
        { email, password },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )

      .then((response) => {
        setData(response.data);
        console.log(response);
        if (response.data.data.user.email === "malinaenglishclub@gmail.com") {
          setAdmin(!admin);
        }
        setMessage("Вы вошли в свой аккаунт");
        setAuth(!isAuth);
        console.log(admin);
        localStorage.setItem("token", response.data.data.token);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Вы ввели неверный логин или пароль");
      });
  };

  return (
    <>
      {(!isAuth && (
        <div style={{ marginTop: "90px" }} className="report">
          <div className="signin">
            <img src={signin} alt="thief" />
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Авторизация</h2>
            <label>E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
            />
            <label>Пароль</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button style={{ margin: "30px 0 20px 0" }} className="register">
              Войти
            </button>
            <p>{message}</p>
          </form>
        </div>
      )) || <Home />}
    </>
  );
};
