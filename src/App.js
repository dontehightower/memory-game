import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Card from './Card';
import './App.css';

// A card can be in one of three states

const CardState = {
  hiding: 0,
  showing: 1,
  matching: 2
}
class App extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: CardState.hiding, backgroundColor: 'red' },
      { id: 1, cardState: CardState.hiding, backgroundColor: 'red' },
      { id: 2, cardState: CardState.hiding, backgroundColor: 'navy' },
      { id: 3, cardState: CardState.hiding, backgroundColor: 'navy' },
      { id: 4, cardState: CardState.hiding, backgroundColor: 'green' },
      { id: 5, cardState: CardState.hiding, backgroundColor: 'green' },
      { id: 6, cardState: CardState.hiding, backgroundColor: 'yellow' },
      { id: 7, cardState: CardState.hiding, backgroundColor: 'yellow' },
      { id: 8, cardState: CardState.hiding, backgroundColor: 'black' },
      { id: 9, cardState: CardState.hiding, backgroundColor: 'black' },
      { id: 10, cardState: CardState.hiding, backgroundColor: 'purple' },
      { id: 11, cardState: CardState.hiding, backgroundColor: 'purple' },
      { id: 12, cardState: CardState.hiding, backgroundColor: 'pink' },
      { id: 13, cardState: CardState.hiding, backgroundColor: 'pink' },
      { id: 14, cardState: CardState.hiding, backgroundColor: 'lightskyblue' },
      { id: 15, cardState: CardState.hiding, backgroundColor: 'lightskyblue' }
    ];
    cards = shuffle(cards);
    this.state = {cards, noClick: false};

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.hiding
    }));
    cards = shuffle(cards);
    this.setState({cards});
  }

  handleClick(id) {
    // need a helper function to iterate through the cards array, ,  
    const mapCardState = (cards, idsToChange, newCardState) => {
      // map each element
      return cards.map(c => {
        // & change card state if the current element matches the id
        if (idsToChange.includes(c.id)) { 
          return {
            ...c,
            cardState: newCardState
          };
        }
        // if there is no match, just return the old element with no change to cardState
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);
    // if the foundCard's state showing or matching, don't do anything
    if (this.state.noClick || foundCard.cardState !== CardState.hiding) {
      return;
    }
    // will use this variable to determine whether a card's state can be changed by clicking it
    let noClick = false;

    //<----------------- THIS IS A COPY OF THE CARDS ARRAY THAT WE CAN PERFORM STATE CHANGES ON FOR GAME LOGIC------------------------>
    let cards = mapCardState(this.state.cards, [id], CardState.showing);
    //make an array to represent the cards that are showing
    const showingCards = cards.filter((c) => c.cardState === CardState.showing);
    //make an array to represent the ids of the showing cards
    const ids = showingCards.map(c => c.id);

    // if there are two cards showing and they are the same color
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      // both of the showingCards' state should change to matching    
      cards = mapCardState(cards, ids, CardState.matching);
    // but if the two showingCards aren't the same
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.hiding);
      //don't let the user click them for a little bit
      noClick = true;
      this.setState({cards, noClick}, () => {
        setTimeout(() => {  // <-- a little bit
          //set the state of the cards to hiding after 1.5s
          this.setState({cards: hidingCards, noClick: false}); // but affer a little bit, change them back to showing and change noClick back to false
        }, 1500);
    });
    return;
  }
    this.setState({cards, noClick});
}

  render() {
    // iterate over the cards array and render a make a Card component
    const cards = this.state.cards.map((card) => (
      <Card 
        key={card.id} 
        showing={card.cardState !== CardState.hiding} 
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}  
      />
    ));
    return (
      <div className="App">
        <Navbar onNewGame={this.handleNewGame} />
          {cards} { /* destructure the cards array created on line 42*/ }
      </div>
    );
  }
}

export default App;
