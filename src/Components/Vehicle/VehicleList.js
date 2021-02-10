import React, { useState, useContext, useEffect } from "react"
import { VehicleContext } from "./VehicleProvider"
import { VehicleCard } from "./VehicleCard";
import { useHistory } from "react-router-dom"
import "./Vehicle.css"


//renders the list of all of the vehicles using the card component

export const VehicleList = () => {
  const { getVehicles, vehicles } = useContext(VehicleContext)
  const history = useHistory()


  useEffect(() => {
    getVehicles()


  }, [])

  return (
    <section className="vehicles">
      
      <section className='vehicle--title'>Vehicles</section>
      <button className="addBtn" onClick={() => { history.push("/vehicles/create") }}>
        Add Vehicle
          </button>
      <div className="vehicleContainer">
        {

          vehicles.map(vehicle => {
            return <VehicleCard key={vehicle.id} vehicle={vehicle} />
          })}
      </div>
    </section>

  )


}