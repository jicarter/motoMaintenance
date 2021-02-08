import React, { useState, createContext } from "react"


//defines functions necessary to retrieve, add, and edit the DB

export const VehicleContext = createContext()

export const VehicleProvider = (props) => {
    const [vehicles, setVehicles] = useState([])
    const user = localStorage.getItem("moto_user")


    //retrieves vehicles from the DB by using the current user ID and expanded to corresponding maintenance items
    const getVehicles = () => {
        return fetch(`http://localhost:8088/vehicles/?userId=${user}&_expand=maintenance`)
            .then(res => res.json())
            .then(setVehicles)
    }

    //allows the user to add vehicles to the DB by posting changes to the DB
    const addVehicle = vehicleObj => {
        return fetch(`http://localhost:8088/vehicles/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleObj)
        })
            .then(getVehicles)
    }

    //retrieves vehicles from the DB via ID and embedding all coresponding maintenance
    const getVehicleById = (id) => {
        return fetch(`http://localhost:8088/vehicles/${id}?_embed=maintenance`)
            .then(res => res.json())
    }

    //allows the user to delete a vehicle by using vehicle ID and delete method from the DB
    const deleteVehicle = vehicleId => {
        return fetch(`http://localhost:8088/vehicles/${vehicleId}`, {
            method: "DELETE"
        })
            .then(getVehicles)
    }

    //allows the user to edit vehicles using the form component, vehicle ID, and the PUT method to the DB
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


    //exports the functions via VehicleContext to be used throughout the modules
    return (
        <VehicleContext.Provider value={{
            vehicles, getVehicles, addVehicle, getVehicleById, updateVehicle, deleteVehicle,
        }}>
            {props.children}
        </VehicleContext.Provider>
    )
}