import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';

class Feed extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

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

export default Feed;
