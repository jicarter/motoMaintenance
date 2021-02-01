import React, { useContext, useState } from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"
import { VehicleId } from "./MaintenanceForm"
import { useHistory } from "react-router-dom"
import { MaintenanceContext } from "./MaintenanceProvider" 


export const MaintenanceCard = ({maintenance}) => {
    const history = useHistory();
   
    
    

    return (
    <section className='maintenanceCard'>
        <div className="vehicleName">
          
        </div>
        <div className="toComplete"> {maintenance.toComplete} </div>
        <div className="requiredItems"> {maintenance.requiredItems} </div>
        <button className='edit__maintenance' onClick={() => {
                history.push(`/maintenance/edit/${maintenance.id}`)
            }}>Edit Maintenance</button>
    </section>
    )
}



