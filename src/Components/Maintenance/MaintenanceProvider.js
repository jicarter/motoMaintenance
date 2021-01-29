import React, { useState, createContext } from "react"


export const MaintenanceContext = createContext()


export const MaintenanceProvider = (props) => {
    const [maintenance, setMaintenance] = useState([])

    const getMaintenance = () => {
        return fetch("http://localhost:8088/maintenance")
        .then(res => res.json())
        .then(setMaintenance)
    }

    const addMaintenance = maintenanceObj => {
        return fetch("http://localhost:8088/maintenance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(maintenanceObj)
        })
        .then(getMaintenance)
    }

   
    return (
        <MaintenanceContext.Provider value={{
            maintenance, getMaintenance, addMaintenance
        }}>
            {props.children}
        </MaintenanceContext.Provider>
    )
}