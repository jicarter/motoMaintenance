import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfileProvider";
import { useHistory} from 'react-router-dom'

export const EditProfileForm = () => {
    const { profile, getProfile, updateProfile } = useContext(ProfileContext)
    const [setProfile] = useState({});
    const history = useHistory();

    useEffect(() => {
        getProfile()
        .then(console.log(profile))
    })

    const handleControlledInputChange = (event) => {

        const newProfileEvent = { ...users }


        newProfileEvent[event.target.id] = event.target.value

        setProfile(newProfileEvent)
    }

    const handleClickSaveProfile = (event) => {
        event.preventDefault()

        updateProfile({
            id: parseInt(user.id),
            email: user.email,
            parts: ""

        })
        .then(() => history.push('./'))
    }

    return (

        <form>
            <label for="parts">Add your own parts page</label>
            <input type="url" id="parts" name="parts" onChange={handleControlledInputChange} required autoFocus className="form-control"></input>
            <button className="btn btn-primary"
            onClick={handleClickSaveProfile}>
            Save Changes
          </button>
        </form>
    )
}