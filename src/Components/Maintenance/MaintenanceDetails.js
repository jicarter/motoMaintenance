import { useContext } from "react";
import { Link } from "react-router-dom"
import { MaintenanceContext } from "./MaintenanceProvider";
import "./Maintenance.css"

export const MaintenanceDetails = ({ maintenance, maintenanceDelete, refreshVehicle }) => {
    const { updateMaintenance } = useContext
        (MaintenanceContext)


    const user = localStorage.getItem("moto_user")


    const handleClickComplete = (event) => {


        event.preventDefault()
        if (maintenance.isComplete === false) {
            updateMaintenance({
                id: parseInt(maintenance.id),
                userId: parseInt(user),
                vehicleId: maintenance.vehicleId,
                toComplete: maintenance.toComplete,
                requiredItems: maintenance.requiredItems,
                isComplete: true,
                timeStamp: Date.now()
            })
                .then(() => refreshVehicle())
        }
    }

    if (maintenance.isComplete === true) {
        return (

            <section className='completedMaintenance'>
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
                <h3 className='name'>
                    Maintenance
        </h3>
                <div className="toComplete"> {maintenance.toComplete} </div>
                <div className="requiredItems"> {maintenance.requiredItems} </div>
                <button className='edit'> <Link to={`/maintenance/edit/${maintenance.id}`}>Edit</Link> </button>
                <button className="complete" onClick={handleClickComplete}> Complete </button>
                <button className="deleteBtn"
                    onClick={() => maintenanceDelete(maintenance.id)}>
                    Delete Maintenance Event
          </button>
            </section>

        )
    }
}