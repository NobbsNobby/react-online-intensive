import React, { Component } from 'react';
import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfile';

class StatusBar extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.statusBar }>
                        <button>
                            <img src = { context.avatar } />
                            <span>{context.currentUserFirstName}</span>
                            &nbsp;
                            <span>{context.currentUserLastName}</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}

export default StatusBar;
