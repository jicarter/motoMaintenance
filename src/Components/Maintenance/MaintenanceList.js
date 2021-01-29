import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "../Vehicle/VehicleProvider"

export const MaintenanceList = () => {
    const { vehicles, getVehicles } = useContext(VehicleContext)
    
    
    
    const history = useHistory()

    
    
    return (
        <div className="maintenance">
          <h2>Maintenance</h2>
		      <button onClick={() => {history.push("/maintenance/create")}}>
            Add New Maintenance
          </button>
          </div>
           
    )
}