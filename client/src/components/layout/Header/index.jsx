import React from "react";
import { useContext, useState, useEffect } from "react";
import "./Header.css";
import Logo from "../../../assets/Logo.png";
import { FaAngleDown } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import PersistContext from "../../../context/PersistContext";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import BasicMenu from "../../menu/menu";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [userID, setUserID] = useState([]);
  useEffect(() => {
    if (user) {
      setUserID(user);
    }
  }, [user]);

  return (
    <header className="header-container">
      <div className="header-name-container">
        <img src={Logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">Request's Portal</h1>
      </div>
      <div className="header-account-container">
        <p className="header-account-id">{localStorage.getItem("Name")}</p>
        <i className="header-dropdown-wrapper"></i>
        {/* <BasicMenu /> */}
        <Box sx={{ "& button": { m: 2 } }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            {" "}
            Log out
          </Button>
        </Box>
      </div>
    </header>
  );
}

export default Header;
