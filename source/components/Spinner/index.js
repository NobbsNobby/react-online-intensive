import React from 'react';
import { createPortal } from 'react-dom';
import Styles from './styles.m.css';


const portal = document.getElementById('spinner');

const Spinner = ({isSpinning}) => createPortal(
    isSpinning && <div className = { Styles.spinner } />,
    portal,
);

export default Spinner;
