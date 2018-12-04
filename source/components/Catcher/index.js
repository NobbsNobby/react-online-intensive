import React, { Component } from 'react';

import { object } from 'prop-types';
import Styles from './styles.m.css';


class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('ERROR: ', error);
        console.log('STACKTRACE: ', stack.componentStack);
        this.setState({
            error: true,
        });
    }


    render() {
        if (this.state.error) {
            return (
                <section className = { Styles.catcher }>
                    <span>Error occured.</span>
                    <p>We are on the way</p>
                </section>
            );
        }

        return this.props.children;
    }
}

export default Catcher;
