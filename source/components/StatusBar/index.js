import React, { Component } from 'react';
import Styles from './styles.m.css';
import {withProfile} from '../HOC/withProfile';

@withProfile
class StatusBar extends Component {
    render() {
        const {avatar, currentUserFirstName, currentUserLastName} = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img
                        alt = 'avatar'
                        src = { avatar }
                    />
                    <span>{currentUserFirstName}</span>
                            &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>

        );
    }
}

export default StatusBar;
