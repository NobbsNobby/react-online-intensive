import React, { Component } from 'react';
import Post from '../Post';
import Composer from '../Composer';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import { withProfile } from '../HOC/withProfile';
import Catcher from '../Catcher';
import { api, GROUP_ID, TOKEN } from '../../config/api';
import { socket } from '../../socket/init';

@withProfile
class Feed extends Component {
  state = {
      posts:           [],
      isPostsFetching: false,
  };

  componentDidMount() {
      const { currentUserFirstName, currentUserLastName } = this.props;
      this._fetchPosts();

      socket.emit('join', GROUP_ID);

      socket.on('create', (postJSON) => {
          const { data: createdPost, meta } = JSON.parse(postJSON);

          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: [ createdPost, ...posts ],
              }));
          }
      });

      socket.on('remove', (postJSON) => {
          const { data: removedPost, meta } = JSON.parse(postJSON);

          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: posts.filter((post) => post.id !== removedPost.id),
              }));
          }
      });

      socket.on('like', (postJSON) => {
          const { data: likedPost, meta } = JSON.parse(postJSON);

          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
              }));
          }
      });

      socket.on('unlike', (postJSON) => {
          const { data: unlikedPost, meta } = JSON.parse(postJSON);

          if (
              `${currentUserFirstName} ${currentUserLastName}`
        !== `${meta.authorFirstName} ${meta.authorLastName}`
          ) {
              this.setState(({ posts }) => ({
                  posts: posts.map((post) => post.id === unlikedPost.id ? unlikedPost : post),
              }));
          }
      });
  }

  componentWillUnmount() {
      socket.removeListener('create');
      socket.removeListener('remove');
      socket.removeListener('like');
      socket.removeListener('unlike');
  }

  _fetchPosts = async () => {
      this._setPostsFetchingState(true);

      const response = await fetch(api, {
          method: 'GET',
      });

      const { data: posts } = await response.json();

      this.setState({
          posts,
          isPostsFetching: false,
      });
  };

  _setPostsFetchingState = (state) => {
      this.setState({
          isPostsFetching: state,
      });
  };

  _createPost = async (comment) => {
      this._setPostsFetchingState(true);

      const response = await fetch(api, {
          method:  'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization:  TOKEN,
          },
          body: JSON.stringify({ comment }),
      });

      const { data: post } = await response.json();

      this.setState(({ posts }) => ({
          posts:           [ post, ...posts ],
          isPostsFetching: false,
      }));
  };

  _deletePost = async (id) => {
      this._setPostsFetchingState(true);

      await fetch(`${api}/${id}`, {
          method:  'DELETE',
          headers: {
              Authorization: TOKEN,
          },
      });

      this.setState(({ posts }) => ({
          posts:           posts.filter((post) => post.id !== id),
          isPostsFetching: false,
      }));
  };

  _likePost = async (id) => {
      this._setPostsFetchingState(true);

      const response = await fetch(`${api}/${id}`, {
          method:  'PUT',
          headers: {
              Authorization: TOKEN,
          },
      });

      const { data: likedPost } = await response.json();

      this.setState(({ posts }) => ({
          posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post),
          isPostsFetching: false,
      }));
  };

  render() {
      const { posts, isPostsFetching } = this.state;
      const postsJSX = posts.map((post) => (
          <Catcher key = { post.id }>
              <Post
                  { ...post }
                  _deletePost = { this._deletePost }
                  _likePost = { this._likePost }
              />
          </Catcher>
      ));

      return (
          <section className = { Styles.feed }>
              <Spinner isSpinning = { isPostsFetching } />
              <StatusBar />
              <Composer _createPost = { this._createPost } />
              {postsJSX}
          </section>
      );
  }
}

export default Feed;
