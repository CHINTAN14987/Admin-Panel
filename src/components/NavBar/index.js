import { Button, Switch } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backGround } from "../../redux/reducer";
import "./NavBar.css";
import { darkBG, lightBG } from "../../util/config";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const toggle = useSelector((state) => state.app.bgColor);
  const dispatch = useDispatch();
  const onChange = (checked) => {
    dispatch(backGround(checked));
  };
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="navbar-wrapper" style={toggle ? darkBG : lightBG}>
      <span
        style={
          toggle
            ? { color: "#D3D3D3", fontWeight: 900, fontSize: "30px" }
            : { color: "#ff4d4f", fontWeight: 900, fontSize: "30px" }
        }
      >
        User DashBoard
      </span>

      <div className={`switch-wrapper ${toggle ? "darkBg" : "lightBg"}`}>
        <span
          style={
            toggle
              ? { color: "#D3D3D3", fontWeight: 600, fontSize: "20px" }
              : { color: "#ff4d4f", fontWeight: 600, fontSize: "20px" }
          }
        >
          Toggle Background
        </span>
        <Switch onChange={onChange} />
      </div>
      {location.pathname === "/dashboard" &&
        <Button
        style={
          toggle
            ? { background: "#D3D3D3", color: "#333", borderRadius: "none",fontWeight:900 }
            : { background: "#ff4d4f", color: "#fff", borderRadius: "none", fontWeight:900 }
        }
        onClick={() => {
          navigate("/");
        }}
      >
        Logout
      </Button>}
    </div>
  );
};

export default Index;
