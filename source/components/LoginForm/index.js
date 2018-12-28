// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

class LoginForm extends Component {
    componentDidMount() {
        const { isAuthenticated, history } = this.props;

        if (isAuthenticated) {
            history.replace('/feed');
        }
    }

    _login = () => {
        const {history, _login } = this.props;
        _login();
        history.replace('/feed');
    };


    render() {
        return (
            <div className = { Styles.loginForm }>
                <h1>Вы должны войти в систему</h1>
                <div>
                    <button onClick = { this._login }>
                        Войти
                    </button>
                </div>
            </div>
        );
    }
}

export default LoginForm;
