import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import moment from 'moment';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {id: '12', comment: 'Hi there', created: moment()},
                {id: '45', comment: 'Второй пост', created: moment()},
            ],
            isSpinning: true,
        };
    }


    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}

export default Feed;
