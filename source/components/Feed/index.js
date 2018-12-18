import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components
import { withProfile } from '../HOC/withProfile';
import Post from '../Post';
import Composer from '../Composer';
import StatusBar from '../StatusBar';
import Catcher from '../Catcher';
import Spinner from '../Spinner';
import Postman from '../Postman';

//Instruments
import Styles from './styles.m.css';
import { api, GROUP_ID, TOKEN } from '../../config/api';
import { socket } from '../../socket/init';
import Counter from '../Counter';


class Feed extends Component {
  state = {
      posts:           [],
      isPostsFetching: false,
      postmanState:    true,
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
  }

  componentWillUnmount() {
      socket.removeListener('create');
      socket.removeListener('remove');
      socket.removeListener('like');
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

  _animateComposerEnter = (composer) => {
      fromTo(
          composer,
          1,
          {opacity: 0, rotationX: 50},
          {opacity: 1, rotationX: 0},
      );
  };

  _changePostmanState = () => {
      this.setState({postmanState: false});
  };

  _animatePostmanEnter = (postman) => {
      fromTo(
          postman,
          1,
          {opacity: 0, x: 300},
          {opacity: 1, x: 0},
      );
      setTimeout(() => {
          this._changePostmanState();
      }, 2000);
  };

  _animatePostmanExit = (postman) => {
      fromTo(
          postman,
          1,
          {opacity: 1, x: 0},
          {opacity: 0, x: 300},
      );
  };

  render() {
      const { posts, isPostsFetching, postmanState } = this.state;

      const postsJSX = posts.map((post) => (
          <CSSTransition
              classNames = {{
                  enter:       Styles.postInStart,
                  enterActive: Styles.postInEnd,
                  exit:        Styles.postOutStart,
                  exitActive:  Styles.postOutEnd,
              }}
              key = { post.id }
              timeout = {{
                  enter: 500,
                  exit:  400,
              }}>
              <Catcher>
                  <Post
                      { ...post }
                      _deletePost = { this._deletePost }
                      _likePost = { this._likePost }
                  />
              </Catcher>
          </CSSTransition>
      ));

      return (
          <section className = { Styles.feed }>
              <Spinner isSpinning = { isPostsFetching } />
              <StatusBar />
              <Transition
                  appear
                  in
                  timeout = { 1000 }
                  onEnter = { this._animateComposerEnter }>
                  <Composer _createPost = { this._createPost }/>
              </Transition>
              <Transition
                  appear
                  in = { postmanState }
                  timeout = {{
                      enter: 1000,
                      exit:  3000,
                  }}
                  onEnter = { this._animatePostmanEnter }
                  onExit = { this._animatePostmanExit }>
                  <Postman/>
              </Transition>
              <Counter count = { posts.length }/>
              <TransitionGroup component = { null }>{postsJSX}</TransitionGroup>
          </section>
      );
  }
}

export default withProfile(Feed);
export { Feed };
