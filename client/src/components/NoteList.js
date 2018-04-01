import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getNotes } from '../actions/notes';
import { selectNoteId, setTextFilter } from '../actions/selectors';

import '../styles/noteList.css';
import visibleNotes from '../selectors/notes';
import Note from './Note';
import SearchNotes from './SearchNotes';

class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
      })
    ).isRequired,
    searchTerm: PropTypes.string.isRequired,
    selectNoteId: PropTypes.func.isRequired,
    setTextFilter: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getNotes();
  }

  onSearchChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  renderNotes = () => {
    const { notes } = this.props;

    return notes.length === 0 ? (
      <Table.Row>
        <Table.Cell>No Notes</Table.Cell>
      </Table.Row>
    ) : (
      notes.map(note => (
        <Note
          key={note._id}
          note={note}
          handlleRemoveNote={this.handlleRemoveNote}
        />
      ))
    );
  };

  render() {
    return (
      <div className="side-bar-content">
        <Button primary onClick={() => this.props.selectNoteId('')}>
          New Note
        </Button>
        <div className="search-bar">
          <SearchNotes
            searchTerm={this.props.searchTerm}
            onSearchChange={this.onSearchChange}
          />
        </div>
        <div className="note-list-content">
          <Table basic="very" unstackable celled id="notes-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Updated</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body className="note-list__overflow">
              {this.renderNotes()}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notes, selectors }) => ({
  notes: visibleNotes(notes, selectors),
  searchTerm: selectors.text,
  selectedNoteId: selectors.id
});

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(getNotes()),
  selectNoteId: id => dispatch(selectNoteId(id)),
  setTextFilter: text => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
