import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import GodView from './GodView';
import StandupMeeting from '../connects/StandupMeeting';

const Index = () => (
    <div>
        <Header />
        <Switch>
            <Route path="/god-view" component={GodView} />
            <Route path="/standup-meeting/sprint/:sprintId">
                {({match: {params: {sprintId}}, location, history}) => (
                    <StandupMeeting sprintId={sprintId} />
                )}
            </Route>
            <Route component={GodView} />
        </Switch>
    </div>
);

export default Index;
