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
                {id: '12', comment: 'Hi there', created: moment.now(), likes: []},
                {id: '45', comment: 'Второй пост', created: moment.now(), likes: []},
            ],
            isPostsFetching: false,
        };
    }

    _setPostsFetchingState  = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    };

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);

        const { posts } = this.state;

        await delay(600);

        const newPosts = posts.filter((post) => post.id !== id);

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    };

    _likePost = async (id) => {
        const {currentUserFirstName, currentUserLastName} = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
                _deletePost = { this._deletePost }
                _likePost = { this._likePost }
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
