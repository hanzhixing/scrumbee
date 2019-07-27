import {hot} from 'react-hot-loader/root';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import loadable from '@loadable/component';
import Header from './Header';
import Menu from './Menu';
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
        </Switch>
    </div>
);

export default hot(Index);
