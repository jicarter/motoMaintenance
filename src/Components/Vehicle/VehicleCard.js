import React from "react"
import { Link } from "react-router-dom"


export const VehicleCard = ({vehicle}) => (
    <section className='vehicle'>
        <img src={vehicle.image} alt="Image Not Available"></img>
        <h3 className='vehicle__name'>
            <Link to={`/vehicles/detail/${vehicle.id}`}>{ vehicle.year } { vehicle.make } { vehicle.model }</Link>
        </h3>
    </section>
)
       
