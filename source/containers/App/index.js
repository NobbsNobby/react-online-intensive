import React, { Component } from 'react';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/lisa.png';
import {myContext} from '../../components/HOC/withProfile';
import Profile from '../../components/Profile';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatusBar from '../../components/StatusBar';
import LoginForm from '../../components/LoginForm';


const options = {
    avatar,
    currentUserFirstName: 'Артем',
    currentUserLastName:  'Котов',
};

export default class App extends Component {
    render() {
        return (
            <myContext.Provider value = { options }>
                <StatusBar/>
                <Switch>
                    <Route
                        component = { Feed }
                        path = '/feed'
                    />
                    <Route
                        component = { Profile }
                        path = '/profile'
                    />
                    <Route
                        component = { LoginForm }
                        path = '/login'
                    />
                    <Redirect to = '/' />
                </Switch>
            </myContext.Provider>
        );
    }
}
