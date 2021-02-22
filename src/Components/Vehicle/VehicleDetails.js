import React, { useContext, useEffect, useState } from "react"
import { VehicleContext } from "./VehicleProvider"
import "./Vehicle.css"
import { useParams, useHistory, Link } from "react-router-dom"
import { MaintenanceDetails } from "../Maintenance/MaintenanceDetails"
import { MaintenanceContext } from "../Maintenance/MaintenanceProvider"
import "../Maintenance/Maintenance.css"


//module displays vehicles by using the card component



export const VehicleDetail = () => {
  const { getVehicleById, deleteVehicle } = useContext(VehicleContext)
  const { maintenance, deleteMaintenance } = useContext(MaintenanceContext)
  const [vehicle, setVehicle] = useState({})
  const { vehicleId } = useParams();
  const history = useHistory();
  
  //handles the delete vehicle button using the delete vehicle fetch call
  const handleDelete = () => {
    deleteVehicle(vehicle.id)
      .then(() => {
        history.push("/vehicles")
      })
      window.alert("DELETED!")
  }

  //allows the page to re-render the page after changes are made by the user
  const refreshVehicle = () => {
    getVehicleById(vehicleId)
      .then((response) => {
        setVehicle(response)


      })

  }
  //handles the delete maintenance button by using the delete maintenance fetch call
  const maintenanceDelete = (maintenanceId) => {
    deleteMaintenance(maintenanceId)
      .then(() => {
        console.log("this worked")
        refreshVehicle()
      })
      window.alert("DELETED!")
  }

  //renders the page
  useEffect(() => {
    console.log("useEffect", vehicleId)
    refreshVehicle()

  }, [])

  //maps over the vehicles and injects each one into the HTML/JSX
  return (
    <section className="vehicle">
      
      <h3 className="vehicle__name">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
      <img className="image" src={vehicle.imageURL}/>
      <div className="vehicle__notes">{vehicle.notes}</div>
      <button className='edit__vehicle' onClick={() => {
        history.push(`/vehicles/edit/${vehicleId}`)
      }}>Edit Vehicle</button>

      <button className='deleteBtn' onClick={handleDelete}>DELETE Vehicle</button>
      <button className="mainItem"> <Link to={`../../Maintenance/create/${vehicle.id}`}>Add New Maintenance</Link></button>
      <section className="maintCards">
        {
          vehicle.maintenance?.map(m => {
            m.vehicle = vehicle
            console.log(vehicle)
            return <MaintenanceDetails key={m.id} maintenance={m} maintenanceDelete={maintenanceDelete} refreshVehicle={refreshVehicle} />
          })}
      </section>
      <section className='complete'>

      </section>
    </section>

  )
}