import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return ( 
      <nav>
        <h2>Memory Game</h2>
        <button>New Game</button>
      </nav>
    )
  }
}

export default Navbar;