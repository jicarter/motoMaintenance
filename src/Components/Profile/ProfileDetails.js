import React, { useState, useContext, useEffect } from "react"
import { ProfileContext } from "./ProfileProvider"
import { useHistory } from "react-router-dom"
import { ProfileCard } from "./ProfileCard"
import "./profile.css"

export const ProfileDetails = () => {
    const { getProfile} = useContext(ProfileContext)
    const [profile, setProfile] = useState({});
    const history = useHistory()

    useEffect(() => {
        getProfile()
        .then((response) => {
            setProfile(response)
    
    
          })
        
        
        
    }, [])

    return (
        <section className='profile'>
            <button className="backBtn" onClick={() => history.goBack()}>Back</button>
            <section className='profile--title'>User Profile</section>
            
            <div className="profileContainer">
                <ProfileCard key={profile.id} user={profile} />
            </div>




        </section>

    )

}