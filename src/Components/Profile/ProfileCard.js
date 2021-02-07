import React from "react"
import { Link } from "react-router-dom"

export const ProfileCard = ({ user }) => {

    console.log(user)


    return (
        <section className='profile'>
            <div className='userName'>{user.name}</div>
            <div className='email'>{user.email}</div>
            <div className="parts">{user?.parts}</div>
            <button className='edit'> <Link to={`/profile/edit/${user.id}`}>Edit</Link></button>
        </section>

    )
}