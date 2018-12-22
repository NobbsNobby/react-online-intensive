// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

class LoginForm extends Component {
    render() {
        return (
            <div className = { Styles.loginForm }>
                <h1>Вы должны войти в систему</h1>
                <span>Это вооон та кнопка справа вверху</span>
            </div>
        );
    }
}

export default LoginForm;
