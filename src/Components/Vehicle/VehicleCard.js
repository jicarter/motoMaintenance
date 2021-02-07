import React from "react"
import { Link } from "react-router-dom"


export const VehicleCard = ({vehicle}) => (
    <section className='vehicle'>
        
        <h3 className='vehicleName'>
            <Link to={`/vehicles/detail/${vehicle.id}`}>{ vehicle.year } { vehicle.make } { vehicle.model }</Link>
        </h3>
    </section>
)
       
