import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { myContext } from './withProfile';

export class PrivateRouter extends Component {
    static contextType = myContext;

    componentDidMount() {
        // ! вызывается 2 раза при редиректе
        console.log('redirect');
    }

    render() {
        const { to, path, component } = this.props;
        const {isAuthenticated} = this.context;

        return isAuthenticated ? (
            <Route
                component = { component }
                path = { path }
            />
        ) : (
            <Redirect to = { to } />
        );
    }
}
