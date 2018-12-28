import React, { Component } from 'react';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/lisa.png';
import {myContext} from '../../components/HOC/withProfile';
import Profile from '../../components/Profile';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatusBar from '../../components/StatusBar';
import LoginForm from '../../components/LoginForm';


export default class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Артем',
        currentUserLastName:  'Котов',
        isAuthenticated:      false,
    };

    componentDidMount() {
        this._getInitialAuthState();
    }

    _getInitialAuthState = () => {
        const key = 'isAuthenticated';
        const localKey = localStorage.getItem(key);
        if (localKey === null) {
            localStorage.setItem(key, 'false');
        }
        if (localKey === 'false') {
            this.setState({isAuthenticated: false});
        }
        if (localKey === 'true') {
            this.setState({isAuthenticated: true});
        }
    };

    _login = () => {
        this.setState({
            isAuthenticated: true,
        }, () => {
            localStorage.setItem('isAuthenticated', 'true');
        });
    };

    _logout = () => {
        this.setState({
            isAuthenticated: false,
        }, () => {
            localStorage.setItem('isAuthenticated', 'false');
        });
    };

    render() {
        const {isAuthenticated} = this.state;

        return (
            <myContext.Provider value = { this.state }>
                <StatusBar _logout = { this._logout }/>
                <Switch>
                    <Route
                        path = '/login'
                        render = { (props) => (
                            <LoginForm
                                _login = { this._login }
                                isAuthenticated = { isAuthenticated }
                                { ...props }
                            />
                        ) }
                    />
                    {!isAuthenticated && <Redirect to = '/login'/>}
                    <Route
                        component = { Feed }
                        path = '/feed'
                    />
                    <Route
                        component = { Profile }
                        path = '/profile'
                    />
                    <Redirect to = '/feed'/>
                </Switch>
            </myContext.Provider>
        );
    }
}
