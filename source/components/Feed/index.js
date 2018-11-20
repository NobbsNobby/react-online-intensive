import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';

class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}

export default Feed;
