import React, { useContext, useEffect, useState } from "react";
import { VehicleContext } from '../Vehicle/VehicleProvider';
import { useHistory, useParams } from 'react-router-dom'
import { MaintenanceContext } from "./MaintenanceProvider";
import "./Maintenance.css"



export const MaintenanceForm = () => {
    const { vehicles, getVehicles } = useContext(VehicleContext)
    const { getMaintenance, addMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance } = useContext(MaintenanceContext)
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
          id: parseInt(maintenance.id),
          userId: parseInt(user),
          vehicleId:maintenance.vehicleId,
          toComplete:maintenance.toComplete,
          requiredItems:maintenance.requiredItems,
          isComplete: false,
          timeStamp: Date.now()
        })
        .then(() => history.push('../'))
      }  else {
        setIsLoading(true)
        addMaintenance({
          userId: parseInt(user),
          vehicleId:parseInt(maintenance.vehicleId),
          toComplete: maintenance.toComplete,
          requiredItems: maintenance.requiredItems,
          isComplete: false,
          timeStamp: Date.now()
    
        })
        .then(() => history.push(`/vehicles/detail/${maintenance.vehicleId}`))
      }
    }
  }

    return (
      <form className="MaintenanceForm">
       <button className="backBtn" onClick={() => history.goBack()}>Back</button>
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