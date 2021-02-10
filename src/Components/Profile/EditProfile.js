import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfileProvider";
import { useHistory } from 'react-router-dom'


//module allows the user to update a URL setting to their preferred URL



export const EditProfileForm = () => {
    const { getProfile, updateProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({});
    const history = useHistory();

    //this allows the page to re-render to update the changes made
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

        const newProfileEvent = { ...profile }


        newProfileEvent[event.target.id] = event.target.value

        setProfile(newProfileEvent)
    }

    const handleClickSaveProfile = (event) => {
        event.preventDefault()
        //handles the save button of the edit profile form
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
        //this renders a button to reset the changes to default
        updateProfile({
            id: parseInt(profile.id),
            name: profile.name,
            email: profile.email,
            parts: "https://www.rockymountainatvmc.com/"

        })
            .then(refreshProfile())
            .then(() => history.push('../'))
    }

    return (

        <form>
            <label form="parts">Add your own parts page</label>
            <input type="url" id="parts" name="parts" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={profile.parts}></input>
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