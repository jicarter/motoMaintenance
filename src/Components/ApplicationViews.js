import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { VehicleList } from "./Vehicle/VehicleList";
import { VehicleProvider } from "./Vehicle/VehicleProvider";
import { VehicleForm } from "./Vehicle/VehicleForm";
import { VehicleDetail } from "./Vehicle/VehicleDetails";
import { MaintenanceProvider } from "./Maintenance/MaintenanceProvider";
import { MaintenanceList } from "./Maintenance/MaintenanceList";
import { MaintenanceForm } from "./Maintenance/MaintenanceForm";
import { ProfileProvider } from "./Profile/ProfileProvider";
import { ProfileCard } from './Profile/ProfilePage'
import { EditProfileForm } from "./Profile/EditProfile";

export const ApplicationViews = () => {
    return (
        <>
            
            <Route exact path="/">
                <Home />
            </Route>

            <VehicleProvider>
                <MaintenanceProvider>
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
                </MaintenanceProvider>
            </VehicleProvider>

            <MaintenanceProvider>
                <VehicleProvider>
                    <Route exact path="/maintenance">
                        <MaintenanceList />
                    </Route>
                    <Route path="/maintenance/create">
                        <MaintenanceForm />
                    </Route>
                    <Route path="/maintenance/edit/:maintenanceId(\d+)">
                        <MaintenanceForm />
                    </Route>
                    <Route exact path='/vehicles/detail/:(\d+)'>
                        <VehicleDetail />
                        <MaintenanceList />
                    </Route>
                </VehicleProvider>
            </MaintenanceProvider>

            <ProfileProvider>
                <Route exact path='/profile'>
                    <ProfileCard />
                </Route>
                <Route path='/profile/edit/:userId(\d+)'>
                    <EditProfileForm />
                </Route>
            </ProfileProvider>
            </>
    )
}    
                    