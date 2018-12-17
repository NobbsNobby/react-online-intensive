import React from 'react';

import { Button, Container, Heading, Message } from '../styled';
import { withState } from './withState';


const Farm = (props) => {
    const applesJSX = Array(props.apples).fill(' $ ');

    return (
        <Container>
            <Heading>Ферма</Heading>
            <div>
                <Message>Урожай:</Message>
                <Message>{applesJSX}</Message>
            </div>
            <Button onClick = { props._yieldApples }>Собрать урожай!</Button>
        </Container>
    );
};

export default withState({
    stateName:        'apples',
    initialState:     5,
    stateUpdaterName: '_yieldApples',
    stateUpdater:     (state) => ({
        apples: state.apples + 1,
    }),
})(Farm);
