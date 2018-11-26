import React, { Component } from 'react';
import Styles from './styles.m.css';
import myContext from '../HOC/withProfile';

class Composer extends Component {
    static contextType = myContext;

    render() {
        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'avatar'
                    src = { this.context.avatar }
                />
                <form>
                    <textarea
                        placeholder = { `What\'s on your mind, ${
                            this.context.currentUserFirstName
                        }?` }
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
