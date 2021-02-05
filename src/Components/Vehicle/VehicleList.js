import React, { useState, useContext, useEffect } from "react"
import { VehicleContext } from "./VehicleProvider"
import { VehicleCard } from "./VehicleCard";
import { useHistory } from "react-router-dom"
import "./Vehicle.css"

const user = localStorage.getItem("moto_user")


export const VehicleList = () => {
  const { getVehicles, vehicles } = useContext(VehicleContext)
  const history = useHistory()


  useEffect(() => {
    getVehicles()


  }, [])

  return (
    <section className="vehicles">
      <button className="backBtn" onClick={() => history.goBack()}>Back</button>
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