import React, { Component } from 'react';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';

class StatusBar extends Component {
    static contextType = myContext;

    render() {
        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { this.context.avatar }/>
                    <span>{this.context.currentUserFirstName}</span>
                            &nbsp;
                    <span>{this.context.currentUserLastName}</span>
                </button>
            </section>

        );
    }
}

export default StatusBar;
