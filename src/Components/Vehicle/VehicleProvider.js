import React, { useState, createContext } from "react"


export const VehicleContext = createContext()

export const VehicleProvider = (props) => {
    const [vehicles, setVehicles] = useState([])

    
    const getVehicles = () => {
        return fetch("http://localhost:8088/vehicles?_expand=maintenance")
        .then(res => res.json())
        .then(setVehicles)
    }

    const addVehicle = vehicleObj => {
        return fetch("http://localhost:8088/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleObj)
        })
        .then(getVehicles)
    }
    const getVehicleById = (id) => {
        return fetch(`http://localhost:8088/vehicles/${id}?_embed=maintenance`)
            .then(res => res.json())
    }
    const deleteVehicle = vehicleId => {
        return fetch(`http://localhost:8088/vehicles/${vehicleId}`, {
            method: "DELETE"
        })
            .then(getVehicles)
    }
    const updateVehicle = vehicle => {
        return fetch(`http://localhost:8088/vehicles/${vehicle.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(vehicle)
        })
          .then(getVehicles)
      }

      
   
    return (
        <VehicleContext.Provider value={{
            vehicles, getVehicles, addVehicle, getVehicleById, updateVehicle, deleteVehicle, 
        }}>
            {props.children}
        </VehicleContext.Provider>
    )
}