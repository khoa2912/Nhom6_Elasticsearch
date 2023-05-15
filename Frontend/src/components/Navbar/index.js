import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CDBNavbar, CDBInput } from "cdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { signout } from "../../action/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(signout());
  };

  return (
    <div
      style={{
        background: "#FFF",
        color: "#fff",
      }}
      className="header"
    >
      <CDBNavbar
        right
        dark
        expand="md"
        scrolling
        className="justify-content-center"
      >
        <CDBInput
          type="search"
          size="md"
          hint="Search"
          className="mb-n4 mt-n3 input-nav"
        />
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ backgroundColor: "#4897CF", color: "#fff" }}
          >
            {auth.user.fullName || "User"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {token ? (
              <li>
                <Link className="dropdown-item" to="/" onClick={handleLogout}>
                  Đăng xuất
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link className="dropdown-item" to="/sign-in">
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sign-up">
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </CDBNavbar>
    </div>
  );
};

export default Navbar;
