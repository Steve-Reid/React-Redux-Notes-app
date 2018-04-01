import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = props => {
  const className = props.isListOpen ? 'is-list-open side-bar' : 'side-bar';
  return (
    <div>
      <div className="App">
        <div className={className}>
          <NoteList />
        </div>
        <div className="main">
          <NoteForm />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectors }) => ({
  isListOpen: selectors.isListOpen
});

export default connect(mapStateToProps)(App);
