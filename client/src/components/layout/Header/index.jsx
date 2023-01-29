import React from "react";
import "./Header.css";
import Logo from "../../../assets/Logo.png";
import {FaAngleDown} from 'react-icons/fa';
function Header() {
    return (
        <header className="header-container">
            <div className="header-name-container">
                <img src={Logo} alt="Logo" className="header-logo" />
                <h1 className="header-title">Request's Portal</h1>
            </div>
            <div className="header-account-container">
                <p className="header-account-id">ITITIU19040</p>
                <i className="header-dropdown-wrapper">
                    <FaAngleDown className="header-dropdown-btn"/>
                </i>
            </div>
        </header>
    );
}

export default Header;
