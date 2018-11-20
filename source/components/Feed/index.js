import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';
import PropTypes from 'prop-types';


class Feed extends Component {
    render() {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar { ...this.props } />
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}

Feed.propTypes = {
    avatar:               PropTypes.string,
    currentUserFirstName: PropTypes.string,
    currentUserLastName:  PropTypes.string,
};

export default Feed;
