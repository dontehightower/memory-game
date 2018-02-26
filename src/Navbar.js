import React, {Component} from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({onNewGame}) =>(
  <nav>
    <h2>Memory Game</h2>
    <button onClick={onNewGame}>New Game</button>
  </nav>
);
    
Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequred
};
export default Navbar;