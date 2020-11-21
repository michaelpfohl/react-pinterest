import React, { Component } from 'react';
import BoardCard from '../components/Cards/boardCard';
import PinCard from '../components/Cards/pinCard';
import boardsData from '../helpers/data/boardsData';
import pinsData from '../helpers/data/pinsData';
import authData from '../helpers/data/authData';

class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term.toLowerCase()) {
      this.performSearch();
    }
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term.toLowerCase();
    const searchType = this.props.match.params.type;
    const uid = authData.getUid();

    if (searchType === 'boards') {
    // Make an API call that gets the boards with the search term .filter
      boardsData.searchBoards(uid, searchTerm).then((results) => {
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    } else {
    // Make an API call that gets the pins with the search term .filter
      pinsData.searchPins(uid, searchTerm).then((results) => {
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    }
  };

  render() {
    const { results, searchType } = this.state;

    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? <BoardCard key={result.firebaseKey} board={result} /> : <PinCard key={result.firebaseKey} pin={result} />
      ))
    );

    return (
      <>
        <h1>Search Results</h1>
        <div className='board-container d-flex flex-wrap justify-content-center'>
          {showResults()}
        </div>
      </>
    );
  }
}

export default SearchResults;
