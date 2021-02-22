import React, { useContext, useState, useEffect } from "react"
import { VehicleContext } from "../Vehicle/VehicleProvider"
import "./Vehicle.css"
import { useHistory, useParams, Link } from 'react-router-dom';

//renders the forms to add, edit vehicles
const user = localStorage.getItem("moto_user")

export const VehicleForm = () => {
  const { addVehicle, updateVehicle, getVehicleById } = useContext(VehicleContext)
  const [isLoading, setIsLoading] = useState(true);
  const { vehicleId } = useParams()
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState("")
  const [vehicle, setVehicle] = useState({
    id: "",
    userId: parseInt(user),
    make: "",
    model: "",
    year: "",
    notes:"",
    imageURL: ""
  });



  //handles changes made to the dom by the user
  const handleControlledInputChange = (event) => {
    const newVehicle = { ...vehicle }
    //creates a copy of the object to be edited

    newVehicle[event.target.id] = event.target.value

    setVehicle(newVehicle)
  }

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "moto-maintenance")
    setLoading(true)
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/moto-maintenance/image/upload",
      {
        method: "POST",
        body: data
      }
    )
    const file = await response.json()
    setImageURL(file.secure_url)
    setLoading(false)
  }
  //handles the save vehicle button using the update and add fetch call
  const handleSaveVehicle = () => {

    
    const make = vehicle.make
    const model = vehicle.model
    const year = vehicle.year
   

    if (make === undefined || model === undefined || year === undefined) {
      window.alert("Please enter a make, model and a year")
    } else {

      setIsLoading(true);
      if (vehicleId) {
        updateVehicle({
          id: parseInt(vehicle.id),
          userId: parseInt(user),
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          notes: vehicle.notes,
          imageURL: vehicle.imageURL,
          timestamp: Date.now()
        })
          .then(() => history.push(`/vehicles/detail/${vehicle.id}`))
        window.alert("SAVED!")
      } else {

        addVehicle({
          id: parseInt(vehicle.id),
          userId: parseInt(user),
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          notes: vehicle.notes,
          imageURL: imageURL,
          timestamp: Date.now()
        })
          .then(() => history.push('./'))
        window.alert("SAVED!")
      }

    }
  }

  //renders the form page
  useEffect(() => {

    if (vehicleId) {
      getVehicleById(vehicleId)
        .then(vehicle => {
          setVehicle(vehicle)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }

  }, [])

  return (
    <section className='mainVehicleForm'>
      <form className="vehicleForm">
        <h2 className="vehicleForm__title">{vehicleId ? <>Edit Vehicle</> : <>Add Vehicle</>}</h2>
        <div className="form-group">
          <div>Upload Image</div>
          <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
          {loading ? (
            <h3>Loading...</h3>
          ) : (
              <img src={imageURL} style={{ width: "200px" }} />
            )}
        </div>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="make"> Make:</label>
            <input type="text" id="make" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Make" value={vehicle.make} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="model"> Model:</label>
            <input type="text" id="model" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Model" value={vehicle.model} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="year"> Year:</label>
            <input type="text" id="year" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Year" value={vehicle.year} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label className='vehicleLabel' htmlFor="notes"> Notes:</label>
            <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Vehicle Notes" value={vehicle.notes} />
          </div>
        </fieldset>

        <button className="saveBtn"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveVehicle()

          }}>
          Save Vehicle
            </button>
        <button className='cancel'> <Link to={`/vehicles`}>Cancel</Link></button>
      </form>
    </section>
  )
} 
