import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { removeNote } from '../actions/notes';
import { selectNoteId, toggleList } from '../actions/selectors';

import '../styles/note.css';

class Note extends Component {
  handleSelectedNote = () => {
    this.props.selectNoteId(this.props.note._id);
    this.props.toggleList();
  };

  render() {
    const { note } = this.props;
    const className =
      this.props.selectedNoteId === note._id ? 'note-row selected' : 'note-row';

    return (
      <Table.Row className={className}>
        <Table.Cell onClick={this.handleSelectedNote}>{note.title}</Table.Cell>
        <Table.Cell collapsing onClick={this.handleSelectedNote}>
          {moment(note.createdAt).format('Do MMM')}
        </Table.Cell>
        <Table.Cell collapsing onClick={this.handleSelectedNote}>
          {moment(note.updatedAt).fromNow()}
        </Table.Cell>
        <Table.Cell>
          <Icon
            onClick={() => this.props.removeNote(note._id)}
            name="remove"
            color="red"
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

Note.defaultProps = {
  selectedNoteId: ''
};

Note.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  selectedNoteId: PropTypes.string,
  removeNote: PropTypes.func.isRequired,
  selectNoteId: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

const mapStateToProps = ({ selectors }) => ({
  selectedNoteId: selectors._id
});

const mapDispatchToProps = dispatch => ({
  removeNote: id => dispatch(removeNote(id)),
  selectNoteId: id => dispatch(selectNoteId(id)),
  toggleList: () => dispatch(toggleList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
