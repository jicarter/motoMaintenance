import React, { useContext, useEffect, useState } from "react"
import { VehicleContext } from "./VehicleProvider"
import "./Vehicle.css"
import { useParams, useHistory, Link } from "react-router-dom"
import { MaintenanceDetails } from "../Maintenance/MaintenanceDetails"


export const VehicleDetail = () => {
  const { getVehicleById, deleteVehicle } = useContext(VehicleContext)

  const [vehicle, setVehicle] = useState({})

  const { vehicleId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    deleteVehicle(vehicle.id)
      .then(() => {
        history.push("/vehicles")
      })
  }

  useEffect(() => {
    console.log("useEffect", vehicleId)
    getVehicleById(vehicleId)
      .then((response) => {
        setVehicle(response)


      })

  }, [])


  return (
    <section className="vehicle">
      <h3 className="vehicle__name">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
      <div className="vehicle__notes">{vehicle.notes}</div>
      <button className='edit__vehicle' onClick={() => {
        history.push(`/vehicles/edit/${vehicleId}`)
      }}>Edit Vehicle</button>

      <button className='deleteBtn' onClick={handleDelete}>DELETE Vehicle</button>
      <button className="mainItem"> <Link to={`../../Maintenance/create`}>Maintenance Event</Link></button>
      <div className="maintCards">
        {
          vehicle.maintenance?.map(m => {
            m.vehicle = vehicle
            console.log(vehicle)
            return <MaintenanceDetails key={m.id} maintenance={m} />
          })}
      </div>
    </section>

  )
}