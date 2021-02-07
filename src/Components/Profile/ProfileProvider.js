import React, { useState, createContext } from "react"


export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState([])
    const user = localStorage.getItem("moto_user")

    const getProfile = () => {
        return fetch(`http://localhost:8088/users/${user}`)
        .then(res => res.json())
        
    }

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

    return (
        <ProfileContext.Provider value={{
            profile, getProfile, updateProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}