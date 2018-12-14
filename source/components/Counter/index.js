// Core
import React from 'react';
import { number } from 'prop-types';

// Instruments
import Styles from './styles.m.css';


const Counter = ({count = 0}) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

Counter.propTypes = {
    count: number.isRequired,
};

export default Counter;
