import React, { useState, useContext, useEffect } from "react"
import { VehicleContext } from "./VehicleProvider"
import { VehicleCard } from "./VehicleCard";
import { useHistory } from "react-router-dom"
import "./Vehicle.css"



export const VehicleList = () => {
    const { getVehicles, vehicles } = useContext(VehicleContext)
    const { vehicle, setVehicle } =useState({})
    const vehicleId = vehicles.id
    const history = useHistory()
    useEffect(()=>{
        getVehicles()
    }, [])

    return (
        <div className="vehicles">
          <section className='vehicle--title'>Vehicles</section>
		      <button className="addBtn"onClick={() => {history.push("/vehicles/create")}}>
            Add Vehicle
          </button>
          {
            vehicles.map(vehicle => {
          return <VehicleCard key={vehicle.id} vehicle={vehicle} />
          })}
          </div>

    )
          
          
}