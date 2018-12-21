import React, { Component } from 'react';

class LoginForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <button></button>
                    <input
                        placeholder = 'Логин'
                        type = 'text'
                    />
                    <input
                        placeholder = 'Пароль'
                        type = 'password'
                    />
                </form>
            </div>
        );
    }
}

export default LoginForm;
