import React from "react";
import "../index.js"
import "./Home.css"

//provides the HTML for the landing page after log in


export const Home = () => (
    <section className="home">
        <section className="container">
            <div className='title'>Moto-Maintenance</div>
            <div className='slogan'>For all of your Maintenance Needs!</div>
            <div className='intro'>Start by adding a vehicle under the vehicle tab. </div>
            <div className="intro2">Head over to maintenance to add a new event!</div>
            <div className="intro3">Be sure to check out the other links at the top if you need some assitance. </div>
        </section>
    </section>

)

