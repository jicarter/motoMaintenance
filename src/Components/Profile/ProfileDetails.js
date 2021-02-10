import React, { useState, useContext, useEffect } from "react"
import { ProfileContext } from "./ProfileProvider"
import { useHistory } from "react-router-dom"
import { ProfileCard } from "./ProfileCard"
import "./profile.css"



//this is the overall render of the profile page which holds the card component



export const ProfileDetails = () => {
    const { getProfile} = useContext(ProfileContext)
    const [profile, setProfile] = useState({});
    const history = useHistory()

    //this retrieves the current user information and renders it
    useEffect(() => {
        getProfile()
        .then((response) => {
            setProfile(response)
    
    
          })
        
        
        
    }, [])

    return (
        <section className='profile'>
            
            <section className='profile--title'>User Profile</section>
            
            <div className="profileContainer">
                <ProfileCard key={profile.id} user={profile} />
            </div>




        </section>

    )

}