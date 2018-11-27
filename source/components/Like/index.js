import React, { Component } from 'react';
import { func, arrayOf, string, shape} from 'prop-types';
import Styles from './styles.m.css';
import cx from 'classnames';

class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    constructor(props) {
        super(props);

        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikesStyles = this._getLikesStyles.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    _likePost () {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    _getLikedByMe () {
        const { currentUserFirstName, currentUserLastName, likes} = this.props;

        return likes.some(({firstName, lastName}) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    }

    _getLikesStyles () {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    }

    render() {
        const likeStyles = this._getLikesStyles();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>
                    Like
                </span>
            </section>
        );
    }
}

export default Like;
