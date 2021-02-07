import React, { useState, createContext } from "react"


export const NavBarContext = createContext()

export const NavBarProvider = (props) => {
    const [navBar, setNavBar] = useState([])
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