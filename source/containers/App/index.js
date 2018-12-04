import React, { Component } from 'react';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/lisa.png';
import {myContext} from '../../components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Артем',
    currentUserLastName:  'Котов',
};

export default class App extends Component {
    render() {
        return (
            <myContext.Provider value = { options }>
                <Feed/>
            </myContext.Provider>
        );
    }
}
