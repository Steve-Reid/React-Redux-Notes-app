import React from 'react';
import { Container, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NotFound = props => {
  return (
    <Container style={{ marginTop: '1.4rem' }}>
      <Button secondary size="tiny" onClick={() => props.history.push('/')}>
        <Icon name="chevron left" /> Notes
      </Button>
      <h2>Not Found!?!</h2>
    </Container>
  );
};

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default NotFound;
