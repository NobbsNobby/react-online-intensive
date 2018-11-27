import React, { Component } from 'react';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';
import PropTypes from 'prop-types';
import moment from 'moment';

class Post extends Component {
    static contextType = myContext;
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

        return (
            <section className = { Styles.post }>
                <img
                    alt = 'avatar'
                    src = { this.context.avatar }
                />
                <a>{`${this.context.currentUserFirstName} ${this.context.currentUserLastName}`}</a>
                <time>{moment.unix(created).format('MMMM DD hh:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}

export default Post;
