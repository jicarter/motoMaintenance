import React from "react"
import { Link } from "react-router-dom"


//this renders the user profile information by injecting it into HTML via JSX



export const ProfileCard = ({ user }) => {

    console.log(user)


    return (
        <section className='profile'>
            <div className='userName'> User Name:</div>
            <div className='name'> {user.name}</div>
            <div className='emailTitle'>Email:</div>
            <div className='email'>{user.email}</div>
            <div className="partsTitle">Preferred Parts Site:</div>
            <div className="parts">{user?.parts}</div>
            <button className='edit'> <Link to={`/profile/edit/${user.id}`}>Edit</Link></button>
        </section>

    )
}