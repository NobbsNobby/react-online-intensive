//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';
//Components

//Instruments
import { socket } from '../../socket/init';
import cx from 'classnames';
import Styles from './styles.m.css';
import { withProfile } from '../HOC/withProfile';

class StatusBar extends Component {
  state = {
      online: false,
  };

  componentDidMount() {
      socket.on('connect', () => {
          this.setState({
              online: true,
          });
      });
      socket.on('disconnect', () => {
          this.setState({
              online: false,
          });
      });
  }

  componentWillUnmount() {
      socket.removeListener('connect');
      socket.removeListener('disconnect');
  }

  _animateStatusBarEnter = (statusBar) => {
      fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
  };

  render() {
      const { avatar, currentUserFirstName } = this.props;
      const { online } = this.state;

      const statusStyle = cx(Styles.status, {
          [ Styles.online ]:  online,
          [ Styles.offline ]: !online,
      });

      const statusMessage = online ? 'Online' : 'Offline';

      return (
          <Transition
              appear
              in
              timeout = { 1000 }
              onEnter = { this._animateStatusBarEnter }>
              <section className = { Styles.statusBar }>
                  <div className = { statusStyle }>
                      <div>{statusMessage}</div>
                      <span />
                  </div>
                  <Link to = '/profile'>
                      <img
                          alt = 'avatar'
                          src = { avatar }
                      />
                      <span>{currentUserFirstName}</span>
                  </Link>
                  <Link to = '/feed'>Feed</Link>
                  <div>
                      <button onClick = { this.props._logout }>
                          Выйти
                      </button>
                  </div>
              </section>
          </Transition>
      );
  }
}

export default withProfile(StatusBar);
export { StatusBar };
