import React from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"

const {vehicles} = useContext(VehicleContext)
export const MaintenanceCard = ({maintenance}) => (
    <section className='Maintenance'>
        <div className="vehicleName">
            {vehicle.year} {vehicle.make} {vehicle.model}
        </div>
        <div className="toComplete"> {maintenance.toComplete} </div>
        <div className="requiredItems"> {maintenance.requiredItems} </div>
    </section>
)
