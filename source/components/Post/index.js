import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';

class Post extends Component {
    static contextType = myContext;
    render() {
        return (
            <section className = { Styles.post }>
                <img src = { this.context.avatar } />
                <a>{`${this.context.currentUserFirstName} ${this.context.currentUserLastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}

export default Post;
