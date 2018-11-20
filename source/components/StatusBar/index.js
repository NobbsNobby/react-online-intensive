import React, { Component } from 'react';
import Styles from './styles.m.css';
import PropTypes from 'prop-types';

class StatusBar extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}

StatusBar.propTypes = {
    avatar:               PropTypes.string,
    currentUserFirstName: PropTypes.string,
    currentUserLastName:  PropTypes.string,
};

export default StatusBar;
