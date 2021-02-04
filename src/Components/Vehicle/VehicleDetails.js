import React, { useContext, useEffect, useState } from "react"
import { VehicleContext } from "./VehicleProvider"
import "./Vehicle.css"
import { useParams, useHistory, Link } from "react-router-dom"
import { MaintenanceDetails } from "../Maintenance/MaintenanceDetails"
import { MaintenanceContext } from "../Maintenance/MaintenanceProvider"

export const VehicleDetail = () => {
  const { getVehicleById, deleteVehicle } = useContext(VehicleContext)
  const { deleteMaintenance } = useContext(MaintenanceContext)
  const [vehicle, setVehicle] = useState({})

  const { vehicleId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    deleteVehicle(vehicle.id)
      .then(() => {
        history.push("/vehicles")
      })
  }

  const refreshVehicle = () => {
    getVehicleById(vehicleId)
      .then((response) => {
        setVehicle(response)


      })

  }
  const maintenanceDelete = (maintenanceId) => {
    deleteMaintenance(maintenanceId)
      .then(() => {
        console.log("this worked")
        refreshVehicle()
      })
  }
  useEffect(() => {
    console.log("useEffect", vehicleId)
    refreshVehicle()

  }, [])


  return (
    <section className="vehicle">
       <button className="backBtn" onClick={() => history.goBack()}>Back</button>
      <h3 className="vehicle__name">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
      <div className="vehicle__notes">{vehicle.notes}</div>
      <button className='edit__vehicle' onClick={() => {
        history.push(`/vehicles/edit/${vehicleId}`)
      }}>Edit Vehicle</button>

      <button className='deleteBtn' onClick={handleDelete}>DELETE Vehicle</button>
      <button className="mainItem"> <Link to={`../../Maintenance/create`}>Add New Maintenance</Link></button>
      <div className="maintCards">
        {
          vehicle.maintenance?.map(m => {
            m.vehicle = vehicle
            console.log(vehicle)
            return <MaintenanceDetails key={m.id} maintenance={m} maintenanceDelete={maintenanceDelete} refreshVehicle={refreshVehicle} />
          })}
      </div>
    </section>

  )
}