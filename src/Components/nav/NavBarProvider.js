import React, { useState, createContext } from "react"

//this allows the navBar to retrieve user info to render user settings
export const NavBarContext = createContext()

export const NavBarProvider = (props) => {
    const [navBar] = useState([])
    const user = localStorage.getItem("moto_user")

    const getProfile = () => {
        return fetch(`http://localhost:8088/users/${user}`)
            .then(res => res.json())

    }
    return (
        <NavBarContext.Provider value={{
            navBar, getProfile
        }}>
            {props.children}
        </NavBarContext.Provider>
    )
}