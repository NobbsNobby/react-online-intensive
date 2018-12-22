import React, { Component } from 'react';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/lisa.png';
import {myContext} from '../../components/HOC/withProfile';
import Profile from '../../components/Profile';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatusBar from '../../components/StatusBar';
import { PrivateRouter } from '../../components/HOC/PrivateRouter';
import LoginForm from '../../components/LoginForm';
import { aunthHelper } from '../../components/HOC/aunthHelper';

export default class App extends Component {
    constructor(props) {
        super(props);

        this._toggleLogin = () => {
            this.setState((state) => ({
                isAuthenticated: !state.isAuthenticated,
            }));
        };

        this.state = {
            avatar,
            currentUserFirstName: 'Артем',
            currentUserLastName:  'Котов',
            isAuthenticated:      aunthHelper('isAuthenticated'),
            toggleLogin:          this._toggleLogin,
        };
    }

    render() {
        return (
            <myContext.Provider value = { this.state }>
                <StatusBar/>
                <Switch>
                    <PrivateRouter
                        component = { Feed }
                        path = '/feed'
                        to = '/login'
                    />
                    <PrivateRouter
                        component = { Profile }
                        path = '/profile'
                        to = '/login'
                    />
                    <Route
                        component = { LoginForm }
                        path = '/login'
                    />
                    <Redirect to = '/login'/>
                </Switch>
            </myContext.Provider>
        );
    }
}
