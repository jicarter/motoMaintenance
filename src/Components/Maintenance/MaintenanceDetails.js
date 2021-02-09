import { useContext } from "react";
import { Link } from "react-router-dom"
import { MaintenanceContext } from "./MaintenanceProvider";
import "./Maintenance.css"
import Modal from 'react-bootstrap/Modal'
import React from 'react'
//module is used to update maintenance by using maintenanceContext

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
       
      </Modal>
    );
  }
  

export const MaintenanceDetails = ({ maintenance, maintenanceDelete, refreshVehicle }) => {
    const { updateMaintenance } = useContext
        (MaintenanceContext)

    const dateCompleted = (new Date().toLocaleDateString())
    const user = localStorage.getItem("moto_user")
    const [modalShow, setModalShow] = React.useState(false);
    
    const handleClickComplete = (event) => {
        //controls the complete button to set isComplete to true and display differently

        event.preventDefault()
        if (maintenance.isComplete === false) {
            updateMaintenance({
                id: parseInt(maintenance.id),
                userId: parseInt(user),
                vehicleId: maintenance.vehicleId,
                toComplete: maintenance.toComplete,
                requiredItems: maintenance.requiredItems,
                isComplete: true,
                completed: dateCompleted,
                timeStamp: Date.now()
            })
                .then(() => refreshVehicle())
                
        }       //this allows the page to re-render the vehicle list to display the maintenance events as complete
    }

    if (maintenance.isComplete === true) {
        return (

            <section className='completedMaintenance'>
                <h3 className='name'>
                    Completed Maintenance
        </h3>
                <div className='dateCompleted'>Completed: {maintenance.completed}</div>
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
                <button className="complete" onClick={handleClickComplete} {...() => setModalShow(true)}> Complete </button>
                <button className="deleteBtn"
                    onClick={() => maintenanceDelete(maintenance.id)}>
                    Delete Maintenance Event
          </button>
          <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            </section>

        )
    }
}