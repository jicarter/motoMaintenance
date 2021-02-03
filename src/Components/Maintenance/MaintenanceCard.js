import React, { useContext, useState } from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"
import { vehicleId } from "./MaintenanceForm"
import { useHistory, useParams } from "react-router-dom"
import { MaintenanceContext } from "./MaintenanceProvider" 
import { getVehicleById } from "../Vehicle/VehicleProvider"
import { Link } from "react-router-dom"




export const MaintenanceCard = ({maintenance}) =>  (
        
        <section className='maintenanceCard'>
        <h3 className='vehicle__name'>
                <Link to={`/vehicles/detail/${maintenance.vehicle.id}`}>{ maintenance.vehicle.year } { maintenance.vehicle.make } { maintenance.vehicle.model }</Link>
            </h3>
            <div className="toComplete"> {maintenance.toComplete} </div>
            <div className="requiredItems"> {maintenance.requiredItems} </div>
            <button className='edit'> <Link to={`/maintenance/edit/${maintenance.id}`}>Edit</Link> </button>
           
        </section>
    ) 




