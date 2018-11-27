import React, { Component } from 'react';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';
import PropTypes from 'prop-types';


class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    static contextType = myContext;

    constructor(props) {
        super(props);

        this.state = {
            comment: '',
        };

        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
    }


    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }


    _handleFormSubmit (event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment () {
        const { comment } = this.state;
        /**
         * Обрезал строку чтобы нельзя было послать пробел
         * а вообще бы хотелось пару статей в нагрузку на тему обработки отправляемых данных, хотя это и не касается напрямую React
         */
        if (!comment.trim()) {
            return null;
        }
        this.props._createPost(comment);

        this.setState({comment: ''});
    }

    _submitOnEnter (event) {
        const enterkey = event.key === 'Enter';

        if (enterkey) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { comment } = this.state;

        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'avatar'
                    src = { this.context.avatar }
                />
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What\'s on your mind, ${
                            this.context.currentUserFirstName
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
