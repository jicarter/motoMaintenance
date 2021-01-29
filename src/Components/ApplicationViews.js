import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { VehicleList } from "./Vehicle/VehicleList"
import { VehicleProvider } from "./Vehicle/VehicleProvider"
import { VehicleForm } from "./Vehicle/VehicleForm"
import { VehicleDetail } from "./Vehicle/VehicleDetails"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            <VehicleProvider>
               <Route exact path="/vehicles">
                    <VehicleList />
                </Route>
                <Route path="/vehicles/create">
                    <VehicleForm />
                </Route>  
                <Route path="/vehicles/edit/:vehicleId(\d+)">
                    <VehicleForm />
                </Route>
                <Route path="/vehicles/detail/:vehicleId(\d+)">
                    <VehicleDetail />
                </Route>  
            </VehicleProvider>
            </>
    )
}    
                    