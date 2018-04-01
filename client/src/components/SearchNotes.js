import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SearchNotes = props => {
  return (
    <Input
      onChange={props.onSearchChange}
      fluid
      icon="search"
      placeholder="Search..."
      value={props.searchTerm}
    />
  );
};

SearchNotes.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired
};

export default SearchNotes;
