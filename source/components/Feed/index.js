import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import moment from 'moment';
import { getUniqueID, delay } from '../../instruments';


class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {id: '12', comment: 'Hi there', created: moment.now()},
                {id: '45', comment: 'Второй пост', created: moment.now()},
            ],
            isPostsFetching: false,
        };

        this._createPost = this._createPost.bind(this);
    }

    _setPostsFetchingState (state) {
        this.setState({
            isPostsFetching: state,
        });
    }

    async _createPost (comment) {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    }

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching }/>
                <StatusBar />
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}

export default Feed;
