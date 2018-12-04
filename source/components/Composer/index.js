import React, { Component } from 'react';
import Styles from './styles.m.css';
import {withProfile} from '../HOC/withProfile';
import PropTypes from 'prop-types';


@withProfile
class Composer extends Component {
  static propTypes = {
      _createPost: PropTypes.func.isRequired,
  };

  state = {
      comment: '',
  };

  _updateComment = (event) => {
      this.setState({
          comment: event.target.value,
      });
  };

  _handleFormSubmit = (event) => {
      event.preventDefault();
      this._submitComment();
  };

  _submitComment = () => {
      const { comment } = this.state;
      if (!comment.trim()) {
          return;
      }
      this.props._createPost(comment);

      this.setState({ comment: '' });
  };

  _submitOnEnter = (event) => {
      const enterkey = event.key === 'Enter';
      // Добавил проверку на shift для переноса строки
      if (enterkey && !event.shiftKey) {
          event.preventDefault();
          this._submitComment();
      }
  };

  render() {
      const { comment } = this.state;
      const {avatar, currentUserFirstName} = this.props;

      return (
          <section className = { Styles.composer }>
              <img
                  alt = 'avatar'
                  src = { avatar }
              />
              <form onSubmit = { this._handleFormSubmit }>
                  <textarea
                      placeholder = { `What\'s on your mind, ${
                          currentUserFirstName
                      }?` }
                      value = { comment }
                      onChange = { this._updateComment }
                      onKeyDown = { this._submitOnEnter }
                  />
                  <input
                      type = 'submit'
                      value = { 'Post' }
                  />
              </form>
          </section>
      );
  }
}

export default Composer;
