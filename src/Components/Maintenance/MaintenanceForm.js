import React, { useContext, useEffect, useState } from "react";
import { VehicleContext } from '../Vehicle/VehicleProvider';
import { useHistory, useParams } from 'react-router-dom'

export const MaintenanceForm = () => {
    const { vehicles, getVehicles } = useContext(VehicleContext)
    

    const [mainEvent, setMainEvent] = useState({
      vehicleId: 0,
      toComplete: "",
      requiredItems:""


    });

    const history = useHistory();
    const {maintenanceId} = useParams();
   
    useEffect(() => {
      getVehicles()
    }, [])

   
    const handleControlledInputChange = (event) => {
    
      const newMainEvent = { ...maintenance }
      
     
      newMainEvent[event.target.id] = event.target.value
      
      setMainEvent(newMainEvent)
    }

    const handleClickSaveMaintenance = (event) => {
      event.preventDefault()

      const vehicleId = vehicle.id
      

      if (vehicleId === 0) {
        window.alert("Please select a vehicle")
      } else {
        
        addMainEvent(mainEvent)
        .then(() => history.push("/maintenance"))
      }
    }

    return (
      <form className="MaintenanceForm">
          <h2 className="MaintenanceForm__title">New Maintenance Event</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to vehicle: </label>
                  <select defaultValue={vehicle.id} name="vehicleId" id="vehicleId" onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a vehicle</option>
                      {vehicles.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="toComplete">Maintenance Needed:</label>
                  <input type="text" id="toComplete" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Maintenance Needed" value={maintenance.toComplete}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="requiredItems">Required requiredItems</label>
                  <input type="text" id="requiredItems" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Required Items" value={maintenance.requiredItems}/>
              </div>
          </fieldset>
        
          
          <button className="btn btn-primary"
            onClick={handleClickSaveMaintenance}>
            Save Maintenance Event
          </button>
      </form>
    )
}