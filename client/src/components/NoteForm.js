import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../styles/noteForm.css';
import * as actions from '../actions/notes';

import visibleNotes from '../selectors/notes';

class NoteForm extends Component {
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
    selectedNoteId: PropTypes.string,
    addNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedNoteId: ''
  };

  state = {
    title: '',
    body: '',
    error: false,
    message: ''
  };

  async componentDidMount() {
    if (this.props.selectedNoteId) {
      await this.props.notes.map(note => {
        if (note._id === this.props.selectedNoteId) {
          this.setState({
            title: note.title,
            body: note.body
          });
        }
        return null;
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedNoteId &&
      nextProps.selectedNoteId !== this.props.selectedNoteId
    ) {
      await this.props.notes.map(note => {
        if (note._id === nextProps.selectedNoteId) {
          this.setState({
            title: note.title,
            body: note.body
          });
        }
        return null;
      });
    } else if (!nextProps.selectedNoteId) {
      this.setState({ title: '', body: '' });
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ error: false });

    const { title, body } = this.state;

    if (title && body) {
      if (this.props.selectedNoteId) {
        await this.props.editNote({
          _id: this.props.selectedNoteId,
          title,
          body
        });
        return;
      } else if (!this.props.selectedNoteId) {
        await this.props.addNote({
          title,
          body
        });
        return;
      }
    }

    if (!title) {
      await this.setState({
        error: true,
        message: 'Note requires body content!'
      });
    }

    if (!body) {
      await this.setState({
        error: true,
        message: 'Note requires body content!'
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <Form error={this.state.error} onSubmit={this.onSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            name="title"
            id="form-input-control-title"
            control={Input}
            label="Title"
            placeholder="Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </Form.Group>
        <Form.Field
          name="body"
          id="form-textarea-control-body"
          control={TextArea}
          label="Body"
          placeholder="Body"
          onChange={this.handleChange}
          value={this.state.body}
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Save"
        />
        <Message error content={this.state.message} />
      </Form>
    );
  }
}

const mapStateToProps = ({ notes, selectors }) => ({
  notes: visibleNotes(notes, selectors),
  searchTerm: selectors.text,
  selectedNoteId: selectors.id
});

export default connect(mapStateToProps, actions)(NoteForm);
