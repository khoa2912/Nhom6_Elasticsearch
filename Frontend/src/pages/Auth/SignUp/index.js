import React from "react";
import PropTypes from "prop-types";

import "../SignIn/style.css";
import { signup } from "../../../action/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertCT from "../../../components/AlertCT";
// import { AuthContext } from "../../contexts/AuthContext";
// import AlertMessage from "../layout/AlertMessage";

SignUp.propTypes = {};

function SignUp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const onChangeLoginForm = () => {};
  const auth = useSelector((state) => state.auth);
  const handleSignUp = async (e) => {
    if (email === "" || password === "" || fullName === "") {
      e.preventDefault();
    } else {
      e.preventDefault();
      dispatch(signup(email, password, fullName));
    }
  };
  if (auth.authenticate) {
    <AlertCT variant='success' titleAlert="Đăng ký thành công" contentAlert="Bạn đã đăng ký thành công. Vui lòng chờ trong giây lát." />
    navigate("/");
  }

  return (
    <>
      <div className="form-auth">
        <h1 className="form-title">Đăng ký</h1>

        <Form className="my-4">
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Tên đầy đủ"
              name="fullname"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Địa chỉ Email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              className="text-input"
              placeholder="Mật khẩu"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="btsubmit "
            variant="info"
            type="submit"
            onClick={handleSignUp}
          >
            Đăng ký
          </Button>
        </Form>
        <p className="p-signup">
          Bạn đã có tài khoản?
          <Link to="/sign-in">
            <Button variant="success" size="sm" className="ml-2">
              Đăng nhập
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
