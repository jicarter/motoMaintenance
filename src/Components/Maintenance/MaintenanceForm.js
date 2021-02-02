import React, { useContext, useEffect, useState } from "react";
import { VehicleContext } from '../Vehicle/VehicleProvider';
import { useHistory, useParams } from 'react-router-dom'
import { MaintenanceContext } from "./MaintenanceProvider";
import "./Maintenance.css"



export const MaintenanceForm = () => {
    const { vehicles, getVehicles } = useContext(VehicleContext)
    const { getMaintenance, addMaintenance, getMaintenanceById, updateMaintenance } = useContext(MaintenanceContext)
    const [isLoading, setIsLoading] = useState(true);
    const [maintenance, setMaintenance] = useState({});

    const history = useHistory();
    const {maintenanceId}  = useParams();
   
    useEffect(() => {
      getVehicles()
      .then(() => {
        if (maintenanceId){
          getMaintenanceById(maintenanceId)
          .then(maintenance => {
            setMaintenance(maintenance)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      
      })
    }, [])

    
    const handleControlledInputChange = (event) => {
    
      const newMainEvent = { ...maintenance }
      
     
      newMainEvent[event.target.id] = event.target.value
      
      setMaintenance(newMainEvent)
    }

    
    const handleClickSaveMaintenance = (event) => {
    {
      event.preventDefault()

      
      const user = localStorage.getItem("moto_user")
      
      if (maintenanceId) {
        updateMaintenance({
          id: maintenance.id,
          userId: user,
          vehicleId:maintenance.vehicleId,
          toComplete:maintenance.toComplete,
          requiredItems:maintenance.requiredItems,
          isComplete: false,
          timeStamp: Date.now()
        })
        .then(() => history.push('../'))
      } else if (maintenance.vehicleId === 0) {
          {
        window.alert("Please select a vehicle")}
      } else {
        setIsLoading(true)
        addMaintenance({
          userId: user,
          vehicleId: maintenance.vehicleId,
          toComplete: maintenance.toComplete,
          requiredItems: maintenance.requiredItems,
          isComplete: false,
          timeStamp: Date.now()
    
        })
        .then(() => history.push("./"))
      }
    }
  }

    return (
      <form className="MaintenanceForm">
          <h2 className="MaintenanceForm__title">Enter Maintenance Event</h2>
          <fieldset>
              <div className="form-group-vehicle">
                  <label htmlFor="vehicle">Assign to vehicle: </label>
                  <select  name="vehicleId" id="vehicleId" onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a vehicle</option>
                      {vehicles.map(v => (
                          <option key={v.id} value={v.id}>
                          {`${v.year} ${v.make} ${v.model}`} 
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
                  <label htmlFor="requiredItems">Required Items</label>
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