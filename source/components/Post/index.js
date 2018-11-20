import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import PropTypes from 'prop-types';


class Post extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}

Post.propTypes = {
    avatar:               PropTypes.string,
    currentUserFirstName: PropTypes.string,
    currentUserLastName:  PropTypes.string,
};

export default Post;
