import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import "../auth/Login";
import { Logout } from "../auth/Logout";

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/vehicles">Vehicles</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Maintenance">Maintenance</Link>
            </li>
            <li className="navbar__item">
            <div><a href="https://bikez.com/main/index.php" target="_blank">BikeZ Database</a></div>
            </li>
            <li className="navbar__item">
            <div><a href="https://www.rockymountainatvmc.com/" target="_blank">Order Parts</a></div>
            </li>
            <li className="navbar__item">
            <div><a href="https://www.youtube.com/playlist?list=PLQNbY8vNfRmXMBsvYsmT9a9Xi3EQaT0S9" target="_blank">How-To</a></div>
            </li>
            <li className="navbar__item">
            <div><a href="https://www.manualslib.com/" target="_blank">Repair Manuals</a></div>
            </li>
            <li className="navbar__item">
                <button onClick={Logout()}>Logout</button>
            </li>
        </ul>
    )
}