import React from "react"
import { Link } from "react-router-dom"


//module uses retrieved DB info to render vehicles by injecting it into HTML/JSX


export const VehicleCard = ({ vehicle }) => (
    <section className='vehicle'>
     <img className="image" src={vehicle.imageURL}/>
        <h3 className='vehicle-Name'>
            <Link to={`/vehicles/detail/${vehicle.id}`}>{vehicle.year} {vehicle.make} {vehicle.model}</Link>
        </h3>
    </section>
)

