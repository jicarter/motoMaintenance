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
    const getMaintenanceById = (id) => {
        return fetch(`http://localhost:8088/maintenance/${id}`)
            .then(res => res.json())
    }
    const updateMaintenance = maintenance => {
        return fetch(`http://localhost:8088/vehicles/${maintenance.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(maintenance)
        })
          .then(getMaintenance)
      }
      const deleteMaintenance = maintenanceId => {
        return fetch(`http://localhost:8088/vehicles/${maintenanceId}`, {
            method: "DELETE"
        })
            .then(getMaintenance)
    }


   
    return (
        <MaintenanceContext.Provider value={{
            maintenance, getMaintenance, addMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance
        }}>
            {props.children}
        </MaintenanceContext.Provider>
    )
}