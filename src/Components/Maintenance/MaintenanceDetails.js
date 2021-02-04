import { Link } from "react-router-dom"

export const MaintenanceDetails = ({maintenance}) =>  {
    
    const handleClick =() => {
        this.setState({ isComplete: true}) 
        }
    
    
    
    
    
    return (
        
    <section className='maintenanceCard'>
    <h3 className='name'>
           Maintenance
        </h3>
        <div className="toComplete"> {maintenance.toComplete} </div>
        <div className="requiredItems"> {maintenance.requiredItems} </div>
        <button className='edit'> <Link to={`/maintenance/edit/${maintenance.id}`}>Edit</Link> </button>
       <button className="complete" onClick={handleClick}> Complete </button>
    </section>
) 
}