// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
class LoginForm extends Component {
    render() {
        return (
            <div className = { Styles.loginForm }>
                <form>
                    <button>Login</button>
                    <button disabled>Logout</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
