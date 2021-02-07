import React, { useState, useContext, useEffect } from "react";
import { NavBarContext } from "./NavBarProvider"
import { Link } from "react-router-dom";
import "./NavBar.css";
import "../auth/Login";
import { Logout } from "../auth/Logout";

export const NavBar = () => {
    const { getProfile } = useContext(NavBarContext)
    const [navBar, setNavBar] = useState({});

    useEffect(() => {
        getProfile()
        .then((response) => {
            setNavBar(response)
    
    
          })
        
        
        
    }, [])


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Profile">Profile</Link>
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
            <li className="navbar__item" id="partsLink">
            <div><a href={navBar.parts} target="_blank">Order Parts</a></div>
            </li>
            <li className="navbar__item">
            <div><a href="https://www.youtube.com/playlist?list=PLQNbY8vNfRmXMBsvYsmT9a9Xi3EQaT0S9" target="_blank">How-To</a></div>
            </li>
            <li className="navbar__item">
            <div><a href="https://www.manualslib.com/" target="_blank">Repair Manuals</a></div>
            </li>
            <li className="navbar__item">
                <button className="logOut" onClick={Logout()}>Logout</button>
            </li>
        </ul>
    )
}