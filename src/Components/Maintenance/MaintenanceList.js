import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "../Vehicle/VehicleProvider"
import { MaintenanceCard } from "./MaintenanceCard";
import { MaintenanceContext } from "./MaintenanceProvider";









export const MaintenanceList = () => {
    
    const { maintenance, getMaintenance } = useContext(MaintenanceContext)
    
   
   
    useEffect(() => {
      getMaintenance()
    },[])
    
    const history = useHistory()

    
    
    return (
        <section className="maintenance">
             {console.log("MaintenanceList:Render", maintenance)}
          <h2>Maintenance</h2>
		      <button onClick={() => {history.push("/maintenance/create")}}>
            Add New Maintenance
          </button>
          <div className="cardContainer">
            { 
              maintenance.map(m => {
                return <MaintenanceCard key={m.id} maintenance={m} />
              })
             }
            
             </div>
          </section>
           
    )
    
}