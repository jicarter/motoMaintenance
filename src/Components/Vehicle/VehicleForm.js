import React, { useContext, useState, useEffect } from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"

import "./Vehicle.css"
import { useHistory, useParams} from 'react-router-dom';

export const VehicleForm = () => {
    const { addVehicle, updateVehicle, getVehicleById } = useContext(VehicleContext)
    const [vehicle, setVehicle] = useState({});
    
    const [isLoading, setIsLoading] = useState(true);
    const {vehicleId} = useParams()
  
      const history = useHistory();
  
      const handleControlledInputChange = (event) => {
        const newVehicle = { ...vehicle }


          newVehicle[event.target.id] = event.target.value

          setVehicle(newVehicle)
    }


  const handleSaveVehicle = () => {
    
      
        const make = vehicle.make
        const model = vehicle.model
        const year = vehicle.year
        const user = localStorage.getItem("moto_user")
      
        if (make === "" || model === "" || year === 0) {
        window.alert("Please enter a make, model and a year")
      } else {
         
        setIsLoading(true);
        if (vehicleId){
          updateVehicle({
            id: vehicle.id,
            userId: user,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            notes: vehicle.notes,
            timestamp: Date.now()
          })
          .then(() => history.push(`/vehicles/detail/${vehicle.id}`))
        } else {
          
          addVehicle({
            id:vehicle.id,
            userId: user,
            make: vehicle.make,
            model: vehicle.model, 
            year: vehicle.year,
            notes: vehicle.notes,
            timestamp: Date.now()
          })
          .then(() => history.push('./vehicles'))
        }
        
      }
    }
    useEffect(() => {
      
        if (vehicleId){
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
        <form className="vehicleForm">
            <h2 className="vehicleForm__title">Enter Your Info</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="make"> Make:</label>
                    <input type="text" id="make" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Make" value={vehicle.make}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="model"> Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Model" value={vehicle.model}/>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="year"> Year:</label>
                    <input type="text" id="year" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Year" value={vehicle.year}/>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="notes"> Notes:</label>
                    <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Notes" value={vehicle.notes}/>
                </div>
            </fieldset>
           
            <button className="btn btn-primary"
               disabled={isLoading}
              onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveVehicle()
          }}>
              Save Vehicle
            </button>
        </form>
      )
} 
