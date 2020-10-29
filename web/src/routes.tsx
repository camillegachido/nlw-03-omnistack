import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/landing'
import OrphanageMap from './pages/orphanageMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import CompleteOrphanage from './pages/CompleteOrphanage'

import Dashboard from './pages/Dashboard'
import RegisteredOrphanage from './pages/RegisteredOrphanage'
import DeleteOrphanage from './pages/DeleteOrphanage'
import AuthorizeOrphanage from './pages/AuthorizeOrphanage'
import PendentOrphanage from './pages/PendentOrphanage'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanageMap}/>
                <Route path="/create-orphanage/:id?" component={CreateOrphanage}/>
                <Route path="/complete-orphanage" component={CompleteOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage}/>

                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/registered-orphanages" component={RegisteredOrphanage} />
                <Route path="/delete-orphanage/:id/:name" component={DeleteOrphanage} />
                <Route path="/pendent-orphanage" component={PendentOrphanage} />
                <Route path="/authorizate-orphanage/:id" component={AuthorizeOrphanage} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Routes