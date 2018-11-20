import React, { Component } from 'react';
import Styles from './styles.m.css';
import PropTypes from 'prop-types';


class Composer extends Component {
    render() {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What\'s on your mind, ${currentUserFirstName}?` } />
                    <input
                        type = 'submit'
                        value = { 'Post' }
                    />
                </form>
            </section>
        );
    }
}

Composer.propTypes = {
    avatar:               PropTypes.string,
    currentUserFirstName: PropTypes.string,
};

export default Composer;
