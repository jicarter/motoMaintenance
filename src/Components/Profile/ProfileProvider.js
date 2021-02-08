import React, { useState, createContext } from "react"


//module retrieves user information from the DB


export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [profile] = useState([])
    const user = localStorage.getItem("moto_user")

    //retrieves the current user by using info from local storage of who is currently signed in
    const getProfile = () => {
        return fetch(`http://localhost:8088/users/${user}`)
            .then(res => res.json())

    }
    //this uses the update form to make changes to DB
    const updateProfile = profile => {
        return fetch(`http://localhost:8088/users/${user}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(getProfile)
    }
    //exports fetch functions to be used throughout the modules
    return (
        <ProfileContext.Provider value={{
            profile, getProfile, updateProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}