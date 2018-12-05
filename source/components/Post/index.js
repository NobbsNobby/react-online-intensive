import React, { Component } from 'react';
import Styles from './styles.m.css';
import {withProfile} from '../HOC/withProfile';
import { func, array, string, number } from 'prop-types';
import moment from 'moment';
import Like from '../Like';

class Post extends Component {
  static propTypes = {
      _deletePost: func.isRequired,
      _likePost:   func.isRequired,
      comment:     string.isRequired,
      created:     number.isRequired,
      likes:       array.isRequired,
      id:          string.isRequired,
  };

  _deletePost = () => {
      const { _deletePost, id } = this.props;
      _deletePost(id);
  };

  _getCross = () => {
      const {firstName, lastName, currentUserFirstName, currentUserLastName} = this.props;

      return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
          ? <span
              className = { Styles.cross }
              onClick = { this._deletePost }
            />
          : null;
  };

  render() {
      const { comment, created, _likePost, likes, id } = this.props;
      const { avatar, firstName, lastName } = this.props;
      const cross = this._getCross();

      return (
          <section className = { Styles.post }>
              {cross}
              <img
                  alt = 'avatar'
                  src = { avatar }
              />
              <a>{`${firstName} ${
                  lastName
              }`}
              </a>
              <time>{moment.unix(created).format('MMMM DD hh:mm:ss a')}</time>
              <p>{comment}</p>
              <Like
                  _likePost = { _likePost }
                  id = { id }
                  likes = { likes }
              />
          </section>
      );
  }
}

export default withProfile(Post);
export {Post};
