import React, { useContext, useState, useEffect } from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"
import "./Vehicle.css"
import { useHistory, useParams, Link } from 'react-router-dom';

//renders the forms to add, edit vehicles


export const VehicleForm = () => {
  const { addVehicle, updateVehicle, getVehicleById } = useContext(VehicleContext)
  const [vehicle, setVehicle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { vehicleId } = useParams()
  const history = useHistory();

  //handles changes made to the dom by the user
  const handleControlledInputChange = (event) => {
    const newVehicle = { ...vehicle }
    //creates a copy of the object to be edited

    newVehicle[event.target.id] = event.target.value

    setVehicle(newVehicle)
  }


  //handles the save vehicle button using the update and add fetch call
  const handleSaveVehicle = () => {


    const make = vehicle.make
    const model = vehicle.model
    const year = vehicle.year
    const user = localStorage.getItem("moto_user")

    if (make === undefined || model === undefined || year === undefined) {
      window.alert("Please enter a make, model and a year")
    } else {

      setIsLoading(true);
      if (vehicleId) {
        updateVehicle({
          id: parseInt(vehicle.id),
          userId: parseInt(user),
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          notes: vehicle.notes,
          timestamp: Date.now()
        })
          .then(() => history.push(`/vehicles/detail/${vehicle.id}`))
          window.alert("SAVED!")
      } else {

        addVehicle({
          id: parseInt(vehicle.id),
          userId: parseInt(user),
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          notes: vehicle.notes,
          timestamp: Date.now()
        })
          .then(() => history.push('./'))
          window.alert("SAVED!")
      }

    }
  }

  //renders the form page
  useEffect(() => {

    if (vehicleId) {
      getVehicleById(vehicleId)
        .then(vehicle => {
          setVehicle(vehicle)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }

  }, [])

  return (
    <section className='mainVehicleForm'>
      <form className="vehicleForm">
        <h2 className="vehicleForm__title">{vehicleId ? <>Edit Vehicle</> : <>Add Vehicle</>}</h2>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="make"> Make:</label>
            <input type="text" id="make" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Make" value={vehicle.make} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="model"> Model:</label>
            <input type="text" id="model" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Model" value={vehicle.model} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="year"> Year:</label>
            <input type="text" id="year" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Year" value={vehicle.year} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="notes"> Notes:</label>
            <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Notes" value={vehicle.notes} />
          </div>
        </fieldset>

        <button className="saveBtn"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveVehicle()
            
          }}>
          Save Vehicle
            </button>
            <button className='cancel'> <Link to={`/vehicles`}>Cancel</Link></button>
      </form>
    </section>
  )
} 
