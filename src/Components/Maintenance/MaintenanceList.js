import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MaintenanceCard } from "./MaintenanceCard";
import { MaintenanceContext } from "./MaintenanceProvider";



//module renders the maintenance events





export const MaintenanceList = () => {

  const { maintenance, getMaintenance } = useContext(MaintenanceContext)


  useEffect(() => {
    getMaintenance()
  }, [])

  const history = useHistory()

// retrieves events from the DB and injects them into HTML using JSX

  return (
    <section className="maintenance">
      

      {console.log("MaintenanceList:Render", maintenance)}
      <h2>Maintenance</h2>
      <button className='addMtnBtn' onClick={() => { history.push("/maintenance/create") }}>
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