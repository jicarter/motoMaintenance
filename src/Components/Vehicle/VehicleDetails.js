import React, { useContext, useEffect, useState } from "react"
import { VehicleContext } from "./VehicleProvider"
import "./Vehicle.css"
import { useParams, useHistory } from "react-router-dom"
import { MaintenanceContext } from "../Maintenance/MaintenanceProvider";


export const VehicleDetail = () => {
  const { getVehicleById, deleteVehicle } = useContext(VehicleContext)
  const { setMaintenance, getMaintenance } = useContext(MaintenanceContext)
	const [vehicle, setVehicle] = useState({})

	const {vehicleId} = useParams();
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
            history.push(`/vehicles/edit/${vehicleId}`)}}>Edit Vehicle</button>
       <button onClick={ handleDelete }>DELETE Vehicle</button>  
    </section>
  )
}