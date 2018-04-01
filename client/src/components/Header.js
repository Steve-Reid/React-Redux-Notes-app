import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../actions/selectors';

class Header extends Component {
  // state = {};

  renderNavToggle = () => {
    const navImgSrc = this.props.isListOpen
      ? '/images/bars.svg'
      : '/images/x.svg';

    return (
      <img
        className="header__nav-image"
        src={navImgSrc}
        alt="nav icon"
        onClick={this.props.toggleList}
        onKeyDown={this.props.toggleList}
      />
    );
  };

  renderLogo = () => (
    <Link
      to={this.props.auth ? '/notes' : '/'}
      className="left brand-logo"
      style={{ marginLeft: '10px' }}
    >
      <h1 className="header__title">{this.props.title}</h1>
    </Link>
  );

  renderHeaderContent = () => {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="header__logo">
            {this.renderLogo()}
          </li>,
          <li key="2" className="header__link">
            <a href="/auth/google">Login With Google</a>
          </li>
        ];
      default:
        return [
          <li key="1" className="header__link header__nav-toggle">
            {this.renderNavToggle()}
          </li>,
          <li key="2" className="header__link">
            {this.renderLogo()}
          </li>,
          <li className="header__link" key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs">My Notes</Link>
          </li>,
          <li className="header__link" key="4">
            <a href="/auth/logout">Logout</a>
          </li>
        ];
    }
  };

  render() {
    return (
      <div className="header__content">
        <ul>{this.renderHeaderContent()}</ul>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isListOpen: PropTypes.bool.isRequired,
  toggleList: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, selectors }) => ({
  user,
  isListOpen: selectors.isListOpen
});

export default connect(mapStateToProps, actions)(Header);
