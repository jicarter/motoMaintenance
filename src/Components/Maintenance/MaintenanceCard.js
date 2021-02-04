import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"




export const MaintenanceCard = ({maintenance}) =>  {
        

    if (maintenance.isComplete === true) {
        return (
    
          <section hidden>
            <h3 className='name'>
              Completed Maintenance
          </h3>
            <div className="toComplete"> {maintenance.toComplete} </div>
            <div className="requiredItems"> {maintenance.requiredItems} </div>
          </section>
        )
      } else {
          return (
        <section className='maintenanceCard'>
        <h3 className='vehicleName'>
                <Link to={`/vehicles/detail/${maintenance.vehicle.id}`}>{ maintenance.vehicle.year } { maintenance.vehicle.make } { maintenance.vehicle.model }</Link>
            </h3>
            <div className="toComplete"> {maintenance.toComplete} </div>
            <div className="requiredItems"> {maintenance.requiredItems} </div>
            <button className='edit'> <Link to={`/maintenance/edit/${maintenance.id}`}>Edit</Link> </button>
        </section>
          )
      }
    
}



