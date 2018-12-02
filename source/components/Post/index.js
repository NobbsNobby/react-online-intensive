import React, { Component } from 'react';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';
import { func, array, string, number } from 'prop-types';
import moment from 'moment';
import Like from '../Like';

class Post extends Component {
  static contextType = myContext;
  static propTypes = {
      _deletePost: func.isRequired,
      _likePost:   func.isRequired,
      comment:     string.isRequired,
      created:     number.isRequired,
      likes:       array.isRequired,
      id:          string.isRequired,
  };

  constructor(props) {
      super(props);
  }


  _deletePost = () => {
      const { _deletePost, id } = this.props;
      _deletePost(id);
  };

  render() {
      const { comment, created, _likePost, likes, id } = this.props;

      return (
          <section className = { Styles.post }>
              <span
                  className = { Styles.cross }
                  onClick = { this._deletePost }
              />
              <img
                  alt = 'avatar'
                  src = { this.context.avatar }
              />
              <a>{`${this.context.currentUserFirstName} ${
                  this.context.currentUserLastName
              }`}
              </a>
              <time>{moment.unix(created).format('MMMM DD hh:mm:ss a')}</time>
              <p>{comment}</p>
              <Like
                  _likePost = { _likePost }
                  id = { id }
                  likes = { likes }
                  { ...this.context }
              />
          </section>
      );
  }
}

export default Post;
