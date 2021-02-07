import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfileProvider";
import { useHistory} from 'react-router-dom'

export const EditProfileForm = () => {
    const { getProfile, updateProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({});
    const history = useHistory();

    const refreshProfile = () => {
        getProfile()
        
        .then(profile => {
            setProfile(profile)
        })
    }

    useEffect(() => {
       refreshProfile()
    }, [])    
    const handleControlledInputChange = (event) => {

        const newProfileEvent = { ...profile}


        newProfileEvent[event.target.id] = event.target.value

        setProfile(newProfileEvent)
    }

    const handleClickSaveProfile = (event) => {
        event.preventDefault()
        
        updateProfile({
            id: parseInt(profile.id),
            name: profile.name,
            email: profile.email,
            parts: profile.parts

        })
        .then(refreshProfile())
        .then(() => history.push('../'))
    }
    const handleClickSaveDefault = (event) => {
        event.preventDefault()
        
        updateProfile({
            id: parseInt(profile.id),
            name: profile.name,
            email: profile.email,
            parts:"https://www.rockymountainatvmc.com/"

        })
        .then(refreshProfile())
        .then(() => history.push('../'))
    }

    return (

        <form>
            <label form="parts">Add your own parts page</label>
            <input type="url" id="parts" name="parts" onChange={handleControlledInputChange} required autoFocus className="form-control"></input>
            <button className="btn btn-primary"
            onClick={handleClickSaveProfile}>
            Save Changes
          </button>
            <button className="btn btn-primary"
            onClick={handleClickSaveDefault}>
            Reset to Default
          </button>
        </form>
    )
}